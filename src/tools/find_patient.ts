import { DynamicStructuredTool, Tool } from 'langchain/tools';


export class FhirPatientSearchTool extends DynamicStructuredTool {
  constructor() {
    super({
      name: 'FHIR Patient Search',
      description: 'Search for a patient by name and birthdate',

    });
  }

  async run(inputs: any): Promise<any> {
    const { name, birthdate } = inputs;
    const { fhir } = this.context;
    const { Patient } = fhir;

    const searchParams = {
      name,
      birthdate,
    };

    const results = await Patient.search(searchParams);
    const patient = results.entry[0].resource;

    return { patient };
  }
}