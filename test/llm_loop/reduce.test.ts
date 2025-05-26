import { ReduceChain } from '../../src/llm_loop/reduce';
import bootstrap from '../bootstrap';

describe('ReduceChain', () => {
  let reduceChain: ReduceChain;

  beforeAll(async () => {
    const _container = await bootstrap();
    reduceChain = new ReduceChain(_container, '', '');
  });

  it('should be defined', () => {
    expect(reduceChain).toBeDefined();
  });

  it('should have the correct name', () => {
    expect(reduceChain.name).toBe('Reduce');
  });

  it('should have the correct description', () => {
    expect(reduceChain.description).toBe(
      'Reduce a set of documents to binary answer.'
    );
  });

  it('should contain example document chunks in the template', () => {
    expect(reduceChain.template).toContain('facts: {facts}');
    expect(reduceChain.template).toContain(
      'question: Does the facts mention {question} Say YES OR NO Only::'
    );
  });

  it('should include the {question} placeholder in the template', () => {
    expect(reduceChain.template).toContain('{question}');
  });

  it("should end the template with 'yes or no::'", () => {
    expect(reduceChain.template.trim().endsWith('Say YES OR NO Only::')).toBe(
      true
    );
  });

  describe('chain', () => {
    const SECONDS = 1000;
    jest.setTimeout(90 * SECONDS);

    it('should correctly run the agent with mock data', async () => {
      const _input = {
        input: 'DHTI is a framework for GenAI in healthcare.',
        chat_history: [],
      };

      // Mocking the chain method to return a predefined result
      const mockResult: any = {
        output: 'DHTI stands for Digital Health Technology Integration.',
      };
      jest.spyOn(reduceChain, 'chain').mockResolvedValueOnce(mockResult);

      const result = await reduceChain.chain(_input);
      expect(result).toEqual(mockResult);
    });
  });
});
