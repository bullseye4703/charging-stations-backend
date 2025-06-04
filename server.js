const express = require ('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/stations', require('./routes/stationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log('Server is running on port '+ PORT);
})