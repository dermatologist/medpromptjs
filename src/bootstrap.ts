import "reflect-metadata";
import { HapiFhirServer } from "./utils/hapi_server";
import { container } from "tsyringe";
import { GoogleVertexAI } from "langchain/llms/googlevertexai";

const google_vertex_ai = new GoogleVertexAI({
    model: "text-bison",
    temperature: 0.2,
});

container.register("GoogleVertexAI", {
    useValue: google_vertex_ai,
});

container.register("FhirServer", {
    useClass: HapiFhirServer,
});
