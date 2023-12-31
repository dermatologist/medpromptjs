import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import { OpenAI } from "@langchain/openai";
import type { PromptTemplate } from "@langchain/core/prompts";

// Define the tools the agent will have access to.
const tools = [new TavilySearchResults({ maxResults: 1 })];

// Get the prompt to use - you can modify this!
// If you want to see the prompt in full, you can at:
// https://smith.langchain.com/hub/hwchase17/react-chat
const promptWithChat = await pull<PromptTemplate>("hwchase17/react-chat");


const llm = new OpenAI({
    modelName: "gpt-3.5-turbo-instruct",
    temperature: 0,
});


const agentWithChat = await createReactAgent({
    llm,
    tools,
    prompt: promptWithChat,
});

const agentExecutorWithChat = new AgentExecutor({
    agent: agentWithChat,
    tools,
});

const result2 = await agentExecutorWithChat.invoke({
    input: "what's my name?",
    // Notice that chat_history is a string, since this prompt is aimed at LLMs, not chat models
    chat_history: "Human: Hi! My name is Cob\nAI: Hello Cob! Nice to meet you",
});

console.log(result2);

/*
  {
    input: "what's my name?",
    chat_history: 'Human: Hi! My name is Cob\nAI: Hello Cob! Nice to meet you',
    output: 'Your name is Cob.'
  }
*/