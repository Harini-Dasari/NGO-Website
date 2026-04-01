const Gallery = require('../models/Gallery');

const sampleGallery = [
  {
    _id: 'sample-1',
    title: 'Literacy Drive in Kibera',
    imageUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    category: 'Education',
    createdAt: '2024-02-10T00:00:00.000Z',
  },
  {
    _id: 'sample-2',
    title: 'Mobile Health Checkup Camp',
    imageUrl:
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    category: 'Health',
    createdAt: '2024-01-18T00:00:00.000Z',
  },
  {
    _id: 'sample-3',
    title: 'Community Kitchen Volunteers',
    imageUrl:
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80',
    category: 'Food',
    createdAt: '2023-12-05T00:00:00.000Z',
  },
  {
    _id: 'sample-4',
    title: 'Girls Coding Lab',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    category: 'Education',
    createdAt: '2023-11-14T00:00:00.000Z',
  },
  {
    _id: 'sample-5',
    title: 'Rural Clinic Outreach',
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    category: 'Health',
    createdAt: '2024-03-03T00:00:00.000Z',
  },
  {
    _id: 'sample-6',
    title: 'Food Security Drive',
    imageUrl:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    category: 'Food',
    createdAt: '2024-02-27T00:00:00.000Z',
  },
];

const filterSamples = (category) => {
  if (!category || category === 'All') {
    return sampleGallery;
  }

  return sampleGallery.filter((item) => item.category === category);
};

const getGalleryItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category && category !== 'All' ? { category } : {};
    const items = await Gallery.find(query).sort({ createdAt: -1 });

    if (!items.length) {
      const fallbacks = filterSamples(category);
      return res.json({ count: fallbacks.length, items: fallbacks, source: 'sample' });
    }

    return res.json({ count: items.length, items, source: 'database' });
  } catch (error) {
    console.error('Fetch gallery error:', error.message);
    next(error);
  }
};

module.exports = { getGalleryItems };
