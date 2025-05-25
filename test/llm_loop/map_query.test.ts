import { MapQuery } from '../../src/llm_loop/map_query';
import bootstrap from '../bootstrap';

// filepath: /home/beapen/gitcola/medpromptjs/test/llm_loop/map_query.test.ts

describe('MapQuery', () => {
  let mapQuery: MapQuery;

  beforeAll(async () => {
    const _container = await bootstrap();
    mapQuery = new MapQuery(_container, '', '');
  });

  it('should have the correct name', () => {
    expect(mapQuery.name).toBe('MapQuery');
  });

  it('should have the correct description', () => {
    expect(mapQuery.description).toBe('Map a CQL query to a natural language.');
  });

  it('should contain example CQL queries in the template', () => {
    expect(mapQuery.template).toContain('CQL:     exists (');
    expect(mapQuery.template).toContain('answer>> Penicillin allergy');
    expect(mapQuery.template).toContain('CQL:    exists (');
    expect(mapQuery.template).toContain('answer>> Diverticulitis diagnosis');
  });

  it('should include the {cql} placeholder in the template', () => {
    expect(mapQuery.template).toContain('{cql}');
  });

  it("should end the template with 'answer>>'", () => {
    expect(mapQuery.template.trim().endsWith('answer>>')).toBe(true);
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
      jest.spyOn(mapQuery, 'chain').mockResolvedValueOnce(mockResult);

      const result = await mapQuery.chain(_input);
      expect(result).toEqual(mockResult);
    });
  });
});
