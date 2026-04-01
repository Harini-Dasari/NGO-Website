import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Volunteer from './pages/Volunteer'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'

// Layout wrapper decides whether global elements render for a given route.
const AppShell = () => {
  const location = useLocation()
  const footerlessRoutes = new Set(['/about', '/works'])
  const hideFooter = footerlessRoutes.has(location.pathname)

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}

const App = () => (
  <Router>
    <AppShell />
  </Router>
)

export default App
