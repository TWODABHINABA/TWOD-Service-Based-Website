const express = require('express');
const User = require('../Models/users'); // Adjust path as needed
const Request = require('../Models/requests'); // Adjust path as needed
const Job = require('../Models/jobs'); // Adjust path as needed
const router = express.Router();
const TeamMember = require('../Models/developers');
const JobApplication = require('../Models/applications');
const Service = require('../Models/services');
const { storage } = require('../utils/clodinaryConfig');
const multer = require('multer');
const upload = multer({ storage });

const {isAuthenticated, isAdmin} = require('../utils/middleware');
const sendEmail = require('../utils/emailService');
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
        await sendEmail(request.email, "Service request accepted", "request accepted by team and will contact you soon")
        res.json({ message: 'Request accepted', request });
    } catch (error) {
        console.error('Error accepting request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/requests/:id/reject', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        request.status = 'rejected'; // Or whatever status you use
        await request.save();
        await sendEmail(request.email, "Service request rejected", "Sorry request rejected by team")
        res.json({ message: 'Request rejected', request });
    } catch (error) {
        console.error('Error rejecting request:', error);
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

router.delete('/jobs/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
        console.log(req.params.id);
        const jobId = req.params.id;
        await Job.findByIdAndDelete(jobId);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/newTeamMember',  isAuthenticated, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const teamMemberData = req.body;
        const image = req.file;
        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }
        teamMemberData.image = {
            url: image.path,
            filename: image.filename
        };
        console.log(teamMemberData);
        const newTeamMember = new TeamMember(teamMemberData);
        await newTeamMember.save();
        res.status(201).json({ message: 'Team member added successfully' });
    } catch (error) {
        console.error('Error adding team member:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Route: DELETE /admin/team/:id
router.delete('/team/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const teamMemberId = req.params.id;
        await TeamMember.findByIdAndDelete(teamMemberId);
        res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
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

router.post('/applications/:id/status', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        let job = await JobApplication.findByIdAndUpdate(applicationId, { status }).populate('applicantId');

        console.log()
        res.status(200).json({ message: 'Status updated successfully' });
        await sendEmail(job.applicantId.email, "Your application is reviewed", "your application is accepted and you are moved to the next round")
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/newService', isAuthenticated, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const serviceData = req.body;
        const image = req.file;
        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }
        serviceData.image = {
            url: image.path,
            filename: image.filename
        };
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

router.patch('/services/:id', isAuthenticated, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const serviceId = req.params.id;
        const serviceData = req.body;
        const image = req.file;
        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }
        serviceData.image = {
            url: image.path,
            filename: image.filename
        };
        await Service.findByIdAndUpdate(serviceId, serviceData);
        res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}); 

module.exports = router;