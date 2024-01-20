const jwt = require('jsonwebtoken');
const config = prcess.env;

const verifyToken = (req, res, next) => {
    let token = req.body.token || req.query.toekn || req.headers['authorization'];

    if(!token){
        return res.status(403).send('token is required for authenrication')
    }
    try {
        token = token.replace(/^Bearer\s+/, "");
        const decoded = jwt.verify(token, config.TOKEY_KEY)
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
    return next()
}

module.exports = verifyToken