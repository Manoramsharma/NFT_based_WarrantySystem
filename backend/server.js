require('dotenv').config({ path: './.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const connectDB = require('./configs/db');
const app = express();
const l = require('./common/logger');
const PORT = process.env.PORT || 8000;

require('./models/product');

const origin = 'http://127.0.0.1:5173';
console.log(origin);

async function startServer() {
  app.use(
    cors({
      origin,
      methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    }),
  );

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser());
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.use('/api', require('./routes/product'));

  app.use((err, _, res, __) => {
    res.status(err.status || 500).json({
      message: err.message || 'Something went wrong, please try again.',
    });
  });

  const path = require('path');
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.listen(PORT, () => {
    l.info(`up and running in ${process.env.NODE_ENV} on port ${PORT}`);
  });
}
startServer();
connectDB();
