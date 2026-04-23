import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Commodities() {
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
    } catch (err) {
      setMessage('Error fetching commodities')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${API}/commodities`, form)
      setMessage('Commodity added!')
      fetchCommodities()
    } catch (err) { setMessage('Error adding commodity') }
  }

  const getTypeLabel = (c) => {
    if (c.bagWeightKg) return 'Grain'
    if (c.measurementType) return 'Produce'
    return 'Livestock'
  }

  const getTypeIcon = (c) => {
    if (c.bagWeightKg) return '🌾'
    if (c.measurementType) return '🥬'
    return '🐄'
  }

  return (
    <div>
      <div className="page-header">
        <h1>🌽 Commodities</h1>
        <p>View and manage agricultural commodities</p>
      </div>

      <div className="form">
        <h3>Add New Commodity</h3>
        <input placeholder="ID" value={form.id}
          onChange={e => setForm({...form, id: e.target.value})} />
        <input placeholder="Name" value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Description" value={form.description}
          onChange={e => setForm({...form, description: e.target.value})} />
        <select value={form.type}
          onChange={e => setForm({...form, type: e.target.value})}>
          <option value="grain">Grain</option>
          <option value="produce">Produce</option>
          <option value="livestock">Livestock</option>
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

      <div className="list">
        <h3>All Commodities ({commodities.length})</h3>
        {loading && <p style={{textAlign:'center', color:'#999'}}>Loading...</p>}
        {commodities.length === 0 && !loading && (
          <div className="empty-state">
            <span style={{fontSize:'48px'}}>🌽</span>
            <p>No commodities yet. Add your first commodity!</p>
          </div>
        )}
        <div className="cards-grid">
          {commodities.map(c => (
            <div key={c.id} className="card">
              <h4>{getTypeIcon(c)} {c.name}</h4>
              <p>{c.description}</p>
              <p>📦 {c.unit}</p>
              <span className="badge badge-blue">{getTypeLabel(c)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Commodities