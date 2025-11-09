// Polyfill TextEncoder and TextDecoder for Jest (Node.js)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Polyfill ReadableStream and WritableStream for Jest (Node.js)
if (typeof global.ReadableStream === 'undefined') {
  try {
    const streams = require('stream/web');
    global.ReadableStream = streams.ReadableStream;
    global.WritableStream = streams.WritableStream;
    global.TransformStream = streams.TransformStream;
  } catch (e) {
    // If stream/web is not available, provide a minimal fallback or skip
    global.ReadableStream = function () { throw new Error('ReadableStream not available'); };
    global.WritableStream = function () { throw new Error('WritableStream not available'); };
    global.TransformStream = function () { throw new Error('TransformStream not available'); };
  }
}