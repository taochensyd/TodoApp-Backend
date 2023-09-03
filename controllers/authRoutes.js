const express = require('express');
const { register } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

// Other auth-related routes

module.exports = router;
