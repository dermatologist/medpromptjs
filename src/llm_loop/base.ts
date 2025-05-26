import { BaseChain } from '../chain';
import { MapQuery } from './map_query';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import { ReduceChain } from './reduce';
import { MapDoc } from './map_doc';
export class LLMLoop extends BaseChain {
  // Implement the LLM loop logic here
  string_expression: string = '';
  name: string = 'LLMLoop';
  description: string = 'Base LLM Loop.';
  mapQuery: MapQuery = new MapQuery(this.container, '', '');
  mapDoc: MapDoc = new MapDoc(this.container, '', '');
  reduceChain: ReduceChain = new ReduceChain(this.container, '', '');

  async checkAssertion(expression: string, context: string): Promise<boolean> {
    const _input = {
      input: {
        expression: expression,
        context: context,
      },
    };

    return this.chain(_input);

    // this.chain(_input).then((result) => {
    //   console.log('Assertion result:', result);
    //   return result;
    // }).catch((error) => {
    //   console.error('Error in assertion check:', error);
    //   return false;
    // })
    // return false; // Placeholder for assertion check logic
  }

  async checkMention(expression: string, context: string): Promise<boolean> {
    if (expression && context) return true; // Placeholder for assertion check logic
    return false;
  }

  async checkNegation(expression: string, context: string): Promise<boolean> {
    if (expression && context) return true; // Placeholder for assertion check logic
    return false;
  }

  findDatesAndConvertToTimeElapsed(text: string) {
    // Regular expression to match dates in format of 'mm/dd/yyyy' or 'mm-dd-yyyy'
    const dateRegex = /(\d{1,2}[-/]\d{1,2}[-/]\d{4})/g;
    let matches;
    let currentDate = new Date();

    while ((matches = dateRegex.exec(text)) !== null) {
      let date = new Date(matches[0]);
      let timeElapsed =
        (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      text = text.replace(matches[0], Math.floor(timeElapsed).toString());
      text += ' days ago.';
    }

    console.log(text);
    return text;
  }

  camelToString(camelCase: string): string {
    return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
      return str.toUpperCase();
    });
  }

  stringToBoolean(str: string): boolean {
    if (
      str.toLocaleLowerCase() === 'true' ||
      str === '1' ||
      str.toLowerCase() === 'yes'
    ) {
      return true;
    }
    return false;
  }

  async textSplitter(
    text: string,
    chunkSize: number = 3900,
    chunkOverlap: number = 0
  ): Promise<string[]> {
    const textSplitter = new CharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 0,
    });
    const texts = await textSplitter.splitText(text);
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
      this.string_expression = this.string_expression.replace(element, '');
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
