const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./constant');

function validateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("middleware", req.url, req.headers);
    if (req.url === '/api/user/registation' || req.url === '/api/user/login') {
        next();
    } else {
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
};
module.exports = validateToken;