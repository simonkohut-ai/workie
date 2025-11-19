const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
const workerRoutes = require('./routes/worker');

app.use(express.json());

app.use('/api', workerRoutes);

app.get('/', (req, res) => {
  res.send('AOS Service is running');
});

app.listen(port, () => {
  console.log(`AOS Service running on port ${port}`);
});

