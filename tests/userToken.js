const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessToken = jwt.sign({ id: 0, username: 'test_user' }, process.env.SECRET); //payload, secret

module.exports = accessToken;