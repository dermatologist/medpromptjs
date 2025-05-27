import { BaseChain } from '../chain';

export class ReduceChain extends BaseChain {
  name: string = 'Reduce';
  description: string = 'Reduce a set of documents to binary answer.';
  template: string = `
    Say yes if the facts mentions all aspects of the question, else say no.\n

    Example:
    facts: Patient had a laproscopy 27 days back. The findings were normal. \n
    question: Did the patient have a laproscopy this month?\n
    answer: Yes\n

    Example:
    facts: The patient is a diabetic and hypertensive. He is on metformin and amlodipine. \n
    question: Is the patient on heparin and metformin?\n
    answer: No\n

    facts: {facts} \n
    question: {question}\n
    answer: `;
}
