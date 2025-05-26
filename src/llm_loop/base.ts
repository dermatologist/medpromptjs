import { BaseChain } from '../chain';
import { MapQuery } from './map_query';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import { ReduceChain } from './reduce';
import { MapDoc } from './map_doc';
import { Logger, ILogObj } from 'tslog';

const log: Logger<ILogObj> = new Logger();
export class LLMLoop extends BaseChain {
  // Implement the LLM loop logic here
  string_expression: string = '';
  name: string = 'LLMLoop';
  description: string = 'Base LLM Loop.';
  mapQuery: MapQuery = new MapQuery(this.container, '', '');
  mapDoc: MapDoc = new MapDoc(this.container, '', '');
  reduceChain: ReduceChain = new ReduceChain(this.container, '', '');

  async checkAssertion(expression: string, context: any): Promise<boolean> {
    let _expression: string = '';
    let _context: any = undefined;
    let _content: string = '';
    try {
      // Check if expression is a valid JSON string
      _expression = this.printValues(JSON.parse(expression));
    } catch (error) {
      _expression = expression; // If not, use the expression as is
    }
    log.info(`Checking assertion with expression: ${_expression}`);
    try {
      // Check if context is a valid JSON string
      _context = JSON.parse(context);
      _context.forEach(
        (element: {
          content: { attachment: { data: { value: string } } }[];
        }) => {
          _content += atob(element.content[0].attachment.data.value);
        }
      );
    } catch (error) {
      _content = context; // If not, use the context as is
    }

    _content = this.findDatesAndConvertToTimeElapsed(
      _content.replace(/(\r\n|\n|\r)/gm, ' ')
    );
    const _input = {
      input: {
        expression: _expression,
        context: _content,
      },
    };

    return this.chain(_input);
  }

  async checkMention(expression: string, context: any): Promise<boolean> {
    if (expression && context) return true; // Placeholder for assertion check logic
    return false;
  }

  async checkNegation(expression: string, context: any): Promise<boolean> {
    if (expression && context) return true; // Placeholder for assertion check logic
    return false;
  }

  findDatesAndConvertToTimeElapsed(text: string): string {
    // Regular expression to match dates in format of 'mm/dd/yyyy' or 'mm-dd-yyyy'
    const dateRegex = /(\d{1,2}[-/]\d{1,2}[-/]\d{4})/g;
    let matches;
    let currentDate = new Date();

    while ((matches = dateRegex.exec(text)) !== null) {
      let date = new Date(matches[0]);
      let timeElapsed =
        (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      text = text.replace(
        matches[0],
        Math.floor(timeElapsed).toString() + ' days ago.'
      );
    }
    return text;
  }

  camelToString(camelCase: string): string {
    return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
      return str.toUpperCase();
    });
  }

  stringToBoolean(str: string): boolean {
    log.info(`Converting string to boolean: ${str}`);
    const positiveKeywords = [
      'true',
      'contains',
      'confirms',
      'yes',
      'affirmative',
      'matches',
      'exists',
      'present',
      'absolutely',
      'certainly',
      'definitely',
      'indeed',
    ];
    const lowerStr = str.toLowerCase();
    return positiveKeywords.some((keyword) => lowerStr.includes(keyword));
  }

  async textSplitter(
    text: string,
    chunkSize: number = 3900,
    chunkOverlap: number = 0
  ): Promise<string[]> {
    const textSplitter = new CharacterTextSplitter({
      chunkSize: chunkSize,
      chunkOverlap: chunkOverlap,
    });
    const texts = await textSplitter.splitText(text);
    // Log the number of chunks created
    if (texts.length === 0) {
      log.warn('No text chunks created. Please check the input text.');
      return [];
    }
    if (texts.length > 100) {
      log.warn(
        `Warning: More than 100 text chunks created (${texts.length}). This may affect performance.`
      );
    }
    if (chunkSize < 1000) {
      log.warn(
        `Warning: Chunk size is less than 1000 characters (${chunkSize}). This may lead to very small chunks.`
      );
    }
    log.info(
      `Text split into ${texts.length} chunks with size ${chunkSize} and overlap ${chunkOverlap}`
    );
    return texts;
  }

  printValues(obj: any) {
    for (var key in obj) {
      if (typeof obj[key] === 'object') {
        this.printValues(obj[key]);
      } else {
        this.string_expression += obj[key] + ' ';
      }
    }
    const _eliminate = [
      'true',
      'false',
      'null',
      'undefined',
      'String',
      'Number',
      'Object',
      'Array',
      'Boolean',
      'value',
      'Type',
      'Specifier',
      'Named',
    ];
    _eliminate.forEach((element) => {
      const regex = new RegExp(element, 'g');
      this.string_expression = this.string_expression.replace(regex, '');
    });
    this.string_expression = this.string_expression.replace(
      /(?:https?|ftp):\/\/[\n\S]+/g,
      ''
    );
    return this.camelToString(this.string_expression);
  }

  async chain(input: any) {
    // Create a chain using RunnableSequence, RunnablePassthrough and RunnableParallel
    // input has two properties: expression and context
    // expression goes through mapQuery and parallely
    // context goes through textSplitter and mapDoc
    // Finally reduceChain is called with the results of mapQuery and mapDoc
    // LCEL-based implementation using RunnableSequence, RunnableParallel, and RunnablePassthrough
    const { RunnableSequence, RunnableParallel, RunnablePassthrough } =
      await import('@langchain/core/runnables');

    const mapQueryChain = RunnablePassthrough.assign({
      query: async (input: any) =>
        this.mapQuery.chain({
          input: { expression: input.input.expression },
        }),
    });

    const mapDocChain = RunnablePassthrough.assign({
      documents: async (input: any) => {
        const textChunks = await this.textSplitter(input.input.context);
        return Promise.all(
          textChunks.map((chunk) =>
            this.mapDoc.chain({
              input: { document: chunk, question: input.input.expression },
            })
          )
        );
      },
    });

    const parallelChain = RunnableParallel.from([mapQueryChain, mapDocChain]);

    const sequence = RunnableSequence.from([
      parallelChain,
      async (results: any) => {
        // results is an array: [{ query: ... }, { documents: [...] }]
        const query = results[0].query;
        const documents = results[1].documents;
        return this.reduceChain.chain({
          input: {
            query: query,
            facts: documents,
          },
        });
      },
      (result: any) => this.stringToBoolean(result),
    ]);

    return sequence.invoke(input);
  }
}
