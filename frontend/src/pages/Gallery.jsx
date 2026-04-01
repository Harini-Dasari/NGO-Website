import { useEffect, useMemo, useState } from 'react'
import api from '../services/api'
import Loader from '../components/Loader'

const categories = ['All', 'Education', 'Health', 'Food']

const fallbackGallery = [
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
]

const formatMonthYear = (value) => {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery')
        if (!mounted) return

        if (Array.isArray(data?.items) && data.items.length) {
          setGalleryItems(data.items)
          setError('')
        } else {
          setGalleryItems(fallbackGallery)
          setError('Bringing stories online soon. Showing our highlights meanwhile.')
        }
      } catch (apiError) {
        console.error('Gallery fetch failed:', apiError.message)
        if (!mounted) return
        setGalleryItems(fallbackGallery)
        setError('Bringing stories online soon. Showing our highlights meanwhile.')
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchGallery()

    return () => {
      mounted = false
    }
  }, [])

  const visibleItems = useMemo(() => {
    if (activeCategory === 'All') {
      return galleryItems
    }

    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory, galleryItems])

  return (
    <section className="gallery-page">
      <header className="gallery-hero">
        <p className="eyebrow">Impact gallery</p>
        <h1>Moments of hope we&apos;re proud of</h1>
        <p className="muted">
          A living archive of classrooms, clinics, and community kitchens made possible
          by our volunteers and partners.
        </p>
      </header>

      <div className="gallery-filter" role="tablist">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={
              activeCategory === category ? 'filter-pill active' : 'filter-pill'
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {error && <p className="muted small-text">{error}</p>}

      {loading ? (
        <Loader label="Curating impact stories..." />
      ) : (
        <div className="gallery-grid">
          {visibleItems.map((item) => (
            <article key={item._id || item.id || item.title} className="gallery-card">
              <div className="gallery-media">
                <img src={item.imageUrl} alt={item.title} loading="lazy" />
                <span className="gallery-overlay">{item.category}</span>
              </div>
              <div className="gallery-meta">
                <p className="gallery-title">{item.title}</p>
                <p className="gallery-date">{formatMonthYear(item.createdAt)}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Gallery
