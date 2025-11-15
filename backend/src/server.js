const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const app = express();
const cors=require ('cors');
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // React frontend URL
  credentials: true, // allows cookies if needed
}));
// Load all routes from routes/index.js
const routes = require('./routes');
app.use('/api/v1', routes); // ✅ Everything is routed through this

app.listen(PORT, async () => {
  console.log(`Server started on Port: ${PORT}`);
});
