"use strict";

const { Router } = require('express');
const router = Router();

// Pulling in all routes for employees/
router.use(require('./employees/index'));

// Pulling in all routes for products/
router.use(require('./products/index'));

module.exports = router;