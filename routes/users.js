const express = require('express');
const router = express.Router();
const { User } = require('../db/models')
const { asyncHandler, csrfProtection } = require('./utils')
const { userValidators } = require('./validators')


/* GET users listing. */
router.get('/', csrfProtection, userValidators, (req, res, next) => {
  res.send('respond with a resource');
});



module.exports = router;
