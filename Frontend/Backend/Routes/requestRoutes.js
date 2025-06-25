const express = require('express');
const router = express.Router();
const Request = require('../Models/requests');
const sendEmail = require('../utils/emailService');
const { isAuthenticated } = require('../utils/middleware');
router.post('/request', isAuthenticated, async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newRequest = new Request({ name, email, message, user: req.user._id });
        await newRequest.save();
        await sendEmail(
            req.body.email,
            'Request Received our team will get back to you soon'
        );
        const adminEmail = process.env.ADMIN_EMAIL;
        await sendEmail(
            adminEmail,
            'New Request Received',
            `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
        );
        res.status(201).json({ message: 'Request created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
    });

module.exports = router;
