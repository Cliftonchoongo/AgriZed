import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Login({ onLogin }) {
  const [step, setStep] = useState('login') // login or register
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    id: '', name: '', email: '', province: '',
    type: 'farmer', farmLocation: '', companyName: '', organisation: ''
  })

  const handleLogin = async () => {
    if (!userId.trim()) { setError('Please enter your ID'); return }
    try {
      const res = await axios.get(`${API}/users`)
      const user = res.data.find(u => u.id === userId)
      if (user) {
        onLogin(user)
      } else {
        setError('User not found. Please register first.')
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.')
    }
  }

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API}/users/register`, form)
      onLogin(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">🌾</div>
          <h1>AgriZed</h1>
          <p>Agricultural Market Price Monitor</p>
        </div>

        <div className="login-tabs">
          <button
            className={step === 'login' ? 'tab active' : 'tab'}
            onClick={() => { setStep('login'); setError('') }}>
            Login
          </button>
          <button
            className={step === 'register' ? 'tab active' : 'tab'}
            onClick={() => { setStep('register'); setError('') }}>
            Register
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {step === 'login' ? (
          <div className="login-form">
            <label>Enter your User ID</label>
            <input
              placeholder="e.g. u1"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
            <button className="btn-primary" onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <div className="login-form">
            <input placeholder="ID (e.g. u2)" value={form.id} onChange={e => setForm({...form, id: e.target.value})} />
            <input placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input placeholder="Province" value={form.province} onChange={e => setForm({...form, province: e.target.value})} />
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
              <option value="analyst">Analyst</option>
            </select>
            {form.type === 'farmer' && <input placeholder="Farm Location" value={form.farmLocation} onChange={e => setForm({...form, farmLocation: e.target.value})} />}
            {form.type === 'buyer' && <input placeholder="Company Name" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} />}
            {form.type === 'analyst' && <input placeholder="Organisation" value={form.organisation} onChange={e => setForm({...form, organisation: e.target.value})} />}
            <button className="btn-primary" onClick={handleRegister}>Create Account</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login