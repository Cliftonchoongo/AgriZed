import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Commodities({ user }) {
  const [commodities, setCommodities] = useState([])
  const [form, setForm] = useState({
    id: '', name: '', description: '', type: 'grain',
    bagWeightKg: 50, measurementType: 'crate', animalType: 'cow'
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchCommodities() }, [])

  const fetchCommodities = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API}/commodities`)
      setCommodities(res.data)
    } catch (err) { setMessage('Error fetching commodities') }
    finally { setLoading(false) }
  }

  const handleSubmit = async () => {
    if (!form.id || !form.name || !form.description) {
      setMessage('Please fill in all fields!')
      return
    }
    try {
      await axios.post(`${API}/commodities`, form)
      setMessage('Commodity added!')
      setForm({ id: '', name: '', description: '', type: 'grain', bagWeightKg: 50, measurementType: 'crate', animalType: 'cow' })
      fetchCommodities()
    } catch (err) { setMessage('Error adding commodity') }
  }

  const getTypeClass = (c) => {
    if (c.bagWeightKg) return 'grain'
    if (c.measurementType) return 'produce'
    return 'livestock'
  }

  const getTypeIcon = (c) => {
    if (c.bagWeightKg) return '🌾'
    if (c.measurementType) return '🥬'
    return '🐄'
  }

  const getTypeLabel = (c) => {
    if (c.bagWeightKg) return 'Grain'
    if (c.measurementType) return 'Produce'
    return 'Livestock'
  }

  return (
    <div>
      <div className="page-header">
        <h1>🌽 Commodities</h1>
        <p>Agricultural commodities being traded across Zambia</p>
      </div>

      {user?.role === 'FARMER' ? (
        <div className="form">
          <h3>➕ Add New Commodity</h3>
          <input placeholder="ID (e.g. c1)" value={form.id}
            onChange={e => setForm({...form, id: e.target.value})} />
          <input placeholder="Commodity Name" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} />
          <input placeholder="Description" value={form.description}
            onChange={e => setForm({...form, description: e.target.value})} />
          <select value={form.type}
            onChange={e => setForm({...form, type: e.target.value})}>
            <option value="grain">🌾 Grain</option>
            <option value="produce">🥬 Produce</option>
            <option value="livestock">🐄 Livestock</option>
          </select>
          {form.type === 'grain' && (
            <input placeholder="Bag Weight (kg)" value={form.bagWeightKg}
              onChange={e => setForm({...form, bagWeightKg: e.target.value})} />
          )}
          {form.type === 'produce' && (
            <input placeholder="Measurement Type (crate/kg)" value={form.measurementType}
              onChange={e => setForm({...form, measurementType: e.target.value})} />
          )}
          {form.type === 'livestock' && (
            <input placeholder="Animal Type (cow/goat/pig)" value={form.animalType}
              onChange={e => setForm({...form, animalType: e.target.value})} />
          )}
          <button onClick={handleSubmit}>Add Commodity</button>
          {message && <p className="success-msg">{message}</p>}
        </div>
      ) : (
        <div style={{
          background: 'linear-gradient(135deg, #fff8e1, #fffde7)',
          border: '1px solid #ffe082',
          borderRadius: '14px',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <span style={{fontSize: '40px'}}>🌽</span>
          <div>
            <p style={{fontWeight: '700', color: '#1a3a1a', fontSize: '15px'}}>
              Commodity Catalogue
            </p>
            <p style={{color: '#555', fontSize: '13px', marginTop: '4px', lineHeight: '1.5'}}>
              Browse all agricultural commodities being traded.
              {user?.role === 'BUYER' && ' As a Buyer you can view commodities and monitor their prices across markets.'}
              {user?.role === 'ANALYST' && ' As an Analyst you have full visibility into all commodity data.'}
              {' '}Only Farmers can register new commodities.
            </p>
          </div>
        </div>
      )}

      <div className="list">
        <h3>All Commodities ({commodities.length})</h3>
        {loading && (
          <p style={{textAlign:'center', color:'#999', padding:'20px'}}>
            Loading commodities...
          </p>
        )}
        {commodities.length === 0 && !loading && (
          <div className="empty-state">
            <span>🌽</span>
            <p>No commodities registered yet</p>
          </div>
        )}
        <div className="cards-grid">
          {commodities.map(c => (
            <div key={c.id} className="commodity-card">
              <div className={`commodity-card-header ${getTypeClass(c)}`}>
                <h4>{getTypeIcon(c)} {c.name}</h4>
                <p style={{opacity: 0.8, fontSize: '12px', marginTop: '4px'}}>
                  ID: {c.id}
                </p>
              </div>
              <div className="commodity-card-body">
                <p>{c.description}</p>
                <p>📦 Unit: <strong>{c.unit}</strong></p>
              </div>
              <div style={{
                padding: '10px 16px',
                background: '#fafafa',
                borderTop: '1px solid #eee'
              }}>
                <span className={`badge ${
                  getTypeClass(c) === 'grain' ? 'badge-orange' :
                  getTypeClass(c) === 'produce' ? 'badge-green' : 'badge-brown'
                }`}>
                  {getTypeLabel(c)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Commodities