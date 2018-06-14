const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
app.use(cors());

require('dotenv').config();

app.use(bodyParser.json());

const routes = require('./Backend/routes/index');
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', routes);

app.use((err, req, res, next ) => {
  err = err || new Error("Internal Server Error");
  res.status( err.status || 500);
  res.json({ error: err.message });
});
const port = process.env.PORT || 8080;
app.listen(port, ()=>console.log('Listening on proces.env.port or 8080'));

exports = module.exports = app;