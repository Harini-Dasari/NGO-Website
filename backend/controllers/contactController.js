const Contact = require('../models/Contact');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateContactPayload = (payload = {}) => {
  const requiredFields = ['name', 'email', 'message'];
  const missing = requiredFields.filter((field) => !payload[field]);

  if (missing.length) {
    return `Missing required fields: ${missing.join(', ')}`;
  }

  if (!emailPattern.test(payload.email)) {
    return 'Please provide a valid email address.';
  }

  return null;
};

// Handles contact form submissions from the public site.
const createContact = async (req, res, next) => {
  const validationError = validateContactPayload(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      message: 'Message received successfully',
      contact,
    });
  } catch (error) {
    console.error('Contact form error:', error.message);
    next(error);
  }
};

const getAllContacts = async (_req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ count: contacts.length, contacts });
  } catch (error) {
    console.error('Fetch contacts error:', error.message);
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error.message);
    next(error);
  }
};

module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
};
