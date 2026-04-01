const express = require('express');
const { getGalleryItems } = require('../controllers/galleryController');

const router = express.Router();

// Public endpoint to power the website gallery.
router.get('/', getGalleryItems);

module.exports = router;
