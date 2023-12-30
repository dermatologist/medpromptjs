import { FhirServer } from "./fhir_server";
import { Logger } from "tslog";

const logger = new Logger({ name: "MedpromptLogger" });

export class HapiFhirServer extends FhirServer {

    baseUrl: string = 'http://hapi.fhir.org/baseR4/';

    async call_fhir_server(url: string, params: string) {
        const _url_with_params = `${this.baseUrl}${url}${params}`
        logger.info(`url_with_params: ${_url_with_params}`)
        const response = await fetch(
            _url_with_params,
        );
        const data = await response.json();
        return data;
    }
}