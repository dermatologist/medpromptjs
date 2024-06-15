/**
 * Copyright 2024 Bell Eapen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { PromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";
import { LLM } from "langchain/llms/base";
import type { ToolInterface } from "@langchain/core/tools";
import mydi from "./mydi";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";

export class BaseChain {

    container: any;
    tools: ToolInterface[];
    name: string;
    description: string;
    prompt: PromptTemplate;
    llm: LLM;
    template: string = `
        Summarize the following text:
            {input}
        `

    constructor(container: any, name: string, description: string, template: string="") {
        this.container = container;
        this.name = name === "" ? this.camelize(this.constructor.name) : name;
        this.description = description === "" ? this.snake_case(this.constructor.name) : description;
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
    //! Override this method
    chain(input: any) {
        const _chain = RunnableSequence.from([
            new RunnablePassthrough(),
            this.prompt,
            this.llm
        ])
        return _chain.invoke(input);
    }
}