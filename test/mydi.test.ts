import mydi from '../src/mydi';

describe('mydi function', () => {
  it('should return the result of c.resolve(m + "_" + b) when it can resolve', () => {
    const mockContainer = {
      resolve: jest.fn((key) => key === 'test_case' ? 'resolved test_case' : undefined)
    };
    const result = mydi(mockContainer, 'test', 'case');
    expect(result).toEqual('resolved test_case');
    expect(mockContainer.resolve).toHaveBeenCalledWith('test_case');
  });

});