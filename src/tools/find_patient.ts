import "../../test/bootstrap";
import { DynamicTool, DynamicStructuredTool } from "langchain/tools";
import { z } from "zod";
import { GetMedicalRecord } from "../utils/get_medical_record";
import { container } from "tsyringe";
import { get } from "langchain/util/convex";
import { FhirServer } from "../utils/fhir_server";


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
    const fhir_server: FhirServer = container.resolve("FhirServer");
    const { given, family, birth_date, patient_id } = args;
    let query = "Patient?"
    if (patient_id) {
      query += `_id=${patient_id}`
    }
    if (given) {
      query += `&given=${given}`
    }
    if (family) {
      query += `&family=${family}`
    }
    if (birth_date) {
      query += `&birthdate=${birth_date}`
    }
    const data = await fhir_server.call_fhir_server(
      "",
      query,
    );
    return data;
  },
});
