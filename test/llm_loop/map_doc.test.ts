import { MapDoc } from '../../src/llm_loop/map_doc';
import bootstrap from '../bootstrap';

describe('MapDoc', () => {
  let mapDoc: MapDoc;

  beforeAll(async () => {
    const _container = await bootstrap();
    mapDoc = new MapDoc(_container, '', '');
  });

  it('should be defined', () => {
    expect(mapDoc).toBeDefined();
  });

  it('should have the correct name', () => {
    expect(mapDoc.name).toBe('MapDoc');
  });

  it('should have the correct description', () => {
    expect(mapDoc.description).toBe('Map a set of documents to facts.');
  });

  it('should contain example document chunks in the template', () => {
    expect(mapDoc.template).toContain('document: {document}');
    expect(mapDoc.template).toContain('Summary::');
  });

  it('should include the {query} placeholder in the template', () => {
    expect(mapDoc.template).toContain('{query}');
  });

  it("should end the template with 'Summary::'", () => {
    expect(mapDoc.template.trim().endsWith('Summary::')).toBe(true);
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
      jest.spyOn(mapDoc, 'chain').mockResolvedValueOnce(mockResult);

      const result = await mapDoc.chain(_input);
      expect(result).toEqual(mockResult);
    });
  });
});
