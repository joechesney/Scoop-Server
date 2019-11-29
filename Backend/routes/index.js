"use strict";

const { Router } = require('express');
const router = Router();

// /api
router.use("/v1", require('./Reverb-Scoopers/index.js'));
router.use("/automated", require('./automated/index.js'));

module.exports = router;