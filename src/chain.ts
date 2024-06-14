
import { PromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";
import { LLM } from "langchain/llms/base";
import type { ToolInterface } from "@langchain/core/tools";
import mydi from "./mydi";
import { RunnablePassthrough, RunnableSequence } from "langchain/dist/schema/runnable";


export class BaseChain {

    container: any;
    tools: ToolInterface[];
    name: string = "override this";
    description: string = "override this";
    prompt: PromptTemplate;
    llm: LLM;
    template: string = `
            {input}
        `

    constructor(container: any, name: string, description: string, template: string="") {
        this.container = container;
        this.name = name;
        this.description = description;
        this.tools = this.resolve("tools")
        this.prompt = this.resolve("prompt") !== "" ? this.resolve("prompt") : PromptTemplate.fromTemplate(this.template);
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

    // https://js.langchain.com/v0.1/docs/expression_language/how_to/routing/
    chain(input: any) {
        const _chain = RunnableSequence.from([
            new RunnablePassthrough(),
            this.llm,
            this.prompt,
        ])
        return _chain.invoke(input);
    }
}