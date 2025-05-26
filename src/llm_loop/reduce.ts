import { BaseChain } from '../chain';

export class ReduceChain extends BaseChain {
  name: string = 'Reduce';
  description: string = 'Reduce a set of documents to binary answer.';
  template: string = `
    You will be given facts and a question to answer with ONLY a yes or no.\n
    Do not include the facts in the answer.\n
    Say yes if the facts mentions all aspects of the question, else say no.\n
    facts: {facts} \n
    question: Does the facts mention {question} Say yes or no:: `;
}
