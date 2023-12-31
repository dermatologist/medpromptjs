import "../bootstrap";
import { SequentialChain, LLMChain } from "langchain/chains";
import { container } from "tsyringe";
import { PromptTemplate } from "langchain/prompts";
import { LLM } from "langchain/llms/base";


export class SelfGenCotChain {

    private _llm: LLM = container.resolve("main-llm");
    private _name: string = "self generated explanation";
    private _template: string = `
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
    ) {
        if (llm)
            this._llm = llm;
        if (name)
            this._name = name;
        if (template)
            this._template = template;
    }

    promptTemplate: PromptTemplate = new PromptTemplate({
        template: this._template,
        inputVariables: ["question", "answer"],
    });

    chain: LLMChain = new LLMChain({
        llm: this._llm,
        prompt: this.promptTemplate,
        outputKey: "explanation",
    });

    async call(args: { question: string, answer: string }) {
        const chainExecutionResult = await this.chain.call(args);
        return chainExecutionResult;
    }

}

