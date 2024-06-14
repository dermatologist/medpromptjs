import "reflect-metadata";
import { container } from "tsyringe";
import { GoogleVertexAI } from "langchain/llms/googlevertexai";
import {Ollama } from "@langchain/community/llms/ollama";
import { PromptTemplate } from "langchain/prompts";
import { pull } from "langchain/hub";




const bootstrap = async () => {
    const google_vertex_ai = new GoogleVertexAI({
        model: "text-bison@001",
        temperature: 0.2,
    });

    const ollama = new Ollama({
        baseUrl: "http://localhost:11434",
        model: "phi3"
    });


    container.register("main-llm", {
        useValue: google_vertex_ai,
    });
    container.register("tools", {
        useValue: [],
    });
    container.register("prompt", {
        useValue: "",
    });


    return container;
}

export default bootstrap;

