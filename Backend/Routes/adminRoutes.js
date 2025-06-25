const express = require('express');
const User = require('../Models/users'); // Adjust path as needed
const Request = require('../Models/requests'); // Adjust path as needed
const Job = require('../Models/jobs'); // Adjust path as needed
const router = express.Router();
const TeamMember = require('../Models/developers');
const JobApplication = require('../Models/applications');
const Service = require('../Models/services');
const {isAuthenticated, isAdmin} = require('../utils/middleware'); // Adjust path as needed
// Route: GET /admin/users
router.get('/users', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route: GET /admin/requests
router.get('/requests', isAuthenticated, isAdmin,  async (req, res) => {
    try {
        // Assuming you have a Request model to fetch requests
        const requests = await Request.find().populate('user'); // Adjust this line based on your actual model
        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/requests/:id/accept', isAuthenticated, isAdmin, async (req, res) => {
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


router.post('/newJob', isAuthenticated, isAdmin,  async (req, res) => {
    try {
        // Assuming you have a Job model
        const jobData = req.body;
        console.log(jobData);
        const newJob = new Job(jobData);
        await newJob.save();
        res.status(201).json({ message: 'Job posted successfully' });
    } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




router.post('/newTeamMember',  isAuthenticated, isAdmin, async (req, res) => {
    try {
        const teamMemberData = req.body;
        console.log(teamMemberData);
        const newTeamMember = new TeamMember(teamMemberData);
        await newTeamMember.save();
        res.status(201).json({ message: 'Team member added successfully' });
    } catch (error) {
        console.error('Error adding team member:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/jobApplications', isAuthenticated, isAdmin,  async (req, res) => {
    try {
        const jobApplications = await JobApplication.find().populate('applicantId').populate('jobId');
        res.json(jobApplications);
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.post('/newService', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const serviceData = req.body;
        console.log(serviceData);
        const newService = new Service(serviceData);
        await newService.save();
        res.status(201).json({ message: 'Service added successfully' });
    } catch (error) {
        console.error('Error adding service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/services/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const serviceId = req.params.id;
        await Service.findByIdAndDelete(serviceId);
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;