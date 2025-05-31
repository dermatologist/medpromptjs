import { BaseChain } from './chain';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import { Logger, ILogObj } from 'tslog';

const log: Logger<ILogObj> = new Logger();
export class LLMLoop extends BaseChain {
  // Implement the LLM loop logic here
  stringExpression: string = '';
  _mapQueryTemplate: string = `
    You are an assistant that can convert statements to a natural language query as in the example below.\n


    Statements: Visual foot exam in the last month. Visual foot exam showed active infection.
    query: Did the patient have a visual foot exam in the last month? Is there any evidence of active infection?
    Statements: {expression}
    query: `;

  _mapDocTemplate: string = `
    You will be given a document and few statements.\n
    Extract facts from the document that are relevant to the statements.\n
    Do not include any irrelevant information or context.\n


    Example:\n
    document: The patient is a 45-year-old male with a history of hypertension. He presented with chest pain and was diagnosed with myocardial infarction. He was treated with aspirin and beta-blockers.\n
    statements: diagnosis of myocardial infarction. currently on beta-blockers.\n
    facts: The patient was diagnosed with myocardial infarction and is currently on beta-blockers.\n
    document: {document} \n
    statements: {statements}\n
    facts: `;

  _reduceChainTemplate: string = `
    Say yes if the facts mentions all aspects of the query, else say no.\n

    Example:
    facts: Patient had a laproscopy 27 days back. The findings were normal. \n
    query: Did the patient have a laproscopy this month?\n
    answer: YES. The patient had a laproscopy 27 days back.\n
    facts: The patient is a diabetic and hypertensive. He is on metformin and amlodipine. \n
    query: Is the patient on heparin and metformin?\n
    answer: NO. The patient is on heparin but not on metformin.\n
    facts: A visual foot examination was performed 26 days ago to assess skin integrity, circulation, and structural abnormalities. The exam revealed normal skin condition, nail health, circulation, and absence of edema and deformities. However, there were signs of an active infection with erythema and swelling. \n
    query: Did the patient have a visual foot exam in the last month? Is there any evidence of active infection?\n
    answer: YES. The patient had a visual foot exam in the last month and there is evidence of active infection.\n
    facts: A visual foot examination was performed 126 days ago to assess skin integrity, circulation, and structural abnormalities. The exam revealed normal skin condition, nail health, circulation, and absence of edema and deformities. However, there were signs of an active infection with erythema and swelling. \n
    query: Did the patient have a visual foot exam in the last month? Is there any evidence of active infection?\n
    answer: NO. The patient did not have a visual foot exam in the last month but there is evidence of active infection.\n
    facts: {facts} \n
    query: {query}\n
    answer: `;

  // Add getters and setters for the templates if needed
  get mapQueryTemplate(): string {
    return this._mapQueryTemplate;
  }
  set mapQueryTemplate(template: string) {
    this._mapQueryTemplate = template;
  }
  get mapDocTemplate(): string {
    return this._mapDocTemplate;
  }
  set mapDocTemplate(template: string) {
    this._mapDocTemplate = template;
  }
  get reduceChainTemplate(): string {
    return this._reduceChainTemplate;
  }
  set reduceChainTemplate(template: string) {
    this._reduceChainTemplate = template;
  }

  async checkAssertion(expression: string, context: any): Promise<boolean> {
    let _expression: string = '';
    try {
      // Check if expression is a valid JSON string
      _expression = this.printValues(JSON.parse(expression));
    } catch (error) {
      _expression = expression; // If not, use the expression as is
    }

    log.info(`Checking assertion with expression: ${_expression}`);
    // Initialize context and content
    let _context: any = undefined;
    let _content: string = '';
    try {
      _context = JSON.parse(context);
    } catch (error) {
      _context = context; // If not, use the context as is
      log.warn(`Context is not a valid JSON string: ${context}`);
      log.warn(`Using context as a string: ${_context}`);
    }
    try {
      // Check if context is a valid JSON string
      _context = JSON.parse(context);
      _context.forEach((element: any) => {
        element.content.forEach((contentItem: any) => {
          _content += atob(contentItem.attachment.data.value);
        });
      });
    } catch (error) {
      _content = context; // If not, use the context as is
      log.warn(`Context is not a valid JSON : ${context}`);
      log.warn(`Using context as a string: ${_content}`);
    }
    _content = this.findDatesAndConvertToTimeElapsed(
      _content.replace(/(\r\n|\n|\r)/gm, ' ')
    );
    log.info(`Checking assertion with context: ${_content}`);
    const _input = {
      input: {
        expression: _expression,
        context: _content,
      },
    };
    const result = await this.chain(_input);
    log.info(`Assertion check result: ${result}`);
    return result;
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
      'did have',
      'showed',
      'revealed',
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
    log.info(`Processing Rule: ${obj.name} for ${obj.context}`);
    // For each obj.expression:arg:where
    if (obj.expression && obj.expression.arg && obj.expression.arg.where) {
      // for each args in obj.expression.arg.where, extract the nested key called "value"
      const statements = this.extractObjectsByKey(
        obj.expression.arg.where,
        'value'
      );
      return statements.join(' ').replace(/,/g, ' ');
    }
    // return statements array as a string seperated by space
    return '';
  }

