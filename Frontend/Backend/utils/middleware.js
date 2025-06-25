const jwt = require('jsonwebtoken');
const User = require('../Models/users'); // Adjust the path as necessary
// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🛠 Add this: fetch the full user and attach it
        User.findById(decoded.id)
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'User not found' });
                }
                req.user = user; // Now req.user._id will work
                next();
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            });

    } catch (err) {
        
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Admin access required' });
}

module.exports = { isAuthenticated, isAdmin };