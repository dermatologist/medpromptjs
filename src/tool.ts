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

import { DynamicStructuredTool } from 'langchain/tools';
import mydi from './mydi';

export class BaseTool extends DynamicStructuredTool {
  /** @hidden */
  container: any;
  name: string;
  description: string;
  schema: any;
  constructor(
    container: any,
    name: string,
    description: string,
    schema: any,
    func: any = null
  ) {
    super({
      name: name,
      description: description,
      schema: schema,
      func: func,
    });
    this.container = container;
    this.name = name === '' ? this.camelize(this.constructor.name) : name;
    this.description =
      description === '' ? this.snake_case(this.constructor.name) : description;
    this.schema = schema;
  }

  func = async (args: any) => {
    return 'override this';
  };

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

  /**
   * @param input - The input to process in batch.
   * @param config - The configuration for the batch.
   * @returns A promise resolving to an array of results.
   */
  async _batchWithConfig(input: any, config: any): Promise<any[]> {
    // Call the parent implementation or provide your own
    return super._batchWithConfig(input, config);
  }
}
