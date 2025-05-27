import { BaseChain } from '../chain';

export class MapQuery extends BaseChain {
  name: string = 'MapQuery';
  description: string = 'Map a CQL query to a natural language.';
  template: string = `
  You are an assistant that can convert statements to a natural language query as in the example below.\n


  Statements: Visual foot exam in the last month. Visual foot exam showed active infection.
  query: Did the patient have a visual foot exam in the last month? Is there any evidence of active infection?
  Statements: {expression}
  query: `;
}
