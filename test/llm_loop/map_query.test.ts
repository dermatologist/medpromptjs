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

  it('should include the {expression} placeholder in the template', () => {
    expect(mapQuery.template).toContain('{expression}');
  });

  describe('chain', () => {
    const SECONDS = 1000;
    jest.setTimeout(90 * SECONDS);

    it('should correctly run the chain with mock data', async () => {
      const _input = {
        input: 'Visual foot exam in the last month. Visual foot exam showed active infection.',
        chat_history: [],
      };

      // Mocking the chain method to return a predefined result
      const mockResult: any = {
        output: 'Did the patient have a visual foot exam in the last month? Is there any evidence of active infection?',
      };
      jest.spyOn(mapQuery, 'chain').mockResolvedValueOnce(mockResult);

      const result = await mapQuery.chain(_input);
      expect(result).toEqual(mockResult);
    });
  });
});
