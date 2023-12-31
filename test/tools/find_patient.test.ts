import { FhirPatientSearchTool } from '../../src/tools/find_patient';
import { z } from "zod";

describe('FhirPatientSearchTool', () => {
    it('should validate the schema correctly', () => {
        const validData = {
            given: 'John',
            family: 'Doe',
            birth_date: '2000-01-01',
            patient_id: '123',
        };

        const invalidData = {
            given: 123,
            family: 123,
            birth_date: 123,
            patient_id: 123,
        };

        expect(() => FhirPatientSearchTool.schema.parse(validData)).not.toThrow();
        expect(() => FhirPatientSearchTool.schema.parse(invalidData)).toThrow();
    });

    it('should return a list of all matching patient names if multiple patients are found', async () => {
        const args = {
            patient_id: '592940',
        };

        const result: any = await FhirPatientSearchTool.func(args);
        // expect(result).toEqual({
        //     given: 'John',
        //     family: 'Doe',
        //     birth_date: '2000-01-01',
        //     patient_id: '123',
        // });
        expect(result['entry'][0]['resource']['name'][0]['given'][0]).toBe('Amit Kumar')
    });
});