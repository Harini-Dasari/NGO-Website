import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const impactStats = [
  { label: 'Volunteers', value: '1,200+', copy: 'Community champions on call.', icon: '🤝' },
  { label: 'Districts served', value: '15', copy: 'From coastal belts to hill hamlets.', icon: '🗺️' },
  { label: 'Lives impacted', value: '65K+', copy: 'Families supported with dignity.', icon: '✨' },
]

const projects = [
  {
    title: 'Food Distribution',
    summary: 'Community kitchens and ration drives keep families nourished.',
    impact: 'Provided meals to 500+ families',
    category: 'Relief',
    image:
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Learning Pods',
    summary: 'Solar-powered classrooms for first-generation learners.',
    impact: '90% exam success rate',
    category: 'Education',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Mobile Health Camps',
    summary: 'Nurses and volunteers conduct screenings in remote mandals.',
    impact: '3,200+ health checkups',
    category: 'Health',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
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
  {
    image: 'https://images.unsplash.com/photo-1511296265584-1c7ed261ad32?auto=format&fit=crop&w=800&q=80',
    caption: 'Nutrition drive · Godavari delta',
  },
  {
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    caption: 'Community reading club',
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

const heroImage =
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80'

const SectionHeader = ({ tag, title, subtitle }) => (
  <div className={styles.sectionHeader}>
    {tag && <p className={styles.sectionTag}>{tag}</p>}
    <h2 className={styles.sectionHeading}>{title}</h2>
    {subtitle && <p className={styles.sectionSubtext}>{subtitle}</p>}
  </div>
)

const StatCard = ({ value, label, copy, icon }) => (
  <article className={styles.impactCard}>
    <span className={styles.statIcon} aria-hidden="true">
      {icon}
    </span>
    <span className={styles.impactValue}>{value}</span>
    <p className={styles.impactLabel}>{label}</p>
    <p className="muted">{copy}</p>
  </article>
)

const WorkCard = ({ project }) => (
  <article className={`${styles.workCard} card-lift`}>
    <div className={styles.workImage}>
      <img src={project.image} alt={project.title} loading="lazy" />
    </div>
    <div className={styles.workBody}>
      <div className={styles.workMeta}>
        <span className="tag">{project.category}</span>
        <span>{project.impact}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="muted">{project.summary}</p>
    </div>
  </article>
)

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
  return (
    <div className={styles.homePage}>
      {/* Hero section */}
      <section className={styles.heroSection}>
        <div>
          <p className={styles.heroEyebrow}>SevaConnect · Grassroots care</p>
          <h1 className={styles.heroHeading}>
            Together, for a <span className={styles.highlight}>brighter future</span>
          </h1>
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
        <SectionHeader
          tag="Impact"
          title="Impact that scales with trust"
          subtitle="Transparent dashboards, community ownership, and relentless volunteers keep every rupee accountable."
        />
        <div className={styles.impactGrid}>
          {impactStats.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      {/* Works showcase */}
      <section className={styles.sectionShell}>
        <SectionHeader
          tag="Programs"
          title="Stories of courage"
          subtitle="Programs co-created with panchayat leaders, nurses, and youth clubs across 15 districts."
        />
        <div className={styles.worksGrid}>
          {projects.map((project) => (
            <WorkCard key={project.title} project={project} />
          ))}
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
