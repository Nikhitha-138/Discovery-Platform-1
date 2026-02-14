const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token || token === 'undefined' || token === 'null') {
        console.error('Auth Error: Token is missing or malformed:', token);
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        if (!process.env.ACCESS_TOKEN) {
            console.error('SYSTEM ERROR: ACCESS_TOKEN not found in environment variables');
            return res.status(500).json({ message: 'Server Configuration Error' });
        }

        const verified = jwt.verify(token, process.env.ACCESS_TOKEN);

        if (verified.role !== 'Admin') {
            return res.status(403).json({ message: 'Access Denied: Admins Only' });
        }

        req.user = verified;
        next();
    } catch (error) {
        console.error('JWT Verification Failed:', error.name, '-', error.message);
        res.status(400).json({ message: 'Invalid Token', error: error.message });
    }
};
