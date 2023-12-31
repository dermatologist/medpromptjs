import { mock, instance, when, verify } from 'ts-mockito';
import { ExplainAgent } from '../../src/agents/explain_agent';
import { SelfGenCotChain } from '../../src/chains/self_gen_cot_chain';
import { container } from 'tsyringe';
import { LLM } from "langchain/llms/base";
import { SequentialChain, LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import type { ToolInterface } from "@langchain/core/tools";

describe('ExplainAgent', () => {
    let explainAgent: ExplainAgent;
    let mockSelfGenCotChain: SelfGenCotChain;
    let mockPromptTemplate: PromptTemplate;
    let mockLLM: LLM;
    let mockToolInterface: ToolInterface;
    let mockAgentExecutor: AgentExecutor;

    beforeEach(() => {
        mockSelfGenCotChain = mock(SelfGenCotChain);
        mockPromptTemplate = mock(PromptTemplate);
        mockLLM = mock(LLM);
        mockAgentExecutor = mock(AgentExecutor);
        explainAgent = new ExplainAgent();
    });

    it('should run correctly', async () => {
        try{
            const input = {
                input: "what's my name?",
                // Notice that chat_history is a string, since this prompt is aimed at LLMs, not chat models
                chat_history: "Human: Hi! My name is Cob\nAI: Hello Cob! Nice to meet you",
            }
            // const result = await explainAgent.run(input);
            // verify(mockAgentExecutor.invoke(input)).once();
            // expect(result).toEqual("Mocked agent executor invoke");
        } catch (e) {
            console.log(e);
        }
    });
});