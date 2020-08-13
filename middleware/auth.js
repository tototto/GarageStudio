const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
        return res.status(401).json({ error: 'No Token, authorisation denied' });
    }

    // Verify Token
    try {

        const decodedToken = jwt.verify(token, config.get('jwtToken'));
        // Put decoded token ID into Req
        req.user = decodedToken.user;
        next();

    } catch (error) {
        res.status(401).json({ error: 'Token not valid' });
    }
}