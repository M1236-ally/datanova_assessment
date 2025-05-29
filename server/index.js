const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

const symbolMap = {
  a: 'α', b: 'β', c: '¢', d: 'δ', e: 'ε', f: 'ϝ',
  g: 'ɡ', h: '♄', i: 'ι', j: 'ʆ', k: 'κ', l: 'λ',
  m: 'ɱ', n: 'η', o: '☺', p: 'ρ', q: 'φ', r: 'я',
  s: 'ѕ', t: 'τ', u: 'υ', v: 'ν', w: 'ω', x: 'х',
  y: 'γ', z: 'ζ'
};

const upperSymbolMap = Object.fromEntries(
  Object.entries(symbolMap).map(([k, v]) => [k.toUpperCase(), v.toUpperCase() || v])
);

function encodeText(text) {
  if ([...text].length > 280) throw { code: 'INPUT_TOO_LONG' };
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(text)) throw { code: 'UNSUPPORTED_CONTROL_CHAR' };
  return [...text].map(c => {
    if (symbolMap[c]) return symbolMap[c];
    if (upperSymbolMap[c]) return upperSymbolMap[c];
    return c;
  }).join('');
}

function decodeText(encoded) {
  const reverseMap = Object.fromEntries(Object.entries(symbolMap).map(([k, v]) => [v, k]));
  const reverseUpperMap = Object.fromEntries(Object.entries(upperSymbolMap).map(([k, v]) => [v, k]));
  return [...encoded].map(c => {
    if (reverseMap[c]) return reverseMap[c];
    if (reverseUpperMap[c]) return reverseUpperMap[c].toUpperCase();
    if ((/[A-Za-z]/).test(c)) return c;
    if (symbolMap[Object.keys(symbolMap).find(k => symbolMap[k] === c)] || upperSymbolMap[Object.keys(upperSymbolMap).find(k => upperSymbolMap[k] === c)]) {
      return c;
    }
    if ((/[ \n\d.,!@#$%^&*()_+={}\[\]:;"'<>?/\\|`~]/).test(c)) return c;
    throw { code: 'UNKNOWN_SYMBOL' };
    
  }).join('');
}

app.post('/api/encode', (req, res) => {
  try {
    const { text } = req.body;
    const encoded = encodeText(text);
    res.json({ encoded });
  } catch (e) {
    res.status(400).json({ error: e.code });
  }
});

app.post('/api/decode', (req, res) => {
  try {
    const { encoded } = req.body;
    const text = decodeText(encoded);
    res.json({ text });
  } catch (e) {
    res.status(400).json({ error: e.code });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

module.exports = { encodeText, decodeText };