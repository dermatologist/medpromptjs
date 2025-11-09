import { CDSHookRequest } from '../../src/models/request';

describe('CDSHookRequest', () => {
  it('should create an instance with default values', () => {
    const request = new CDSHookRequest();
    expect(request).toBeDefined();
    expect(request.hookInstance).toBeUndefined();
    expect(request.fhirServer).toBeUndefined();
    expect(request.hook).toBeUndefined();
    expect(request.context).toBeUndefined();
    expect(request.prefetch).toBeUndefined();
  });

  it('should create an instance with provided values', () => {
    const request = new CDSHookRequest({
      hookInstance: 'test-instance',
      fhirServer: 'https://example.com/fhir',
      hook: 'patient-view',
      context: { patientId: '123' },
      prefetch: { patient: {} },
    });

    expect(request.hookInstance).toBe('test-instance');
    expect(request.fhirServer).toBe('https://example.com/fhir');
    expect(request.hook).toBe('patient-view');
    expect(request.context).toEqual({ patientId: '123' });
    expect(request.prefetch).toEqual({ patient: {} });
  });

  it('should create an instance using from factory method', () => {
    const request = CDSHookRequest.from({
      hookInstance: 'factory-instance',
      context: { input: 'test input' },
    });

    expect(request).toBeInstanceOf(CDSHookRequest);
    expect(request.hookInstance).toBe('factory-instance');
    expect(request.context).toEqual({ input: 'test input' });
  });

  it('should handle partial initialization', () => {
    const request = new CDSHookRequest({
      context: { input: 'partial context' },
    });

    expect(request.context).toEqual({ input: 'partial context' });
    expect(request.hookInstance).toBeUndefined();
    expect(request.fhirServer).toBeUndefined();
  });
});
