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

import { Embeddings, type EmbeddingsParams } from '@langchain/core/embeddings';

/**
 * Parameters for configuring BaseEmbedding
 */
export interface BaseEmbeddingInput extends EmbeddingsParams {
  baseUrl: string;
  model: string;
  apiKey?: string;
}

/**
 * BaseEmbedding is a base class for embeddings that communicate with a remote API.
 * It extends the LangChain Embeddings class and provides methods for embedding
 * documents and queries.
 */
export class BaseEmbedding extends Embeddings {
  baseUrl: string;
  model: string;
  apiKey: string;

  constructor(fields: BaseEmbeddingInput) {
    super(fields);
    this.baseUrl = fields.baseUrl;
    this.model = fields.model;
    this.apiKey = fields.apiKey ?? '';
  }

  /**
   * Embed a list of documents
   * @param texts - Array of strings to embed
   * @returns Promise of array of embedding vectors
   */
  async embedDocuments(texts: string[]): Promise<number[][]> {
    return this.getEmbeddings(texts);
  }

  /**
   * Embed a single query
   * @param text - String to embed
   * @returns Promise of embedding vector
   */
  async embedQuery(text: string): Promise<number[]> {
    const embeddings = await this.getEmbeddings([text]);
    return embeddings[0];
  }

  /**
   * Helper method to get embeddings for a list of texts
   * @param texts - Array of strings to embed
   * @returns Promise of array of embedding vectors
   */
  protected async getEmbeddings(texts: string[]): Promise<number[][]> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const payload = {
      model: this.model,
      input: texts,
    };

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `API request failed: status=${response.status}; body=${body}`
      );
    }

    const respJson = await response.json();

    if (!('embeddings' in respJson)) {
      throw new Error(
        `API response missing 'embeddings' key. Received keys: ${Object.keys(respJson).join(', ')}`
      );
    }

    return respJson.embeddings as number[][];
  }
}
