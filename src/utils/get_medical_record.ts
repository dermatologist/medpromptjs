import { autoInjectable } from "tsyringe";
import { FhirServer } from "./fhir_server.ts";

@autoInjectable()
class GetMedicalRecord {

    constructor(
        private readonly fhir_server: FhirServer,
    ) {}

    async get_medical_record(
        patient_id: string,
    ): Promise<any> {
        const query = this.format_query(patient_id)
        const response = await this.fhir_server.call_fhir_server(
            "Patient",
            query,
        );
        return response;
    }

    format_query(patient_id: string): string {
        let query = "Patient?"
        if (patient_id) {
            query += `_id=${patient_id}`
            query += "&_revinclude=Observation:subject"
            query += "&_revinclude=Condition:subject"
            query += "&_revinclude=Procedure:subject"
            query += "&_revinclude=MedicationRequest:subject"
        }
        return query
    }
}