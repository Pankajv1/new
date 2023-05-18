const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
const { JWT_SECRET_KEY } = require('../constant');

function validateToken(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (req.url === '/api/user/registation' || req.url === '/api/user/login') {
        next();
    } else {
        if (authHeader) {
            const token = authHeader;

            jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }

                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
};
app.use(validateToken);
module.exports = app;