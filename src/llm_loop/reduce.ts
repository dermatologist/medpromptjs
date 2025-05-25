import { BaseChain } from '../chain';

export class ReduceChain extends BaseChain {
  name: string = 'Reduce';
  description: string = 'Reduce a set of documents to binary answer.';
  template: string = `
    You will be given a document and a question to answer with ONLY a yes or no.\n
    Do not include the document in the answer.\n
    Say yes if the document mentions all aspects of the question, else say no.\n
    document: {document} \n
    question: Does the document mention {question} Say yes or no:: `;
}
