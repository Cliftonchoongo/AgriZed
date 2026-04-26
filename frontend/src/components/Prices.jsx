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
    if (!form.id || !form.commodityId || !form.marketId || !form.price || !form.unit) {
      setMessage('Please fill in all fields!')
      return
    }
    try {
      await axios.post(`${API}/prices`, {...form, price: parseFloat(form.price)})
      setMessage('Price submitted successfully!')
      fetchPrices()
      fetchCheapest()
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error submitting price')
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>💰 Market Prices</h1>
        <p>Current commodity prices across Zambian markets</p>
      </div>

      {user?.role === 'FARMER' ? (
        <div className="form">
          <h3>➕ Submit Price</h3>
          <input placeholder="Entry ID (e.g. p1)" value={form.id}
            onChange={e => setForm({...form, id: e.target.value})} />
          <input placeholder="Commodity ID" value={form.commodityId}
            onChange={e => setForm({...form, commodityId: e.target.value})} />
          <input placeholder="Market ID" value={form.marketId}
            onChange={e => setForm({...form, marketId: e.target.value})} />
          <input placeholder="Price (ZMW)" type="number" value={form.price}
            onChange={e => setForm({...form, price: e.target.value})} />
          <input placeholder="Unit (e.g. 50kg bag)" value={form.unit}
            onChange={e => setForm({...form, unit: e.target.value})} />
          <input placeholder="Your User ID" value={form.submittedBy}
            onChange={e => setForm({...form, submittedBy: e.target.value})} />
          <button onClick={handleSubmit}>Submit Price</button>
          {message && <p className={message.includes('Error') || message.includes('only') ? 'error-response' : 'success-msg'}>{message}</p>}
        </div>
      ) : (
        <div className="role-notice">
          👁️ You have view-only access to prices
        </div>
      )}

      <div className="list">
        <h3>📊 Current Market Prices ({prices.length})</h3>
        {loading && <p style={{textAlign:'center', color:'#999', padding:'20px'}}>Loading prices...</p>}
        {prices.length === 0 && !loading && (
          <div className="empty-state">
            <span>💰</span>
            <p>No prices submitted yet</p>
          </div>
        )}
        <div className="cards-grid">
          {prices.map((p, i) => (
            <div key={i} className="price-card">
              <div className="price-card-header">
                <h4>🌽 {p.commodity?.name}</h4>
                <p style={{opacity:0.8, fontSize:'12px', marginTop:'4px'}}>🏪 {p.market?.name}</p>
              </div>
              <div className="price-card-body">
                <div className="price-amount">ZMW {p.price}</div>
                <p style={{fontSize:'13px', color:'#666'}}>📦 {p.unit}</p>
                <p style={{fontSize:'12px', color:'#999', marginTop:'8px'}}>
                  {p.formattedPrice}
                </p>
              </div>
              <div style={{padding:'10px 16px', background:'#29184c', borderTop:'1px solid #84a2b8', display:'flex', justifyContent:'space-between'}}>
                <span className="badge badge-blue">Live</span>
                <span style={{fontSize:'12px', color:'#999'}}>Fresh ✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider"></div>

      <div className="list">
        <h3>🏆 Cheapest Markets by Commodity</h3>
        {cheapest.length === 0 && (
          <div className="empty-state">
            <span>🏆</span>
            <p>No price data available yet</p>
          </div>
        )}
        <div className="cards-grid">
          {cheapest.map((p, i) => (
            <div key={i} className="price-card">
              <div className="price-card-header" style={{background:'linear-gradient(135deg, #1b5e20, #2e7d32)'}}>
                <h4>🥇 {p.commodity?.name}</h4>
                <p style={{opacity:0.8, fontSize:'12px', marginTop:'4px'}}>Best price available</p>
              </div>
              <div className="price-card-body">
                <div className="price-amount">ZMW {p.price}</div>
                <p style={{fontSize:'13px', color:'#555'}}>🏪 {p.market?.name}</p>
                <p style={{fontSize:'12px', color:'#888', marginTop:'4px'}}>📍 {p.market?.town}</p>
              </div>
              <div style={{padding:'10px 16px', background:'#f9fdf9', borderTop:'1px solid #e8f5e9'}}>
                <span className="badge badge-green">Best Price 🏆</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Prices