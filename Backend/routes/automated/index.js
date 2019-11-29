"use strict";

const { Router } = require('express');
const automatedRouter = Router();

automatedRouter.use('query/', require('./queryRoute'));

module.exports = automatedRouter;