import "reflect-metadata";
import { container } from "tsyringe";
import { GoogleVertexAI } from "langchain/llms/googlevertexai";
import {Ollama } from "@langchain/community/llms/ollama";
import { ChatPromptTemplate} from "langchain/prompts";
import { pull } from "langchain/hub";

import { z } from "zod";
import { DynamicTool, DynamicStructuredTool } from "@langchain/core/tools";


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

    const tools = [
        new DynamicTool({
            name: "FOO",
            description:
            "call this to get the value of foo. input should be an empty string.",
            func: async () => "baz",
        }),
        new DynamicStructuredTool({
            name: "random-number-generator",
            description: "generates a random number between two input numbers",
            schema: z.object({
            low: z.number().describe("The lower bound of the generated number"),
            high: z.number().describe("The upper bound of the generated number"),
            }),
            func: async ({ low, high }) =>
            (Math.random() * (high - low) + low).toString(), // Outputs still must be strings
        }),
    ];


    container.register("main-llm", {
        useValue: google_vertex_ai,
    });
    container.register("tools", {
        useValue: tools,
    });
    container.register("prompt", {
        useValue: prompt,
    });


    return container;
}

export default bootstrap;

