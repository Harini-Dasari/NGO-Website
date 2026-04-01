import { useState } from 'react'
import api from '../services/api'

const initialMessage = {
  name: '',
  email: '',
  message: '',
}

const Contact = () => {
  const [formData, setFormData] = useState(initialMessage)
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
      await api.post('/contacts', formData)
      setStatus('Message received! We typically respond within two business days.')
      setFormData(initialMessage)
    } catch (submissionError) {
      const message =
        submissionError?.response?.data?.error || 'Unable to send your message right now.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="content-section">
      <h1>Contact us</h1>
      <p>
        Have a partnership idea, CSR query, or press request? Drop a message and the team will follow up
        with the right point of contact.
      </p>
      <form className="form-card" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
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
          Message
          <textarea
            required
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help"
          />
        </label>
        <button className="btn primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
        {status && <p className="success-text">{status}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </section>
  )
}

export default Contact
