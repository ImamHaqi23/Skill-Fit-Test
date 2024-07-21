require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const penghuniRoutes = require('./routes/penghuniRoutes');
const rumahRoutes = require('./routes/rumahRoutes');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/penghuni', penghuniRoutes);
app.use('/rumah', rumahRoutes);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:');
  }
});
