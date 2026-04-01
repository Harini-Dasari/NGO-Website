const projects = [
  {
    name: 'Bridge School Pods',
    district: 'Nizamabad',
    summary:
      'Weekend support classes run by college volunteers helped 400 students clear board exams.',
  },
  {
    name: 'Maternal Health Circles',
    district: 'Kurnool',
    summary:
      'Nurses and local midwives conduct prenatal screenings and nutrition workshops every fortnight.',
  },
  {
    name: 'Climate-ready Farms',
    district: 'Vizianagaram',
    summary:
      'Farmer producer groups received drip kits and soil testing to conserve 2M liters of water.',
  },
]

const Works = () => (
  <section className="content-section">
    <h1>Our work on the ground</h1>
    <p>
      Each initiative is paired with rigorous monitoring so that donors and citizens can see progress
      in real time. A few highlights from the last 12 months:
    </p>
    <div className="project-list">
      {projects.map((project) => (
        <article key={project.name}>
          <div>
            <p className="tag">{project.district}</p>
            <h3>{project.name}</h3>
          </div>
          <p>{project.summary}</p>
        </article>
      ))}
    </div>
  </section>
)

export default Works
