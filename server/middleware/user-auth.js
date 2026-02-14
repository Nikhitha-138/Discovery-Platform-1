const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN);

        if (verified.role !== 'User' && verified.role !== 'Admin') {
            return res.status(403).json({ message: 'Access Denied: Unauthorized role' });
        }

        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
