import { BaseChain } from '../chain';

export class MapQuery extends BaseChain {
  name: string = 'MapQuery';
  description: string = 'Map a CQL query to a natural language.';
  template: string = `
 You are an assistant that can convert statements to a natural language query.\n

Now convert the following statement to a natural language query.
Statements: {expression}

query: `;
}
