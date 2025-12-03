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

import { BaseChain } from './chain';
import type { ToolInterface } from '@langchain/core/tools';
import { createStructuredChatAgent, AgentExecutor } from 'langchain/agents';

export class BaseAgent extends BaseChain {
  private _tools: ToolInterface[] = [];


  get tools(): ToolInterface[] {
    return this._tools;
  }
  set tools(value: ToolInterface[]) {
    this._tools = value;
  }

  /**
   * Run the agent using the provided input.
   * This uses createStructuredChatAgent and AgentExecutor from langchain/agents.
   */
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
