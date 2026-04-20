import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Prices() {
  const [prices, setPrices] = useState([])
  const [cheapest, setCheapest] = useState([])
  const [form, setForm] = useState({ id: '', commodityId: '', marketId: '', price: '', unit: '', submittedBy: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchPrices()
    fetchCheapest()
  }, [])

  const fetchPrices = async () => {
    try {
      const res = await axios.get(`${API}/prices/current`)
      setPrices(res.data)
    } catch (err) { setMessage('Error fetching prices') }
  }

  const fetchCheapest = async () => {
    try {
      const res = await axios.get(`${API}/prices/cheapest`)
      setCheapest(res.data)
    } catch (err) { setMessage('Error fetching cheapest') }
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${API}/prices`, {...form, price: parseFloat(form.price)})
      setMessage('Price submitted!')
      fetchPrices()
      fetchCheapest()
    } catch (err) { setMessage(err.response?.data?.error || 'Error submitting price') }
  }

  return (
    <div>
      <h2>Prices</h2>
      <div className="form">
        <h3>Submit Price</h3>
        <input placeholder="Entry ID" value={form.id} onChange={e => setForm({...form, id: e.target.value})} />
        <input placeholder="Commodity ID" value={form.commodityId} onChange={e => setForm({...form, commodityId: e.target.value})} />
        <input placeholder="Market ID" value={form.marketId} onChange={e => setForm({...form, marketId: e.target.value})} />
        <input placeholder="Price (ZMW)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
        <input placeholder="Unit" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} />
        <input placeholder="Submitted By (User ID)" value={form.submittedBy} onChange={e => setForm({...form, submittedBy: e.target.value})} />
        <button onClick={handleSubmit}>Submit Price</button>
        {message && <p>{message}</p>}
      </div>

      <div className="list">
        <h3>Current Prices</h3>
        {prices.length === 0 && <p>No prices yet</p>}
        {prices.map((p, i) => (
          <div key={i} className="card">
            <h4>{p.commodity?.name} @ {p.market?.name}</h4>
            <p>{p.formattedPrice}</p>
          </div>
        ))}
      </div>

      <div className="list">
        <h3>Cheapest Markets</h3>
        {cheapest.length === 0 && <p>No data yet</p>}
        {cheapest.map((p, i) => (
          <div key={i} className="card">
            <h4>{p.commodity?.name}</h4>
            <p>Cheapest at {p.market?.name} — ZMW {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Prices