const express = require('express');
const router = express.Router();
const {createuser} = require('../controller/profile');

router.post('/create',createuser);

module.exports = router;