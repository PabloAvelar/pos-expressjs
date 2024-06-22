const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

exports.login = [

    body("username")
        .trim()
        .escape(),

    body("password")
        .trim()
        .escape(),

    async function (req, res) {
        const errors = validationResult(req).array();

        if (errors.length > 0) {
            res.status(400).json({ message: "invalid format user or password", errors });
            return;
        }

        try {
            const { username, password } = req.body;
            const user = await User.findOne({
                where: { username }
            })
            
            if (!user) {
                return res.status(401).json({ message: 'invalid user or password' });
            }

            const hashedPassword = md5(password);

            if (hashedPassword !== user.password) {
                return res.status(401).json({ message: 'invalid user or password' });
            }

            const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET); //payload, secret

            res.json({ accessToken, user })

        } catch (e) {

            console.error(e);
        }

    }
]