const Volunteer = require('../models/Volunteer');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Quick payload validation so we fail fast before touching Mongo.
const validateVolunteerPayload = (payload = {}) => {
  const requiredFields = ['name', 'email', 'phone', 'address'];
  const missing = requiredFields.filter((field) => !payload[field]);

  if (missing.length) {
    return `Missing required fields: ${missing.join(', ')}`;
  }

  if (!emailPattern.test(payload.email)) {
    return 'Please provide a valid email address.';
  }

  return null;
};

// Handles creation of new volunteer records.
const createVolunteer = async (req, res, next) => {
  const validationError = validateVolunteerPayload(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json({
      message: 'Volunteer registered successfully',
      volunteer,
    });
  } catch (error) {
    console.error('Volunteer registration error:', error.message);
    next(error);
  }
};

// Returns a list of volunteer submissions for dashboards or admin UIs.
const getAllVolunteers = async (_req, res, next) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json({ count: volunteers.length, volunteers });
  } catch (error) {
    console.error('Fetch volunteers error:', error.message);
    next(error);
  }
};

const deleteVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    res.json({ message: 'Volunteer removed successfully' });
  } catch (error) {
    console.error('Delete volunteer error:', error.message);
    next(error);
  }
};

module.exports = {
  createVolunteer,
  getAllVolunteers,
  deleteVolunteer,
};
