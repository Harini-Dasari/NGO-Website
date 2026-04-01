import styles from './Works.module.css'

// Simple project data keeps the layout flexible without overloading text or imagery.
const featuredProject = {
  title: 'Community Nourish Drive',
  category: 'Food Security',
  impact: '32 relief kitchens · 180K meals served since January',
  summary: 'Rapid meal prep pods led by women self-help groups keep migrant families nourished.',
}

const projects = [
  {
    title: 'Food Distribution Pods',
    category: 'Food',
    summary: 'Weekly ration kits co-delivered with local kirana stores to 1,200 households.',
    impact: 'Households covered: 1,200',
  },
  {
    title: 'Mobile Health Camp',
    category: 'Health',
    summary: 'Nurses and doctors set up rotating clinics for vaccinations and screenings.',
    impact: 'Patients reached: 2,850',
  },
  {
    title: 'Learning Bridge Support',
    category: 'Education',
    summary: 'Pop-up study corners mentored by college volunteers to prevent dropouts.',
    impact: 'Students mentored: 640',
  },
  {
    title: 'Nutrition Counseling Circles',
    category: 'Health',
    summary: 'Anganwadi workers host micro sessions on child nutrition and lactation.',
    impact: 'Mothers supported: 420',
  },
  {
    title: 'Seed Bank Collective',
    category: 'Food',
    summary: 'Farmer groups exchange drought-resistant seeds with zero-interest loans.',
    impact: 'Villages linked: 18',
  },
  {
    title: 'STEM After-school Pods',
    category: 'Education',
    summary: 'Robotics and coding labs simplify science for rural teens every weekend.',
    impact: 'Teens participating: 320',
  },
]

const categories = ['All', 'Food', 'Health', 'Education']

const Works = () => {
  return (
    <div className={styles.worksPage}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Impact in motion</p>
        <h1>Our Works</h1>
        <p>
          Every SevaConnect initiative is lightweight, trackable, and community-run. Here is a quick
          pulse of what volunteers are shipping this quarter.
        </p>
      </section>

      <section className={styles.filters}>
        {categories.map((cat) => (
          <button key={cat} type="button">
            {cat}
          </button>
        ))}
      </section>

      <section className={styles.featured}>
        <div>
          <p className={styles.tag}>{featuredProject.category}</p>
          <h2>{featuredProject.title}</h2>
          <p>{featuredProject.summary}</p>
          <p className={styles.impact}>{featuredProject.impact}</p>
        </div>
      </section>

      <section>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <article key={project.title} className={styles.projectCard}>
              <div className={styles.cardTop}>
                <p className={styles.tag}>{project.category}</p>
                <h3>{project.title}</h3>
              </div>
              <p>{project.summary}</p>
              <p className={styles.impact}>{project.impact}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Works
