const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).send({ error: 'No authentication token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
