const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('../src/config/serverConfig');
const app = express();

app.use(express.json());

// Load all routes from routes/index.js
const routes = require('./routes');
app.use('/api/v1', routes); // ✅ Everything is routed through this

app.listen(PORT, async () => {
  console.log(`Server started on Port: ${PORT}`);
});
