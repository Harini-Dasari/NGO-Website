import { Link } from 'react-router-dom'
import styles from './About.module.css'

// Structured content data keeps the markup focused and easy to maintain.
const team = [
  {
    name: 'Ananya Varma',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Ravi Naidu',
    role: 'Programs Lead',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Meera Iyer',
    role: 'Health Director',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7b?auto=format&fit=crop&w=600&q=80',
  },
]

const services = [
  {
    title: 'Food Security',
    desc: 'Community kitchens and ration support for families facing climate-related crop loss.',
    icon: '🍲',
  },
  {
    title: 'Health Access',
    desc: 'Mobile health camps and telemedicine pods serving remote habitations every fortnight.',
    icon: '💊',
  },
  {
    title: 'Education Pods',
    desc: 'STEM bridge courses and digital libraries that keep rural students learning year-round.',
    icon: '📚',
  },
]

const impactStats = [
  { label: 'Active volunteers', value: '450+' },
  { label: 'Districts covered', value: '32' },
  { label: 'Meals served', value: '1.2M' },
]

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>People-powered change</p>
          <h1>About SevaConnect</h1>
          <p className={styles.lead}>
            SevaConnect is a volunteer-first network building dignified access to food, health, and
            education across rural India. We design programs hand-in-hand with communities so that
            every intervention feels local and lasting.
          </p>
          <div className={styles.heroHighlights}>
            <p>👣 Grassroots partnerships with panchayat leaders</p>
            <p>📊 Real-time transparency dashboards</p>
          </div>
          <div className={styles.heroStats}>
            {impactStats.map((stat) => (
              <article key={stat.label}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.dualSection}>
        <article>
          <div className={styles.dualIcon}>🎯</div>
          <p className={styles.sectionHeadingMinor}>Our Mission</p>
          <h2>Mobilize citizens faster than crises spread.</h2>
          <p>
            Activate local volunteers within hours and route supplies with transparent dashboards so
            relief meets people when it matters most.
          </p>
        </article>
        <article>
          <div className={styles.dualIcon}>🌱</div>
          <p className={styles.sectionHeadingMinor}>Our Vision</p>
          <h2>Every village can self-organize with dignity.</h2>
          <p>
            Equip grassroots leaders with data, transport, and playbooks so communities decide and
            deliver their own solutions.
          </p>
        </article>
      </section>

      <section className={styles.storySection}>
        <div>
          <p className={styles.sectionTag}>Our Story</p>
          <h2>Born from weekend drives, now a nationwide movement.</h2>
          <p>
            SevaConnect began in 2016 when a handful of friends turned their weekend rides into food
            distribution runs for drought-hit villages. Word-of-mouth recruitments, open-source
            playbooks, and data-backed transparency helped us grow into a network that donors and
            district officials trust alike.
          </p>
        </div>
        <ul className={styles.timeline}>
          <li>
            <span>2016</span>
            <p>First relief drive reaches 5 villages in Telangana.</p>
          </li>
          <li>
            <span>2019</span>
            <p>Launch of mobile health clinics with government doctors.</p>
          </li>
          <li>
            <span>2022</span>
            <p>Education pods replicate across 80 tribal hamlets.</p>
          </li>
        </ul>
      </section>

      <section>
        <p className={styles.sectionTag}>Our Team</p>
        <h2 className={styles.sectionHeading}>People behind the field force</h2>
        <div className={styles.teamGrid}>
          {team.map((member) => (
            <article key={member.name} className={styles.teamCard}>
              <img src={member.image} alt={member.name} />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className={styles.sectionTag}>What we do</p>
        <h2 className={styles.sectionHeading}>Programs that keep dignity at the center</h2>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <article key={service.title} className={styles.serviceCard}>
              <span>{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div>
          <p className={styles.sectionTag}>Join the circle</p>
          <h2>Ready to volunteer this week?</h2>
          <p>
            Training, transport, and mentorship are on us. Bring your heart and two spare hours—we
            will match you with the closest campaign.
          </p>
        </div>
        <Link to="/volunteer" className={styles.ctaButton}>
          Become a volunteer
        </Link>
      </section>
    </div>
  )
}

export default About
