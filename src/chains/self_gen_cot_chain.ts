import "../bootstrap";
import { SequentialChain, LLMChain } from "langchain/chains";
import { container } from "tsyringe";
import { PromptTemplate } from "langchain/prompts";
import { LLM } from "langchain/llms/base";


export class SelfGenCotChain {

    constructor() {

    }

    llm: LLM = container.resolve("GoogleVertexAI");
    name: string = "self generated explanation";
    template: string = `
        ## Question: {question}
        ## Answer: {answer}
        Given the above question and answer, generate a chain of thought explanation for the answer.
        First, start with the model generated chain of thought explanation.
        End the chain of though explanation with:
        Therefore, the answer is {answer}.
        `;

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

    // async call(args: { question: string, answer: string }): Promise<string> {
    //     // Use the `call` method of the `chain` object, which should return a Promise
    //     const result = await this.chain.call(args);

    //     // Convert the result to a string if necessary
    //     const resultString = JSON.stringify(result);

    //     // Return the result
    //     return resultString;
    // }

}

