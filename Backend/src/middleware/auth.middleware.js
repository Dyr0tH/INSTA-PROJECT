const jwt = require('jsonwebtoken')

async function identifyUser(req, res, next) {
    const {token} = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Token not provided, unauthroized access..." })
    }

    let decodedToken = null;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token. Please login again..."
        })
    }

    req.user = decodedToken;

    next();
}

module.exports = identifyUser;