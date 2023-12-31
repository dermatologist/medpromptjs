// FILEPATH: /home/beapen/repos/medpromptjs/test/utils/get_medical_record.test.ts

import { GetMedicalRecord } from '../../src/utils/get_medical_record';
import { FhirServer } from '../../src/utils/fhir_server'; // Assuming this is the correct import path
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { container } from 'tsyringe';


describe('GetMedicalRecord', () => {
    let getMedicalRecord: GetMedicalRecord;

    getMedicalRecord = container.resolve(GetMedicalRecord);
    it('should correctly format the query', () => {
        const patient_id = '123';
        const expectedQuery = "Patient?_id=123&_revinclude=Observation:subject&_revinclude=Condition:subject&_revinclude=Procedure:subject&_revinclude=MedicationRequest:subject";

        const result = getMedicalRecord.format_query(patient_id);

        expect(result).toEqual(expectedQuery);
    });

    it('should return patient record', async () => {
        const args = {
            patient_id: '592940',
        };

        const result: any = await getMedicalRecord.get(args.patient_id);
        expect(result['entry'][0]['resource']['name'][0]['given'][0]).toBe('Amit Kumar')
    });
});