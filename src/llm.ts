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

import { LLM, type BaseLLMParams } from '@langchain/core/language_models/llms';
import type { CallbackManagerForLLMRun } from '@langchain/core/callbacks/manager';

/**
 * Model parameters for BaseLLM
 */
export interface ModelParams {
  maxOutputTokens?: number;
  nPredict?: number;
  topK?: number;
  topP?: number;
  temperature?: number;
  nBatch?: number;
  repeatPenalty?: number;
  repeatLastN?: number;
}

/**
 * Parameters for configuring BaseLLM
 */
export interface BaseLLMInput extends BaseLLMParams {
  baseUrl: string;
  model: string;
  apiKey?: string;
  timeout?: number;
  backend?: string;
  temperature?: number;
  topP?: number;
  topK?: number;
  nBatch?: number;
  nThreads?: number;
  nPredict?: number;
  maxOutputTokens?: number;
  repeatLastN?: number;
  repeatPenalty?: number;
}

/**
 * BaseLLM is a base class for LLMs that communicate with a remote API.
 * It extends the LangChain LLM class and provides configurable parameters
 * for model inference.
 */
export class BaseLLM extends LLM {
  baseUrl: string;
  model: string;
  apiKey: string;
  timeout: number;
  backend: string;
  temperature: number;
  topP: number;
  topK: number;
  nBatch: number;
  nThreads: number;
  nPredict: number;
  maxOutputTokens: number;
  repeatLastN: number;
  repeatPenalty: number;

  constructor(fields: BaseLLMInput) {
    super(fields);
    this.baseUrl = fields.baseUrl;
    this.model = fields.model;
    this.apiKey = fields.apiKey ?? '';
    this.timeout = fields.timeout ?? 60000;
    this.backend = fields.backend ?? 'dhti';
    this.temperature = fields.temperature ?? 0.1;
    this.topP = fields.topP ?? 0.8;
    this.topK = fields.topK ?? 40;
    this.nBatch = fields.nBatch ?? 8;
    this.nThreads = fields.nThreads ?? 4;
    this.nPredict = fields.nPredict ?? 256;
    this.maxOutputTokens = fields.maxOutputTokens ?? 512;
    this.repeatLastN = fields.repeatLastN ?? 64;
    this.repeatPenalty = fields.repeatPenalty ?? 1.18;
  }

  /**
   * Get the model default parameters
   */
  get modelDefaultParameters(): ModelParams {
    return {
      maxOutputTokens: this.maxOutputTokens,
      nPredict: this.nPredict,
      topK: this.topK,
      topP: this.topP,
      temperature: this.temperature,
      nBatch: this.nBatch,
      repeatPenalty: this.repeatPenalty,
      repeatLastN: this.repeatLastN,
    };
  }

  /**
   * Get the identifying parameters
   */
  get identifyingParams(): Record<string, unknown> {
    return {
      model: this.model,
      baseUrl: this.baseUrl,
      modelParameters: this.modelDefaultParameters,
    };
  }

  /**
   * Get the LLM type identifier
   */
  _llmType(): string {
    return 'dhti';
  }

  /**
   * Prepare the request payload for the API
   */
  protected preparePayload(prompt: string): Record<string, unknown> {
    return {
      model: this.model,
      options: this.modelDefaultParameters,
      messages: [{ role: 'user', content: prompt }],
    };
  }

  /**
   * Make the API call to generate text
   */
  async _call(
    prompt: string,
    _options: this['ParsedCallOptions'],
    _runManager?: CallbackManagerForLLMRun
  ): Promise<string> {
    const payload = this.preparePayload(prompt);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const body = await response.text();
        throw new Error(
          `API request failed: status=${response.status}; body=${body}`
        );
      }

      const data = await response.json();

      // Expecting structure like: { "choices": [ { "message": { "role":"assistant","content":"..." } } ] }
      // Adapt this path if the API differs
      if (
        data.choices &&
        Array.isArray(data.choices) &&
        data.choices.length > 0
      ) {
        const choice = data.choices[0];
        // support both "message" and direct "text"
        if (
          typeof choice === 'object' &&
          choice !== null &&
          'message' in choice &&
          typeof choice.message === 'object' &&
          choice.message !== null
        ) {
          const content = (choice.message as Record<string, unknown>).content;
          if (typeof content === 'string') {
            return content;
          }
        } else if ('text' in choice) {
          const text = choice.text;
          if (typeof text === 'string') {
            return text;
          }
        }
      }

      // Fallback: return raw JSON string for debugging
      return JSON.stringify(data);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`API request timed out after ${this.timeout}ms`);
      }
      throw error;
    }
  }
}
