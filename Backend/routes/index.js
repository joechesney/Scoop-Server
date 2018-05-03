"use strict";

const { Router } = require('express');
const router = Router();

router.use("/scoop", require('./Reverb-Scoopers/index.js'));

module.exports = router;