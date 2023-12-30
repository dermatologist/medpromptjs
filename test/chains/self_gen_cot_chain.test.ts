import { SelfGenCotChain } from '/home/beapen/repos/medpromptjs/src/chains/self_gen_cot_chain.ts';
import { container } from 'tsyringe';
import { LLM } from "langchain/dist/llms/base";
import { SequentialChain, LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

describe('SelfGenCotChain', () => {
    let selfGenCotChain: SelfGenCotChain;
    let mockLLM: LLM;
    let mockLLMChain: LLMChain;
    let mockPromptTemplate: PromptTemplate;

    beforeEach(() => {
        mockLLM = container.resolve("GoogleVertexAI");
        mockPromptTemplate = new PromptTemplate({
            template: '',
            inputVariables: ["question", "answer"],
        });
        mockLLMChain = new LLMChain({
            llm: mockLLM,
            prompt: mockPromptTemplate,
            outputKey: "explanation",
        });

        selfGenCotChain = new SelfGenCotChain();
    });

    it('should have a name property as "self generated explanation"', () => {
        expect(selfGenCotChain.name).toEqual('self generated explanation');
    });

    it('should have a llm property as an instance of LLM', () => {
        expect(selfGenCotChain.llm).toBeInstanceOf(LLM);
    });

    it('should have a chain property as an instance of LLMChain', () => {
        expect(selfGenCotChain.chain).toBeInstanceOf(LLMChain);
    });

    it('should have a promptTemplate property as an instance of PromptTemplate', () => {
        expect(selfGenCotChain.promptTemplate).toBeInstanceOf(PromptTemplate);
    });

    describe('call', () => {
        it('should call the chain method with the correct arguments', async () => {
            const args = { question: 'What is AI?', answer: 'AI is Artificial Intelligence.' };
            const chainSpy = jest.spyOn(selfGenCotChain.chain, 'call').mockResolvedValue(Promise.resolve('Mocked chain call'));

            const result = await selfGenCotChain.call(args);

            expect(chainSpy).toHaveBeenCalledWith(args);
            expect(result).toEqual('Mocked chain call');
        });
    });
});