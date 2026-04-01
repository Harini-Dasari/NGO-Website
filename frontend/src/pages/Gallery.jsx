import { useEffect, useMemo, useState } from 'react'
import api from '../services/api'
import Loader from '../components/Loader'
import gallerySamples from '../data/gallerySamples'

const categories = ['All', 'Education', 'Health', 'Food']

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
          setGalleryItems(gallerySamples)
          setError('Bringing stories online soon. Showing our highlights meanwhile.')
        }
      } catch (apiError) {
        console.error('Gallery fetch failed:', apiError.message)
        if (!mounted) return
        setGalleryItems(gallerySamples)
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
