import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Commodities() {
  const [commodities, setCommodities] = useState([])
  const [form, setForm] = useState({ id: '', name: '', description: '', type: 'grain', bagWeightKg: 50, measurementType: 'crate', animalType: 'cow' })
  const [message, setMessage] = useState('')

  useEffect(() => { fetchCommodities() }, [])

  const fetchCommodities = async () => {
    try {
      const res = await axios.get(`${API}/commodities`)
      setCommodities(res.data)
    } catch (err) { setMessage('Error fetching commodities') }
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${API}/commodities`, form)
      setMessage('Commodity added!')
      fetchCommodities()
    } catch (err) { setMessage('Error adding commodity') }
  }

  return (
    <div>
      <h2>Commodities</h2>
      <div className="form">
        <h3>Add New Commodity</h3>
        <input placeholder="ID" value={form.id} onChange={e => setForm({...form, id: e.target.value})} />
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
          <option value="grain">Grain</option>
          <option value="produce">Produce</option>
          <option value="livestock">Livestock</option>
        </select>
        {form.type === 'grain' && <input placeholder="Bag Weight (kg)" value={form.bagWeightKg} onChange={e => setForm({...form, bagWeightKg: e.target.value})} />}
        {form.type === 'produce' && <input placeholder="Measurement Type" value={form.measurementType} onChange={e => setForm({...form, measurementType: e.target.value})} />}
        {form.type === 'livestock' && <input placeholder="Animal Type" value={form.animalType} onChange={e => setForm({...form, animalType: e.target.value})} />}
        <button onClick={handleSubmit}>Add Commodity</button>
        {message && <p>{message}</p>}
      </div>
      <div className="list">
        <h3>All Commodities</h3>
        {commodities.length === 0 && <p>No commodities yet</p>}
        {commodities.map(c => (
          <div key={c.id} className="card">
            <h4>{c.name}</h4>
            <p>{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Commodities