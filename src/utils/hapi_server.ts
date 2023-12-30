import { FhirServer } from "./fhir_server.ts";


class HapiServer extends FhirServer {

    baseUrl: string = 'http://hapi.fhir.org/baseR4/';

    async call_fhir_server(url: string, params: string) {
        const response = await fetch(
            `${this.baseUrl}${url}?${params}`
        );
        const data = await response.json();
        return data;
    }
}