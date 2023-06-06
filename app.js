require('dotenv').config();
const validationErrors = require('celebrate').errors;
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errors = require('./middlewares/errors');
const cors = require('./middlewares/cors');
const router = require('./routes/index');
const limiter = require('./middlewares/limiter');

const { NODE_ENV } = process.env;
const { PORT = 3000 } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.connect(NODE_ENV === 'production' ? 'mongodb://127.0.0.1:27017/bitfilmsdb' : 'mongodb://localhost:27017/bitfilmsdb');

app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(limiter);
app.use(cors);

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(validationErrors());
app.use(errors);

app.listen(PORT);
