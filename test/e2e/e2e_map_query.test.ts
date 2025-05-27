import { MapQuery } from '../../src/llm_loop/map_query';
import bootstrap from './bootstrap';

jest.setTimeout(60000);

describe('MapQuery', () => {
  let mapQuery: MapQuery;

  beforeAll(async () => {
    const _container = await bootstrap();
    mapQuery = new MapQuery(_container, '', '');
  });

  it('should convert expression to natural language query', async () => {
    const expression = 'Family history of diabetes.';
    const result = await mapQuery.chain({
      input: { expression: expression },
    });
    expect(result).toContain('diabetes');
    console.info('Natural language query:', result);
  });
});
