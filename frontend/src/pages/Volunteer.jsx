import { useState } from 'react'
import api from '../services/api'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  interest: '',
}

const Volunteer = () => {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')
    setIsSubmitting(true)

    try {
      await api.post('/volunteers', formData)
      setStatus('Thanks! Our coordinator will reach out within 48 hours.')
      setFormData(initialForm)
    } catch (submissionError) {
      const message =
        submissionError?.response?.data?.error || 'Unable to submit form right now.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="content-section">
      <h1>Volunteer with us</h1>
      <p>
        We onboard volunteers in batches every month. Share a few details and we will match you with an
        upcoming project near you.
      </p>
      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ananya Verma"
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.org"
          />
        </label>
        <label>
          Phone
          <input
            required
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 90000 00000"
          />
        </label>
        <label>
          Address
          <input
            required
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="City, State"
          />
        </label>
        <label>
          Area of interest
          <textarea
            name="interest"
            rows="4"
            value={formData.interest}
            onChange={handleChange}
            placeholder="Teaching, logistics, design, fundraising..."
          />
        </label>
        <button className="btn primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Join the volunteer pool'}
        </button>
        {status && <p className="success-text">{status}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </section>
  )
}

export default Volunteer
