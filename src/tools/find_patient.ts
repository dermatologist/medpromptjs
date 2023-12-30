import { DynamicTool, DynamicStructuredTool } from "langchain/tools";
import { z } from "zod";


export const FhirPatientSearchTool = new DynamicStructuredTool({
  name: "patient search",
  description: `
    Searches FHIR server for a patient with available data.
    given: Given name of the patient.
    family: Family name of the patient.
    birth_date: Date of birth of the patient.
    patient_id: ID of the patient.
    All parameters are optional.
    Returns a list of all matching patient names if multiple patients are found.
    If no patient is found, returns the string "No patient found".
    If only one patient is found, returns the patient ID as a string.
  `,
  schema: z.object({
    given: z.string(),
    family: z.string(),
    birth_date: z.string(),
    patient_id: z.string(),
  }),
  func: async (args) => {
    const { given, family, birth_date, patient_id } = args;
    const response = await fetch(
      `http://localhost:3001/Patient?given=${given}&family=${family}`
    );
    const data = await response.json();
    return data;
  },
});
