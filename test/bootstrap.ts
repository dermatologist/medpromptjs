import "reflect-metadata";
import { container } from "tsyringe";
import { GoogleVertexAI } from "langchain/llms/googlevertexai";
import { PromptTemplate } from "langchain/prompts";
import { pull } from "langchain/hub";




const bootstrap = async () => {
    const google_vertex_ai = new GoogleVertexAI({
        model: "text-bison",
        temperature: 0.2,
    });
    const prompt = await pull<PromptTemplate>("hwchase17/react");
    
    container.register("main-llm", {
        useValue: google_vertex_ai,
    });
    container.register("tools", {
        useValue: [],
    });
    container.register("prompt", {
        useValue: prompt,
    });


    return container;
}

export default bootstrap;

