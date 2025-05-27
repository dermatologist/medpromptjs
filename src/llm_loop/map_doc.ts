import { BaseChain } from '../chain';

export class MapDoc extends BaseChain {
  name: string = 'MapDoc';
  description: string = 'Map a set of documents to facts.';
  template: string = `
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
}
