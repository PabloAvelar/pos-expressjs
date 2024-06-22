const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const token = authorization && authorization.split(" ")[1];

    if (token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET, (error, user) => {
        if (error) return res.sendStatus(403)

            req.user = user;
            next();
    })

}