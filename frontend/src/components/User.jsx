import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:7070'

function Users() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    id: '', name: '', email: '', province: '',
    type: 'farmer', farmLocation: '', companyName: '', organisation: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`)
      setUsers(res.data)
    } catch (err) { setMessage('Error fetching users') }
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${API}/users/register`, form)
      setMessage('User registered!')
      fetchUsers()
    } catch (err) { setMessage(err.response?.data?.error || 'Error registering user') }
  }

  return (
    <div>
      <h2>Users</h2>
      <div className="form">
        <h3>Register User</h3>
        <input placeholder="ID" value={form.id} onChange={e => setForm({...form, id: e.target.value})} />
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
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
        <button onClick={handleSubmit}>Register</button>
        {message && <p>{message}</p>}
      </div>
      <div className="list">
        <h3>All Users</h3>
        {users.length === 0 && <p>No users yet</p>}
        {users.map(u => (
          <div key={u.id} className="card">
            <h4>{u.name}</h4>
            <p>{u.email} — {u.province}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users