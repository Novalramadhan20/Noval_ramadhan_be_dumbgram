const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {

    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.send({
                message: 'Access denied',
            });
        }
    
        const ACCESS_TOKEN_SECRET = '0sdnOJIoinsdo9878IJNBIniiuinINiuYIUY';
        const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);

        req.user = verified;

        next();
    } catch (error) {
        res.send({
            message: 'invalid token',
        });
    }
};
