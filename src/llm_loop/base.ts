import { BaseChain } from '../chain';
import { MapQuery } from './map_query';
export class LLMLoop extends BaseChain {
  // Implement the LLM loop logic here
  string_expression: string = '';
  name: string = 'LLMLoop';
  description: string = 'Base LLM Loop.';

  async checkAssertion(expression: string, context: any): Promise<boolean> {
    const mapQuery = new MapQuery(this.container, '', '');
    // convert expression to free text
    const _input = {
      input: expression,
      chat_history: [],
      tool_names: [],
      tools: this.tools,
      agent_scratchpad: '',
    };
    const freeText = await mapQuery.chain(_input);
    console.log('Free text:', freeText);
    if (expression && context) return true; // Placeholder for assertion check logic
    return false;
  }

  async checkMention(expression: string, context: any): Promise<boolean> {
    if (expression && context) return true; // Placeholder for assertion check logic
    return false;
  }

  async checkNegation(expression: string, context: any): Promise<boolean> {
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
}
