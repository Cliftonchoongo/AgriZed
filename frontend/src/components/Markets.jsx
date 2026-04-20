import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Markets() {
  const [markets, setMarkets] = useState([])
  const [form, setForm] = useState({ id: '', name: '', town: '', province: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchMarkets()
  }, [])

  const fetchMarkets = async () => {
    try {
      const res = await axios.get(`${API}/markets`)
      setMarkets(res.data)
    } catch (err) {
      setMessage('Error fetching markets')
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
      <h2>Markets</h2>

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
        {message && <p>{message}</p>}
      </div>

      <div className="list">
        <h3>All Markets</h3>
        {markets.length === 0 && <p>No markets yet</p>}
        {markets.map(m => (
          <div key={m.id} className="card">
            <h4>{m.name}</h4>
            <p>{m.town}, {m.province}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Markets