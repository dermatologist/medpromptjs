
export abstract class FhirServer {

    baseUrl: string | undefined;

    abstract call_fhir_server(
        url: string,
        params: string,
    ): Promise<any>;
}

