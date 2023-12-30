import "reflect-metadata";
import { HapiFhirServer } from "./utils/hapi_server";
import { container } from "tsyringe";

container.register("FhirServer", {
    useClass: HapiFhirServer,
});
