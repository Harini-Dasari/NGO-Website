import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/landingimage.png'
import BlurText from '../components/BlurText'
import CircularGallery from '../components/CircularGallery'
import api from '../services/api'
import gallerySamples from '../data/gallerySamples'
import styles from './Home.module.css'

const impactStats = [
  {
    label: 'Volunteers',
    value: '1,200+',
    copy: 'Community champions on call.',
    icon: 'hands',
    variant: 'Sunrise',
  },
  {
    label: 'Districts served',
    value: '15',
    copy: 'From coastal belts to hill hamlets.',
    icon: 'mapPin',
    variant: 'Sky',
  },
  {
    label: 'Lives impacted',
    value: '65K+',
    copy: 'Families supported with dignity.',
    icon: 'spark',
    variant: 'Aurora',
  },
]

const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80',
    caption: 'School readiness session · Vizag',
  },
  {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    caption: 'STEM lab mentors · Nizamabad',
  },
  {
    image: 'https://images.unsplash.com/photo-1459183885421-5cc683b8dbba?auto=format&fit=crop&w=800&q=80',
    caption: 'Relief kits packed with love',
  },
  {
    image: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=800&q=80',
    caption: 'Women&apos;s health circle · Kurnool',
  },
]

const testimonials = [
  {
    name: 'Ananya Verma',
    role: 'Volunteer lead',
    quote:
      'Every weekend with SevaConnect reminds me that empathy and efficient logistics can co-exist.',
  },
  {
    name: 'Ravi Naidu',
    role: 'Beneficiary · Vizianagaram',
    quote:
      'The learning pods kept my kids engaged even when schools were shut. We now dream bigger.',
  },
  {
    name: 'Dr. Meera Iyer',
    role: 'Medical partner',
    quote:
      'The mobile clinics reach villages that rarely see a doctor. The team is relentless.',
  },
]

const impactHighlights = [
  { icon: '🛡️', text: 'Community verified data' },
  { icon: '📡', text: 'Live volunteer dashboards' },
  { icon: '📑', text: 'Audited fund utilization' },
]

const programHighlights = [
  { icon: '⚡', label: 'Rapid relief teams', copy: '72-hour disaster mobilization' },
  { icon: '📘', label: 'Learning pods', copy: 'Solar classrooms across 15 districts' },
  { icon: '🩺', label: 'Mobile clinics', copy: 'Nurses + diagnostics on wheels' },
]

const normalizeCampGallery = (items = []) =>
  items
    .map((item) => ({
      image: item.imageUrl ?? item.image,
      text: item.title ?? item.text ?? item.caption ?? '',
    }))
    .filter((item) => item.image && item.text)

const defaultCampGallery = normalizeCampGallery(gallerySamples).slice(0, 10)

const statIcons = {
  hands: (
    <svg viewBox="0 0 32 32" role="presentation" focusable="false">
      <path
        d="M11 9c1.657 0 3 1.343 3 3v2.25l-.585.585a2 2 0 0 0 0 2.83l2.92 2.92a1.5 1.5 0 0 0 2.12 0l3.045-3.046A4 4 0 0 0 24 14.328V12c0-1.657-1.343-3-3-3h-1"
        fill="none"
        stroke="url(#handStroke)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11c-1.657 0-3 1.343-3 3v2c0 2.21 1.79 4 4 4"
        fill="none"
        stroke="url(#handStroke)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="handStroke" x1="6" x2="24" y1="9" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f57c00" />
          <stop offset="1" stopColor="#ffb74d" />
        </linearGradient>
      </defs>
    </svg>
  ),
  mapPin: (
    <svg viewBox="0 0 32 32" role="presentation" focusable="false">
      <path
        d="M16 6c-3.038 0-5.5 2.462-5.5 5.5 0 4.375 5.5 10.5 5.5 10.5s5.5-6.125 5.5-10.5C21.5 8.462 19.038 6 16 6z"
        fill="url(#pinGradient)"
      />
      <circle cx="16" cy="11.5" r="1.8" fill="#fff" />
      <defs>
        <linearGradient id="pinGradient" x1="10.5" x2="21.5" y1="6" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64b5f6" />
          <stop offset="1" stopColor="#1976d2" />
        </linearGradient>
      </defs>
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 32 32" role="presentation" focusable="false">
      <path
        d="M16 6l1.7 4.8 4.8 1.7-4.8 1.7-1.7 4.8-1.7-4.8-4.8-1.7 4.8-1.7z"
        fill="url(#sparkGradient)"
      />
      <path d="M9 22l1.2 2.4L12.6 26l-2.4 1.2L9 29.6 7.8 27.2 5.4 26l2.4-1.2z" fill="#ffd180" />
      <defs>
        <linearGradient id="sparkGradient" x1="11" x2="21" y1="6" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffab40" />
          <stop offset="1" stopColor="#ff7043" />
        </linearGradient>
      </defs>
    </svg>
  ),
}

const SectionHeader = ({ tag, title, subtitle }) => (
  <div className={styles.sectionHeader}>
    {tag && <p className={styles.sectionTag}>{tag}</p>}
    <h2 className={styles.sectionHeading}>{title}</h2>
    {subtitle && <p className={styles.sectionSubtext}>{subtitle}</p>}
  </div>
)

