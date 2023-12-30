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
});