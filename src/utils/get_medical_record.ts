import { injectable } from "tsyringe";
import { FhirServer } from "./fhir_server.ts";
import { Logger } from "tslog";

const logger = new Logger({ name: "MedpromptLogger" });
@injectable()
export class GetMedicalRecord {

    constructor(
        private readonly fhir_server: FhirServer,
    ) {}

    async get(
        patient_id: string,
    ): Promise<any> {
        const query = this.format_query(patient_id)
        logger.info(`query: ${query}`)
        const response = await this.fhir_server.call_fhir_server(
            "Patient",
            query,
        );
        if (response.total === 0) {
            return response;
        } else {
            return "No data found";
        }
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