const StatCard = ({ value, label, copy, icon, variant = 'Sunrise' }) => {
  const iconSvg = statIcons[icon]
  const cardClass = `${styles.impactCard} ${styles[`impactCard${variant}`] ?? ''}`

  return (
    <article className={cardClass}>
      <div className={styles.impactMetricHead}>
        <span className={styles.statIcon} aria-hidden="true">
          {iconSvg}
        </span>
        <div>
          <span className={styles.impactValue}>{value}</span>
          <p className={styles.impactLabel}>{label}</p>
        </div>
      </div>
      <p className={`${styles.impactCopy} muted`}>{copy}</p>
    </article>
  )
}

const GalleryTile = ({ item }) => (
  <div className={styles.galleryTile}>
    <img src={item.image} alt={item.caption} loading="lazy" />
    <span className={styles.galleryOverlay}>{item.caption}</span>
  </div>
)

const TestimonialCard = ({ testimonial }) => (
  <article className={styles.testimonialCard}>
    <p className={styles.testimonialQuote}>“{testimonial.quote}”</p>
    <p className={styles.testimonialName}>{testimonial.name}</p>
    <p className={styles.testimonialRole}>{testimonial.role}</p>
  </article>
)

const Home = () => {
  const [campGalleryItems, setCampGalleryItems] = useState(defaultCampGallery)

  useEffect(() => {
    let mounted = true

    const fetchCampGallery = async () => {
      try {
        const { data } = await api.get('/gallery')
        if (!mounted) return

        const normalized = normalizeCampGallery(data?.items ?? [])
        setCampGalleryItems(normalized.length ? normalized.slice(0, 12) : defaultCampGallery)
      } catch (error) {
        console.error('Camp gallery fetch failed:', error.message)
        if (mounted) {
          setCampGalleryItems(defaultCampGallery)
        }
      }
    }

    fetchCampGallery()

    return () => {
      mounted = false
    }
  }, [])

  const handleHeroAnimationComplete = () => {
    console.log('Hero text animation completed')
  }

  return (
    <div className={styles.homePage}>
      {/* Hero section */}
      <section className={styles.heroSection}>
        <div>
          <p className={styles.heroEyebrow}>SevaConnect · Grassroots care</p>
          <BlurText
            as="h1"
            className={styles.heroHeading}
            text="Together, for a brighter future"
            delay={180}
            animateBy="words"
            direction="top"
            highlightWords={['brighter', 'future']}
            highlightClassName={styles.highlight}
            onAnimationComplete={handleHeroAnimationComplete}
          />
          <p className={styles.heroSubtext}>
            Empowering communities through compassion and action. We co-design education, health,
            and relief programs with local leaders so impact stays personal.
          </p>
          <div className={styles.heroButtons}>
            <Link className="btn primary" to="/volunteer">
              Join Us &amp; Make Impact
            </Link>
            <Link className="btn secondary" to="/works">
              Explore Our Work
            </Link>
          </div>
        </div>
        <div className={styles.heroImageWrap}>
          <img src={heroImage} alt="Volunteers helping elders during a relief drive" />
        </div>
      </section>

      {/* Impact stats */}
      <section className={styles.sectionShell}>
        <div className={styles.impactHeader}>
          <SectionHeader
            tag="Impact"
            title="Impact that scales with trust"
            subtitle="Transparent dashboards, community ownership, and relentless volunteers keep every rupee accountable."
          />
          <ul className={styles.impactHighlights}>
            {impactHighlights.map((item) => (
              <li key={item.text} className={styles.impactHighlightItem}>
                <span aria-hidden="true">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.impactGrid}>
          {impactStats.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      {/* Works showcase */}
      <section className={`${styles.sectionShell} ${styles.programsSection}`}>
        <div className={styles.programsHeader}>
          <SectionHeader
            tag="Programs"
            title="Stories of courage"
            subtitle="Programs co-created with panchayat leaders, nurses, and youth clubs across 15 districts."
          />
          <div className={styles.programsHighlights}>
            {programHighlights.map((item) => (
              <article key={item.label} className={styles.programHighlightCard}>
                <span aria-hidden="true">{item.icon}</span>
                <div>
                  <p className={styles.programHighlightLabel}>{item.label}</p>
                  <p className={styles.programHighlightCopy}>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.programGalleryWrap}>
          <div className={styles.programGalleryViewport}>
            <CircularGallery
              items={campGalleryItems}
              bend={1.8}
              textColor="#f8fafc"
              borderRadius={0.08}
              scrollSpeed={2.2}
              scrollEase={0.04}
            />
          </div>
          <p className={styles.programGalleryHint}>Scroll or drag to explore every field story.</p>
        </div>
        <div className={styles.sectionActions}>
          <Link className="btn secondary" to="/works">
            Explore more programs
          </Link>
        </div>
      </section>

      {/* Call to action */}
      <section className={styles.ctaSection}>
        <p className={styles.ctaText}>Be the change you wish to see.</p>
        <Link className="btn primary" to="/volunteer">
          Become a Volunteer
        </Link>
        <span className={styles.floatingSpark} aria-hidden="true">
          ✨
        </span>
      </section>

      {/* Gallery preview */}
      <section className={styles.sectionShell}>
        <SectionHeader
          tag="Gallery"
          title="Glimpses from the field"
          subtitle="Relief kits, classrooms, and community kitchens powered by SevaConnect citizens."
        />
        <div className={styles.galleryGrid}>
          {galleryItems.map((item) => (
            <GalleryTile key={item.caption} item={item} />
          ))}
        </div>
        <div className={styles.sectionActions}>
          <Link className="btn secondary" to="/gallery">
            View Full Gallery
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.sectionShell}>
        <SectionHeader
          tag="Voices"
          title="Voices that guide us"
          subtitle="Volunteers and partners remind us why radical empathy matters every single day."
        />
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
