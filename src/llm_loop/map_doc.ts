import { BaseChain } from '../chain';

export class MapDoc extends BaseChain {
  name: string = 'MapDoc';
  description: string = 'Map a set of documents to facts.';
  template: string = `
    You will be given a document and a question.\n
    Summarize the document chunk commenting on: {query} \n
    Do not include absent or negative mentions.\n
    document: {document} \n
    Summary:: `;
}
