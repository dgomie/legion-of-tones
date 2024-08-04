const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

const URL = 'http://localhost:3001/graphql';
const SECRET = process.env.SESSION_SECRET;

// Generate a test JWT
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImRnb21pZSIsIl9pZCI6IjY2YTljOTU4YWE0MjQ3YmFmOWZiMDgzOSIsImZvcm1hdHRlZENyZWF0ZWRBdCI6Ikp1bCAzMSwgMjAyNCJ9LCJpYXQiOjE3MjI3OTE4NDIsImV4cCI6MTcyMjk2NDY0Mn0.9wOIC3Z6xOvcXcAqjRuZ0ZVd3rJol73K6ngrq-S-czk";


const query = `
  mutation {
    addLegion(legionData: {
      name: "New Legion",
      description: "test file creation of create legion",
      numPlayers: 1,
      maxPlayers: 12,
      numRounds: 5,
      voteTime: 3,
      submitTime: 3
    }) {
      _id
      name
      description
      numPlayers
      maxPlayers
      numRounds
      voteTime
      submitTime
    }
  }
`;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
};

const body = JSON.stringify({ query });

// console.log(body)

fetch(URL, {
  method: 'POST',
  headers: headers,
  body: body,
})
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(error => console.error('Error:', error));