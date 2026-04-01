const express = require('express');
const {
	createVolunteer,
	getAllVolunteers,
	deleteVolunteer,
} = require('../controllers/volunteerController');
const requireAdmin = require('../middleware/auth');

const router = express.Router();

router.route('/').post(createVolunteer).get(requireAdmin, getAllVolunteers);
router.delete('/:id', requireAdmin, deleteVolunteer);

module.exports = router;
