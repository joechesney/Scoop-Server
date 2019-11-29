const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { jobs } = require('./Backend/jobs');
const cron = require('node-cron');

// cron.schedule("59 * * * * *", async() => { // testing
cron.schedule("* * 11 * * *", async() => {
  try {
    const job = await jobs();
    console.log('email sent at ', new Date().toLocaleString());
  } catch(err) {
    console.log('err server.js: ', err);
  }
});
// cron.schedule("* * * * * *", () => console.log("cron ran every second"));

app.use(cors());

require('dotenv').config();

app.use(bodyParser.json());

const routes = require('./Backend/routes/index');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use((err, req, res, next ) => {
  err = err || new Error("Internal Server Error");
  res.status( err.status || 500);
  res.json({ error: err.message });
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));

exports = module.exports = app;