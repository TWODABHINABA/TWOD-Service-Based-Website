const express = require('express');
const User = require('../Models/users'); // Adjust path as needed
const Request = require('../Models/requests'); // Adjust path as needed
const router = express.Router();



// Route: GET /admin/users
router.get('/users',  async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route: GET /admin/requests
router.get('/requests',  async (req, res) => {
    try {
        // Assuming you have a Request model to fetch requests
        const requests = await Request.find().populate('user'); // Adjust this line based on your actual model
        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/requests/:id/accept', async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        request.status = 'accepted'; // Or whatever status you use
        await request.save();
        res.json({ message: 'Request accepted', request });
    } catch (error) {
        console.error('Error accepting request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;