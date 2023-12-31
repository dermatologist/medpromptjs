import "../bootstrap";
import { SequentialChain, LLMChain, BaseChain } from "langchain/chains";
import { container } from "tsyringe";
import { PromptTemplate } from "langchain/prompts";
import { LLM } from "langchain/llms/base";
import { BaseCache, ChainValues } from "langchain/dist/schema";
import { CallbackManagerForChainRun } from "langchain/dist/callbacks";


export class SelfGenCotChain {
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun | undefined): Promise<ChainValues> {
        throw new Error("Method not implemented.");
    }
    _chainType(): string {
        throw new Error("Method not implemented.");
    }
    get inputKeys(): string[] {
        throw new Error("Method not implemented.");
    }
    get outputKeys(): string[] {
        throw new Error("Method not implemented.");
    }

    private llm: LLM = container.resolve("main-llm");
    name: string = "self generated explanation";
    description: string = "Generate a chain of thought explanation for the answer to a question.";
    private template: string = `
        ## Question: {question}
        ## Answer: {answer}
        Given the above question and answer, generate a chain of thought explanation for the answer.
        First, start with the model generated chain of thought explanation.
        End the chain of though explanation with:
        Therefore, the answer is {answer}.
        `;

    constructor(
        llm?: LLM,
        name?: string,
        template?: string,
        description?: string,
    ) {
        if (llm)
            this.llm = llm;
        if (name)
            this.name = name;
        if (template)
            this.template = template;
        if (description)
            this.description = description;
    }

    promptTemplate: PromptTemplate = new PromptTemplate({
        template: this.template,
        inputVariables: ["question", "answer"],
    });

    chain: LLMChain = new LLMChain({
        llm: this.llm,
        prompt: this.promptTemplate,
        outputKey: "explanation",
    });

    async call(args: { question: string, answer: string }) {
        const chainExecutionResult = await this.chain.call(args);
        return chainExecutionResult;
    }

    public getName() {
        return this.name;
    }

    public getTemplate() {
        return this.template;
    }

    public getDescription() {
        return this.description;
    }

}

