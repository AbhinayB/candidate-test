
//all the required middlewares and the modules
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

app.use("/public", express.static(path.join(__dirname, '/public_files')));

const routs = require('./node/routs');

const port = 9000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'node/public_files')));

app.use(bodyParser.json());

app.use('/', routs);



app.listen(port, () => {
  console.log('Server is running on Port: '+port);
});
