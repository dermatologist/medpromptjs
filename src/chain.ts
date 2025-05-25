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
import type { ToolInterface } from '@langchain/core/tools';
import mydi from './mydi';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { AIMessage } from '@langchain/core/messages';

export class BaseChain {
  container: any;
  tools: ToolInterface[];
  name: string;
  description: string;
  prompt: any;
  llm: LLM;
  template: string;
  chat_model: boolean;

  constructor(
    container: any,
    name: string,
    description: string,
    template: string = `
    Summarize the following text:
        {input}
    `
  ) {
    this.container = container;
    this.name = name === '' ? this.camelize(this.constructor.name) : name;
    this.description =
      description === '' ? this.snake_case(this.constructor.name) : description;
    this.template = template;
    this.tools = this.resolve('tools');
    this.llm = this.resolve('main-llm');
    this.chat_model = false;
    try {
      this.chat_model = this.resolve('chat_model');
    } catch (e) {}
    if (this.chat_model) {
      this.prompt =  ChatPromptTemplate.fromTemplate(this.template);
    } else {
      this.prompt = PromptTemplate.fromTemplate(this.template);
    }
  }

  resolve(name: string) {
    return mydi(this.container, this.name, name);
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
    const _chain = RunnableSequence.from([
      new RunnablePassthrough(),
      this.prompt,
      this.llm,
    ]);
    if (this.chat_model) {
      const response: string = await _chain.invoke(input);
      const aiMessage = new AIMessage(response);
      return aiMessage.content;
    }
    return await _chain.invoke(input);
  }
}
