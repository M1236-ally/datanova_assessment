const { encodeText, decodeText } = require('./index');

test('Encode and decode returns original string', () => {
  const input = 'hello world!';
  const encoded = encodeText(input);
  const decoded = decodeText(encoded);
  expect(decoded).toBe(input);
});

test('Encode and decode with mixed case and numbers', () => {
  const input = 'Test123 ok';
  const encoded = encodeText(input);
  const decoded = decodeText(encoded);
  expect(decoded).toBe(input);
});
