import { BaseChain } from '../chain';

export class MapQuery extends BaseChain {
  name: string = 'MapQuery';
  description: string = 'Map a CQL query to a natural language.';
  template: string = `
 You are an assistant that can convert a CQL query to a natural language.
You should give a single line answer>> as in the example below.
Example:

CQL:     exists (
        [DocumentReference] D
        where D.allergies="Penicillin"
        and D.complaint="Headache"
        and D.complaint="Weakness" or D.complaint="Numbness"
        and D.findings="Intact sensation to light touch"
        )

answer>> Penicillin allergy, Headache, Weakness, Numbness, and Intact sensation to light touch as findings?

CQL:    exists (
            [DocumentReference] D
            where D.diagnosis="Diverticulitis"
            and D.complaint="Fever"
            and D.procedure="Colon resection"
            and not D.finding="Fluid collection"
        )

answer>> Diverticulitis diagnosis, Fever complaint, Colon resection procedure, and no Fluid collection finding?

Now convert the following CQL query to a natural language.
CQL: {expression}

answer>>
        `;
}
