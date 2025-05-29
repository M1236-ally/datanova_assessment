Features of Encoder-Decoder:-
Encode plain text into custom symbols
- Decode symbols back into original text
- Handles errors gracefully (e.g., unsupported characters, unknown symbols)
- Responsive and modern UI
- Unit tested encode/decode logic using Jest

Project Structure:-
symbol-encoder/
├── backend/
│ ├── index.js # Express server with /api/encode and /api/decode routes, encodeText and decodeText function
│ └── index.test.js # Jest tests for core logic
├── frontend/
│ ├── index.html
│ ├── main.jsx # React app entry
│ ├── App.jsx # Main component
│ └── styles.css # Custom styling
├── package.json
└── README.md

Start frontend
cd frontend
npm install
npm run dev

Start backend
cd backend
npm install
