import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Prices({ user }) {
  const [prices, setPrices] = useState([])
  const [cheapest, setCheapest] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    id: '', commodityId: '', marketId: '',
    price: '', unit: '', submittedBy: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) setForm(f => ({...f, submittedBy: user.id}))
    fetchPrices()
    fetchCheapest()
  }, [])

  const fetchPrices = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API}/prices/current`)
      setPrices(res.data)
    } catch (err) { setMessage('Error fetching prices') }
    finally { setLoading(false) }
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
      <div className="page-header">
        <h1>💰 Prices</h1>
        <p>Submit and view current market prices</p>
      </div>

      <div className="form">
        <h3>Submit Price</h3>
        <input placeholder="Entry ID" value={form.id} onChange={e => setForm({...form, id: e.target.value})} />
        <input placeholder="Commodity ID" value={form.commodityId} onChange={e => setForm({...form, commodityId: e.target.value})} />
        <input placeholder="Market ID" value={form.marketId} onChange={e => setForm({...form, marketId: e.target.value})} />
        <input placeholder="Price (ZMW)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
        <input placeholder="Unit" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} />
        <input placeholder="Submitted By (User ID)" value={form.submittedBy} onChange={e => setForm({...form, submittedBy: e.target.value})} />
        <button onClick={handleSubmit}>Submit Price</button>
        {message && <p className="success-msg">{message}</p>}
      </div>

      <div className="list">
        <h3>Current Prices ({prices.length})</h3>
        {loading && <p style={{textAlign:'center', color:'#999'}}>Loading...</p>}
        {prices.length === 0 && !loading && (
          <div className="empty-state">
            <span style={{fontSize:'48px'}}>💰</span>
            <p>No prices yet. Submit your first price!</p>
          </div>
        )}
        <div className="cards-grid">
          {prices.map((p, i) => (
            <div key={i} className="card">
              <h4>🌽 {p.commodity?.name}</h4>
              <p>🏪 {p.market?.name}</p>
              <p>💰 {p.formattedPrice}</p>
              <span className="badge badge-green">Fresh</span>
            </div>
          ))}
        </div>
      </div>

      <div className="list" style={{marginTop:'24px'}}>
        <h3>Cheapest Markets 🏆</h3>
        {cheapest.length === 0 && (
          <div className="empty-state">
            <span style={{fontSize:'48px'}}>🏆</span>
            <p>No data yet</p>
          </div>
        )}
        <div className="cards-grid">
          {cheapest.map((p, i) => (
            <div key={i} className="card">
              <h4>🥇 {p.commodity?.name}</h4>
              <p>🏪 Cheapest at {p.market?.name}</p>
              <p>💰 ZMW {p.price}</p>
              <span className="badge badge-green">Best Price</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Prices