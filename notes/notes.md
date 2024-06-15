 [WARNING]: Importing from "langchain/llms/googlevertexai" is deprecated.

      Instead, please add the "@langchain/community" package to your project with e.g.

          $ npm install @langchain/community

      and import from "@langchain/community/llms/googlevertexai".

      This will be mandatory after the next "langchain" minor version bump to 0.2.

      1 | import "reflect-metadata";
      2 | import { container } from "tsyringe";
    > 3 | import { GoogleVertexAI } from "langchain/llms/googlevertexai";
        | ^
      4 | import {Ollama } from "@langchain/community/llms/ollama";
      5 | import { ChatPromptTemplate} from "langchain/prompts";
      6 | import { pull } from "langchain/hub";
