import { PromptTemplate } from "@langchain/core/prompts";
import { LLM } from "langchain/llms/base";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import type { ToolInterface } from "@langchain/core/tools";
import mydi from "./mydi";

export class BaseAgent {

    container: any;
    tools: ToolInterface[];
    name: string;
    prompt: PromptTemplate;
    llm: LLM;

    default_prompt = PromptTemplate.fromTemplate(
        `
        {chat_history}
        If you have a choice between a tool and final answer, always choose the final answer.
        Answer the following questions as best you can. You have access to the following tools:

        {tools}

        Use the following format:

            Question: the input question you must answer
            Thought: you should always think about what to do
            Action: the action to take, should be one of [{tool_names}]
            Action Input: the input to the action
            Observation: the result of the action
            ... (this Thought/Action/Action Input/Observation can repeat N times)
            Thought: I now know the final answer
            Final Answer: the final answer to the original input question

        If you have a final answer, skip actions and output the final answer.
        Begin!

        Question: {input}

        Thought:{agent_scratchpad}`
    );

    constructor(container: any) {
        this.container = container;
        this.name = this.snake_case(this.constructor.name);
        this.tools = this.resolve("tools")
        this.prompt = this.resolve("prompt") !== "" ? this.resolve("prompt") : this.default_prompt;
        this.llm = this.resolve("main-llm");
    }

    resolve(name: string) {
        return mydi(this.container, this.name, name);
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
            verbose: true,
            handleParsingErrors:
                "Please try again, paying close attention to the final answer",
        });
        return await agentExecutor.invoke(input);
    }

}