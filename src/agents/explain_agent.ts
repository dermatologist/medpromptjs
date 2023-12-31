import "../bootstrap";
import { SelfGenCotChain } from "../chains/self_gen_cot_chain";
import { pull } from "langchain/hub";
import type { PromptTemplate } from "@langchain/core/prompts";
import { SequentialChain, LLMChain } from "langchain/chains";
import { container } from "tsyringe";
import { LLM } from "langchain/llms/base";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { Tool } from "langchain/tools";
import type { ToolInterface } from "@langchain/core/tools";

export class ExplainAgent  {

    tools: any[];

    constructor() {
        this.tools = [new SelfGenCotChain()];

    }


    async run(input: any){
        const cot: any = new SelfGenCotChain();
        // cot.lc_namespace = ["hwchase17"];
        // cot.returnDirect = true;
        // cot.description = "Generate a chain of thought explanation for the answer.";
        const promptWithChat = await pull<PromptTemplate>("hwchase17/react-chat");
        const llm: LLM = container.resolve("main-llm");
        const tools: ToolInterface[] = [cot];
        const agentWithChat = await createReactAgent({
            llm,
            tools,
            prompt: promptWithChat,
        });
        const agentExecutorWithChat = new AgentExecutor({
            agent: agentWithChat,
            tools,
        });
        const result2 = await agentExecutorWithChat.invoke(input);
        return result2;
    }
}