  extractObjectsByKey(obj: any, key: string): any[] {
    const results: any[] = [];

    function traverse(obj: any) {
      for (const currentKey in obj) {
        if (obj.hasOwnProperty(currentKey)) {
          if (currentKey === key) {
            results.push(obj[currentKey]);
          }
          if (typeof obj[currentKey] === 'object' && obj[currentKey] !== null) {
            traverse(obj[currentKey]);
          }
        }
      }
    }

    traverse(obj);
    return results;
  }

  _printValues(obj: any) {
    for (var key in obj) {
      if (typeof obj[key] === 'object') {
        this._printValues(obj[key]);
      } else {
        this.stringExpression += obj[key] + ' ';
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
      this.stringExpression = this.stringExpression.replace(regex, '');
    });
    this.stringExpression = this.stringExpression.replace(
      /(?:https?|ftp):\/\/[\n\S]+/g,
      ''
    );
    return this.camelToString(this.stringExpression);
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

    const mapQuery: BaseChain = new BaseChain(this.container)
    const mapDoc: BaseChain = new BaseChain(this.container);
    const reduceChain: BaseChain = new BaseChain(this.container);
    mapQuery.name = 'MapQuery';
    mapQuery.description = 'Map the expression to a natural language query.';
    mapQuery.template = this._mapQueryTemplate;
    mapDoc.name = 'MapDoc';
    mapDoc.description = 'Map the document to a set of facts.';
    mapDoc.template = this._mapDocTemplate;
    reduceChain.name = 'ReduceChain';
    reduceChain.description = 'Reduce a set of documents to binary answer.';
    reduceChain.template = this._reduceChainTemplate;
    const mapQueryChain = RunnablePassthrough.assign({
      query: async (input: any) =>
        mapQuery.chain({ expression: input.input.expression }),
    });

    const mapDocChain = RunnablePassthrough.assign({
      documents: async (input: any) => {
        const textChunks = await this.textSplitter(input.input.context);
        return Promise.all(
          textChunks.map((chunk) =>
            mapDoc.chain({ document: chunk, statements: input.input.expression })
          )
        );
      },
    });

    const parallelChain = RunnableParallel.from([mapQueryChain, mapDocChain]);

    const sequence = RunnableSequence.from([
      parallelChain,
      async (results: any) => {
        /*  results is an array: [{ query: ... }, { documents: [...] }]
{
    "0": {
        "input": {
            "expression": "0 Visual foot exam showed active infection?",
            "context": "Procedure: The patient underwent a visual foot examination on 26 days ago. to assess skin integrity, circulation, and structural abnormalities.  Findings:   - Skin Condition: No signs of dryness, cracking, or ulceration were observed. No abnormal lesions or discoloration present.   - Nail Health: Toenails appeared intact with no evidence of fungal infection or ingrown nails.   - Circulation: Normal coloration, with no signs of cyanosis or pallor. Capillary refill time within normal limits.   - Edema: No visible swelling in the feet or ankles.   - Deformities: No structural abnormalities such as bunions, hammertoes, or Charcot foot deformities noted.   - Infections: Showed signs of active infection with erythema and swelling.   - Sensation: No visible signs of neuropathy, though further testing may be required to assess sensory deficits.    "
        },
        "query": "The text indicates a question about whether a visual foot exam revealed an active infection.\n"
    },
    "1": {
        "input": {
            "expression": "0 Visual foot exam showed active infection?",
            "context": "Procedure: The patient underwent a visual foot examination on 26 days ago. to assess skin integrity, circulation, and structural abnormalities.  Findings:   - Skin Condition: No signs of dryness, cracking, or ulceration were observed. No abnormal lesions or discoloration present.   - Nail Health: Toenails appeared intact with no evidence of fungal infection or ingrown nails.   - Circulation: Normal coloration, with no signs of cyanosis or pallor. Capillary refill time within normal limits.   - Edema: No visible swelling in the feet or ankles.   - Deformities: No structural abnormalities such as bunions, hammertoes, or Charcot foot deformities noted.   - Infections: Showed signs of active infection with erythema and swelling.   - Sensation: No visible signs of neuropathy, though further testing may be required to assess sensory deficits.    "
        },
        "documents": [
            "26 days ago, a visual foot examination revealed no dryness, cracking, ulceration, lesions, discoloration, fungal infection, ingrown nails, cyanosis, pallor, edema, bunions, hammertoes, or Charcot foot deformities. Circulation and capillary refill were normal. However, the exam showed signs"
        ]
    }
}
        */
        log.info(`Results from parallel chain: ${JSON.stringify(results)}`);
        const expression = results[0].input.expression;
        const query = results[0].query;
        const documents = results[1].documents;
        return reduceChain.chain({
            facts: documents,
            query: query + ' ' + expression,
        });
      },
      (result: any) => this.stringToBoolean(result),
    ]);

    return sequence.invoke(input);
  }
}
