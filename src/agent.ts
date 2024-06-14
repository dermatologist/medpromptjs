import type { PromptTemplate } from "@langchain/core/prompts";
import { LLM } from "langchain/llms/base";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import type { ToolInterface } from "@langchain/core/tools";


export class BaseAgent {

    container: any;
    tools: ToolInterface[];
    name: string;
    prompt: PromptTemplate;
    llm: LLM;

    constructor(container: any) {
        this.container = container;
        this.tools = this.container.resolve("tools")
        this.name = this.snake_case(this.constructor.name);
        this.prompt = this.container.resolve("prompt");
        this.llm = this.container.resolve("main-llm");
    }

    camelize(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    snake_case(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : "_" + word.toLowerCase();
        }).replace(/\s+/g, '');
    }

    async run(input: any) {
        const agent = await createReactAgent({
            llm: this.llm,
            tools: this.tools,
            prompt: this.prompt,
        });
        const agentExecutor = new AgentExecutor({
            agent: agent,
            tools: this.tools,
        });
        return await agentExecutor.invoke({ input: input});
    }

}