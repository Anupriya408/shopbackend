
const jwt = require('jsonwebtoken')
require("dotenv").config()

async function authToken(req, res, next) {

    let authorization = req.headers.authorization;

    if (authorization) {
        let token = authorization.split(' ').pop();

        try {

            if (token) {
                jwt.verify(token, process.env.TOKEN_KEY); // throws error if invalid token
    
                const user = jwt.decode(token);

                req.user = user;

                next();
            }

        } catch (err) {
            return res.status(400).send({
                error: 'Invalid token provided'
            })
        }
    } else {
        return res.status(400).send({
            error: 'No token provided'
        })
    }
}

module.exports = authToken;