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
import mydi from './mydi';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { AIMessage } from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { FakeListChatModel } from '@langchain/core/utils/testing';

export class BaseChain {
  container: any;
  private _name: string = '';
  private _description: string = '';
  private _template: string = '';
  prompt: any;
  llm: LLM;
  chat_model: boolean;
  runnable: any;
  fakeLLM: FakeListChatModel =  new FakeListChatModel({
    responses: [
      'Hello, this is a fake response (There is no real LLM available)!',
      'bootstrap main-llm with a real LLM instance',
      'This is another fake response (There is no real LLM available)!',
    ],
  });

  constructor(container: any) {
    this.container = container;
    this._name = this.camelize(this.constructor.name);
    this._description = this.snake_case(this.constructor.name);
    this.llm = this.resolve('llm', this.fakeLLM);
    this._template = this.resolve('template', '{input}');
    this.chat_model = this.resolve('chat-model', false);
    this.initializePrompt();
  }

  initializePrompt() {
    if (this.chat_model) {
      this.prompt = ChatPromptTemplate.fromTemplate(this._template);
    } else {
      this.prompt = PromptTemplate.fromTemplate(this._template);
    }
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
    this.initializePrompt();
  }

  resolve(name: string, defaultValue: any = null): any {
    return (
      mydi(this.container, this.camelize(this.constructor.name), name) ||
      defaultValue
    );
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

  // https://js.langchain.com/v0.1/docs/expression_language/how_to/routing/
  //! Override this method
  async chain(input: any) {
    const outputParser = new StringOutputParser();
    this.runnable = RunnableSequence.from([
      {
        input: new RunnablePassthrough(),
        // context: async () => loadContextFromStore(),
      },
      this.prompt,
      this.llm,
      outputParser,
    ]);
    if (this.chat_model) {
      const response: string = await this.runnable.invoke(input);
      const aiMessage = new AIMessage(response);
      return aiMessage.content;
    }
    return await this.runnable.invoke(input);
  }

  async invoke(input: any) {
    return this.chain(input);
  }
}
