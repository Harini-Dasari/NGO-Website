const express = require('express');
const {
	createContact,
	getAllContacts,
	deleteContact,
} = require('../controllers/contactController');
const requireAdmin = require('../middleware/auth');

const router = express.Router();

router.route('/').post(createContact).get(requireAdmin, getAllContacts);
router.delete('/:id', requireAdmin, deleteContact);

module.exports = router;
