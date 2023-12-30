
export abstract class FhirServer {

    abstract call_fhir_server(
        url: string,
        params: string,
    ): Promise<any>;
}

