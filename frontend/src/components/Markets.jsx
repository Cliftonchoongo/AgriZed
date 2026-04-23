import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Markets({ user }) {
  const [markets, setMarkets] = useState([])
  const [form, setForm] = useState({ id: '', name: '', town: '', province: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchMarkets() }, [])

  const fetchMarkets = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API}/markets`)
      setMarkets(res.data)
    } catch (err) {
      setMessage('Error fetching markets')
    } finally { setLoading(false) }
  }

  const handleSubmit = async () => {
    if (!form.id || !form.name || !form.town || !form.province) {
      setMessage('Please fill in all fields!')
      return
    }
    try {
      await axios.post(`${API}/markets`, form)
      setMessage('Market added successfully!')
      setForm({ id: '', name: '', town: '', province: '' })
      fetchMarkets()
    } catch (err) { setMessage('Error adding market') }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this market?')) return
    try {
      await axios.delete(`${API}/markets/${id}`)
      fetchMarkets()
    } catch (err) { setMessage('Error deleting market') }
  }

  return (
    <div>
      <div className="page-header">
        <h1>🏪 Markets</h1>
        <p>Agricultural markets across Zambia</p>
      </div>

      {user?.role === 'ANALYST' ? (
        <div className="form">
          <h3>➕ Add New Market</h3>
          <input placeholder="ID (e.g. m1)" value={form.id}
            onChange={e => setForm({...form, id: e.target.value})} />
          <input placeholder="Market Name" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} />
          <input placeholder="Town" value={form.town}
            onChange={e => setForm({...form, town: e.target.value})} />
          <input placeholder="Province" value={form.province}
            onChange={e => setForm({...form, province: e.target.value})} />
          <button onClick={handleSubmit}>Add Market</button>
          {message && <p className="success-msg">{message}</p>}
        </div>
      ) : (
        <div className="role-notice">
          👁️ You have view-only access to markets
        </div>
      )}

      <div className="list">
        <h3>All Markets ({markets.length})</h3>
        {loading && <p style={{textAlign:'center', color:'#999', padding:'20px'}}>Loading markets...</p>}
        {markets.length === 0 && !loading && (
          <div className="empty-state">
            <span>🏪</span>
            <p>No markets registered yet</p>
          </div>
        )}
        <div className="cards-grid">
          {markets.map(m => (
            <div key={m.id} className="market-card">
              <div className="market-card-header">
                <h4>🏪 {m.name}</h4>
                <p style={{opacity:0.8, fontSize:'12px', marginTop:'4px'}}>ID: {m.id}</p>
              </div>
              <div className="market-card-body">
                <p>📍 <strong>Town:</strong> {m.town}</p>
                <p>🗺️ <strong>Province:</strong> {m.province}</p>
              </div>
              <div className="market-card-footer">
                <span className="badge badge-green">Active</span>
                {user?.role === 'ANALYST' && (
                  <button className="btn-delete" onClick={() => handleDelete(m.id)}>
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Markets