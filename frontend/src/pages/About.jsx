const pillars = [
  {
    title: 'Community first',
    copy: 'Programs are co-created with panchayat leaders, ASHA workers, and youth groups to stay relevant.',
  },
  {
    title: 'Radical transparency',
    copy: 'Every rupee is tracked with public dashboards and quarterly open town halls.',
  },
  {
    title: 'Tech for good',
    copy: 'Volunteer check-ins, logistics, and impact reports are digitized to scale faster.',
  },
]

const About = () => (
  <section className="content-section">
    <h1>About Hope Initiative</h1>
    <p>
      We are a volunteer-driven NGO focusing on rural education, healthcare, and climate resilience.
      Since 2012, we have partnered with 200+ villages to design hyperlocal programs that address
      their most urgent needs.
    </p>
    <div className="pillars">
      {pillars.map((pillar) => (
        <article key={pillar.title}>
          <h3>{pillar.title}</h3>
          <p>{pillar.copy}</p>
        </article>
      ))}
    </div>
  </section>
)

export default About
