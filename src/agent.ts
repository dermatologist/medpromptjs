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

import { PromptTemplate, ChatPromptTemplate } from '@langchain/core/prompts';
import { LLM } from '@langchain/core/language_models/llms';
import {
  AgentExecutor,
  createReactAgent,
  createStructuredChatAgent,
} from 'langchain/agents';
import type { ToolInterface } from '@langchain/core/tools';
import mydi from './mydi';

export class BaseAgent {
  container: any;
  private _name: string = '';
  private _description: string = '';
  private _template: string = `
        ## Question: {question}
        ## Answer: {answer}
        Given the above question and answer, generate a chain of thought explanation for the answer.
        First, start with the model generated chain of thought explanation.
        End the chain of though explanation with:
        Therefore, the answer is {answer}.
        `;
  private _tools: ToolInterface[] = [];
  prompt: any;
  llm: LLM;
  chat_model: boolean;
  runnable: any;

  constructor(container: any) {
    this.container = container;
    this.llm = this.resolve('main-llm');
    this.template = this.resolve('template', '{input}');
    this.chat_model = this.resolve('chat_model', false);
    this.initialize();
  }

  // Getters and setters
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value === '' ? this.camelize(this.constructor.name) : value;
  }

  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description =
      value === '' ? this.snake_case(this.constructor.name) : value;
  }

  get template(): string {
    return this._template;
  }
  set template(value: string) {
    this._template = value;
    this.initialize();
  }

  // Getters and setters for tools
  get tools(): ToolInterface[] {
    return this._tools;
  }
  set tools(value: ToolInterface[]) {
    this._tools = value;
  }

  initialize() {
    if (this._name === '') {
      this._name = this.camelize(this.constructor.name);
    }
    if (this._description === '') {
      this._description = this.snake_case(this.constructor.name);
    }
    if (this.chat_model) {
      this.prompt = ChatPromptTemplate.fromTemplate(this._template);
    } else {
      this.prompt = PromptTemplate.fromTemplate(this._template);
    }
  }

  resolve(name: string, defaultValue: any = null): any {
    return mydi(this.container, this._name, name) || defaultValue;
  }

  camelize(str: string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  snake_case(str: string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : '_' + word.toLowerCase();
      })
      .replace(/\s+/g, '');
  }

  async run(input: any) {
    const agent = await createStructuredChatAgent({
      llm: this.llm,
      tools: this._tools,
      prompt: this.prompt,
    });
    const agentExecutor = new AgentExecutor({
      agent: agent,
      tools: this.tools,
      // verbose: true,
      handleParsingErrors:
        'Please try again, paying close attention to the final answer',
    });
    return await agentExecutor.invoke(input);
  }
}
