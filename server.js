const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
app.use(cors());

require('dotenv').config();

app.use(bodyParser.json());

const routes = require('./Backend/routes/index');
app.use('/backend/', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use((err, req, res, next ) => {
  err = err || new Error("Internal Server Error");
  res.status( err.status || 500);
  res.json({ error: err.message });
});
const port = process.env.PORT || 8080;
app.listen(port);

exports = module.exports = app;