const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');

const healthRoute = require('./src/routes/health.route');
const appRoutes = require('./src/routes/app.routes');
const errorHandler = require('./src/middleware/errorHandler');
const response = require('./src/middleware/response');
const { frontendBaseUrl } = require('./src/config/config');

const app = express();
const corsOpts = {
  origin: frontendBaseUrl,

  methods: [
    'GET','OPTIONS', 'HEAD','PUT','PATCH','POST','DELETE'
  ],
};

const bodyParserConfig = bodyParser.urlencoded({
  extended: true,
});

app.use(bodyParserConfig);
app.use(express.static(path.join(__dirname, 'build')));

app.use(response);
app.use(logger('dev'));

app.use(cors(corsOpts));
app.use(bodyParser.json());

// app.use('/', healthRoute);
app.use('/api', appRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res) => {
  res.reply({ statusCode: 404 });
});

app.use(errorHandler);

module.exports = app;
