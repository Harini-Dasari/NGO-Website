import { useState } from 'react'
import api from '../services/api'

const initialMessage = {
  name: '',
  email: '',
  message: '',
}

const contactDetails = [
  {
    title: 'Visit our hub',
    lines: ['SevaConnect Commons', 'Plot 12, Road 36, Jubilee Hills', 'Hyderabad, Telangana 500033'],
  },
  {
    title: 'Call or WhatsApp',
    lines: ['+91 90000 12345', 'Mon – Fri · 9:00 AM – 7:00 PM IST'],
  },
  {
    title: 'Write to us',
    lines: ['care@sevaconnect.org', 'press@sevaconnect.org'],
  },
]

const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.390304023246!2d78.43475457606787!3d17.436824802686604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95ddd9b70921%3A0x7053744d2f6a3933!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1711910400000!5m2!1sen!2sin'

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
    <section className="content-section contact-page">
      <header className="contact-lead">
        <h1>Contact us</h1>
        <p>
          Have a partnership idea, CSR query, or press request? Drop a message and the team will follow up
          with the right point of contact. You can also reach the field office directly using the details
          here.
        </p>
      </header>

      <div className="contact-grid">
        <form className="form-card contact-form" onSubmit={handleSubmit}>
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
        {status && (
          <p className="success-text" aria-live="polite">
            {status}
          </p>
        )}
        {error && (
          <p className="error-text" aria-live="assertive">
            {error}
          </p>
        )}
        <p className="muted small-text">All messages receive a response within two working days.</p>
      </form>

      <aside className="contact-info">
        {contactDetails.map((detail) => (
          <article key={detail.title} className="contact-card">
            <p className="contact-card-label">{detail.title}</p>
            {detail.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </article>
        ))}
      </aside>
      </div>

      <section className="contact-map" aria-label="Office location on map">
        <div className="contact-map-card">
          <iframe
            src={mapEmbedUrl}
            title="SevaConnect Jubilee Hills location"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-map-copy">
          <p>
            The Jubilee Hills collaboration hub is five minutes from the metro station. Call ahead to schedule
            a walkthrough or donor meet-up; walk-ins are welcome on Fridays.
          </p>
        </div>
      </section>
    </section>
  )
}

export default Contact
