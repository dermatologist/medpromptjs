import "reflect-metadata";
import { container } from "tsyringe";
import { GoogleVertexAI } from "langchain/llms/googlevertexai";
import {Ollama } from "@langchain/community/llms/ollama";
import { ChatPromptTemplate} from "langchain/prompts";
import { pull } from "langchain/hub";




const bootstrap = async () => {
    const google_vertex_ai = new GoogleVertexAI({
        model: "text-bison",
        temperature: 0.2,
    });

    const ollama = new Ollama({
        baseUrl: "http://localhost:11434",
        model: "phi3"
    });

    const prompt = await pull<ChatPromptTemplate>(
        "hwchase17/structured-chat-agent"
    );

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

