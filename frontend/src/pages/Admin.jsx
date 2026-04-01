import { useEffect, useState } from 'react'
import api, { adminRequestConfig } from '../services/api'
import Loader from '../components/Loader'
import Toast from '../components/Toast'

const Admin = () => {
  const [volunteers, setVolunteers] = useState([])
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)

  const adminToken = import.meta.env.VITE_ADMIN_TOKEN

  const fetchData = async () => {
    if (!adminToken) {
      setError('Set VITE_ADMIN_TOKEN in frontend/.env to use the admin dashboard.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const [{ data: volunteerData }, { data: contactData }] = await Promise.all([
        api.get('/volunteers', adminRequestConfig()),
        api.get('/contacts', adminRequestConfig()),
      ])
      setVolunteers(volunteerData.volunteers || [])
      setContacts(contactData.contacts || [])
    } catch (fetchError) {
      const message =
        fetchError?.response?.data?.error || 'Unable to load admin data right now.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleView = (resource, record) => {
    if (resource === 'volunteer') {
      setToast({
        type: 'info',
        message: `${record.name} · ${record.phone} · ${record.address}`,
      })
      return
    }

    setToast({ type: 'info', message: `${record.name} · ${record.email}` })
  }

  const handleDelete = async (resource, id) => {
    try {
      await api.delete(`/${resource}/${id}`, adminRequestConfig())
      setToast({ type: 'success', message: `${resource.slice(0, -1)} removed.` })
      fetchData()
    } catch (deleteError) {
      const message = deleteError?.response?.data?.error || 'Failed to delete entry.'
      setToast({ type: 'error', message })
    }
  }

  return (
    <section className="admin-section">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1>Field submissions overview</h1>
          <p className="muted">
            Review volunteer signups and contact messages in real time. Use the delete buttons to
            remove spam or test entries.
          </p>
        </div>
        <button className="btn secondary" onClick={fetchData} type="button">
          Refresh data
        </button>
      </div>

      {isLoading && <Loader label="Loading submissions..." />}
      {error && <p className="error-text">{error}</p>}

      {!isLoading && !error && (
        <div className="admin-grid">
          <article>
            <div className="admin-card-header">
              <h2>Volunteers</h2>
              <span className="tag">{volunteers.length} entries</span>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer) => (
                    <tr key={volunteer._id}>
                      <td>{volunteer.name}</td>
                      <td>{volunteer.email}</td>
                      <td>{volunteer.phone}</td>
                      <td>{volunteer.address}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="table-button view"
                            onClick={() => handleView('volunteer', volunteer)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="table-button delete"
                            onClick={() => handleDelete('volunteers', volunteer._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {volunteers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="muted">
                        No volunteers yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <article>
            <div className="admin-card-header">
              <h2>Contact Messages</h2>
              <span className="tag">{contacts.length} entries</span>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.message}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="table-button view"
                            onClick={() => handleView('contact', contact)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="table-button delete"
                            onClick={() => handleDelete('contacts', contact._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan="4" className="muted">
                        No messages yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  )
}

export default Admin
