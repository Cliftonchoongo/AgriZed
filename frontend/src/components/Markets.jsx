import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Markets() {
  const [markets, setMarkets] = useState([])
  const [form, setForm] = useState({ id: '', name: '', town: '', province: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMarkets()
  }, [])

  const fetchMarkets = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API}/markets`)
      setMarkets(res.data)
    } catch (err) {
      setMessage('Error fetching markets')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${API}/markets`, form)
      setMessage('Market added successfully!')
      setForm({ id: '', name: '', town: '', province: '' })
      fetchMarkets()
    } catch (err) {
      setMessage('Error adding market')
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>🏪 Markets</h1>
        <p>View and manage agricultural markets across Zambia</p>
      </div>

      <div className="form">
        <h3>Add New Market</h3>
        <input placeholder="ID" value={form.id}
          onChange={e => setForm({...form, id: e.target.value})} />
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Town" value={form.town}
          onChange={e => setForm({...form, town: e.target.value})} />
        <input placeholder="Province" value={form.province}
          onChange={e => setForm({...form, province: e.target.value})} />
        <button onClick={handleSubmit}>Add Market</button>
        {message && <p className="success-msg">{message}</p>}
      </div>

      <div className="list">
        <h3>All Markets ({markets.length})</h3>
        {loading && <p style={{textAlign:'center', color:'#999'}}>Loading...</p>}
        {markets.length === 0 && !loading && (
          <div className="empty-state">
            <span style={{fontSize:'48px'}}>🏪</span>
            <p>No markets yet. Add your first market!</p>
          </div>
        )}
        <div className="cards-grid">
          {markets.map(m => (
            <div key={m.id} className="card">
              <h4>🏪 {m.name}</h4>
              <p>📍 {m.town}</p>
              <p>🗺️ {m.province}</p>
              <span className="badge badge-green">Active</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Markets