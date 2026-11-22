export const Logger = jest.fn().mockImplementation(() => ({
  info: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  success: jest.fn(),
  fatal: jest.fn(),
  trace: jest.fn(),
  child: jest.fn().mockReturnValue({
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    success: jest.fn(),
    fatal: jest.fn(),
    trace: jest.fn(),
  }),
}));

export default Logger;
