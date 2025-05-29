import { useState } from 'react';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
   const showToast = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleRequest = async (action) => {
    try {
      const res = await fetch(`/api/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action === 'encode' ? { text: input } : { encoded: input })
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMap = {
          INPUT_TOO_LONG: 'Message exceeds 280 characters.',
          UNSUPPORTED_CONTROL_CHAR: 'Input contains unsupported control characters.',
          UNKNOWN_SYMBOL: 'Encoded text contains unknown symbols.'
        };
        showToast(errorMap[data.error] || 'Unknown error');
      } else {
        setOutput(action === 'encode' ? data.encoded : data.text);
      }
    } catch {
      showToast('Server unreachable. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Symbol Encoder</h1>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text here" />
      <div className="buttons">
        <button onClick={() => handleRequest('encode')}>Encode</button>
        <button onClick={() => handleRequest('decode')}>Decode</button>
      </div>
      <textarea value={output} readOnly placeholder="Result will appear here" />
      <ToastContainer />
    </div>
  );
}

export default App;