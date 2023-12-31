import { mock, instance, when, verify } from 'ts-mockito';
import { ExplainAgent } from '/home/beapen/repos/medpromptjs/src/agents/explain_agent.ts';
import { SelfGenCotChain } from 'path-to-selfgencotchain';
import { PromptTemplate } from 'path-to-prompttemplate';
import { LLM } from 'path-to-llm';
import { ToolInterface } from 'path-to-toolinterface';
import { createReactAgent } from 'path-to-createreactagent';
import { AgentExecutor } from 'path-to-agentexecutor';

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
        mockToolInterface = mock(ToolInterface);
        mockAgentExecutor = mock(AgentExecutor);

        when(mockSelfGenCotChain.someMethod()).thenReturn(someValue);
        when(mockPromptTemplate.someMethod()).thenReturn(someValue);
        when(mockLLM.someMethod()).thenReturn(someValue);
        when(mockToolInterface.someMethod()).thenReturn(someValue);
        when(mockAgentExecutor.invoke(anything())).thenReturn(Promise.resolve(someValue));

        explainAgent = new ExplainAgent();
    });

    it('should run correctly', async () => {
        const input = 'some input';
        const result = await explainAgent.run(input);

        verify(mockAgentExecutor.invoke(input)).once();
        expect(result).toEqual(someValue);
    });
});