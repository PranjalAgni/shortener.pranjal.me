const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const { notFound, errorHandler } = require('./middleware');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/')));

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server running at port 3000`);
});
