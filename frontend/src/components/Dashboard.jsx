import { useState, useEffect } from 'react'
import axios from 'axios'
import Markets from './Markets'
import Commodities from './Commodities'
import Prices from './Prices'

const API = 'http://localhost:7070'

function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState('home')
  const [stats, setStats] = useState({ markets: 0, commodities: 0, prices: 0 })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [markets, commodities, prices] = await Promise.all([
        axios.get(`${API}/markets`),
        axios.get(`${API}/commodities`),
        axios.get(`${API}/prices/current`)
      ])
      setStats({
        markets: markets.data.length,
        commodities: commodities.data.length,
        prices: prices.data.length
      })
    } catch (err) {}
  }

  const roleColor = {
    FARMER: '#2e7d32',
    BUYER: '#1565c0',
    ANALYST: '#6a1b9a'
  }

  const roleIcon = {
    FARMER: '🌱',
    BUYER: '🛒',
    ANALYST: '📊'
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">🌾</div>
          <h2>AgriZed</h2>
        </div>

        <div className="user-info">
          <div className="avatar" style={{background: roleColor[user.role]}}>
            {roleIcon[user.role]}
          </div>
          <div>
            <p className="user-name">{user.name}</p>
            <p className="user-role">{user.role}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={activePage === 'home' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActivePage('home')}>
            🏠 Dashboard
          </button>
          <button className={activePage === 'markets' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActivePage('markets')}>
            🏪 Markets
          </button>
          <button className={activePage === 'commodities' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActivePage('commodities')}>
            🌽 Commodities
          </button>
          <button className={activePage === 'prices' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActivePage('prices')}>
            💰 Prices
          </button>
        </nav>

        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activePage === 'home' && (
          <div className="home-page">
            <h1>Welcome back, {user.name}! {roleIcon[user.role]}</h1>
            <p className="subtitle">Here's what's happening in the market today</p>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🏪</div>
                <div className="stat-number">{stats.markets}</div>
                <div className="stat-label">Markets</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌽</div>
                <div className="stat-number">{stats.commodities}</div>
                <div className="stat-label">Commodities</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-number">{stats.prices}</div>
                <div className="stat-label">Price Entries</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">{roleIcon[user.role]}</div>
                <div className="stat-number">{user.role}</div>
                <div className="stat-label">Your Role</div>
              </div>
            </div>

            {/* Role based message */}
            <div className="role-banner" style={{
              background: roleColor[user.role],
              color: 'white',
              padding: '16px 24px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              {user.role === 'FARMER' && '🌱 As a Farmer you can add markets, commodities and submit prices.'}
              {user.role === 'BUYER' && '🛒 As a Buyer you can view markets, commodities and current prices.'}
              {user.role === 'ANALYST' && '📊 As an Analyst you have full read access to all market data.'}
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button className="action-card" onClick={() => setActivePage('markets')}>
                  <span>🏪</span>
                  <p>View Markets</p>
                </button>
                <button className="action-card" onClick={() => setActivePage('commodities')}>
                  <span>🌽</span>
                  <p>View Commodities</p>
                </button>
                <button className="action-card" onClick={() => setActivePage('prices')}>
                  <span>💰</span>
                  <p>View Prices</p>
                </button>
                {user.role === 'FARMER' && (
                  <button className="action-card" onClick={() => setActivePage('prices')}>
                    <span>➕</span>
                    <p>Submit Price</p>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {activePage === 'markets' && <Markets user={user} />}
        {activePage === 'commodities' && <Commodities user={user} />}
        {activePage === 'prices' && <Prices user={user} />}
      </div>
    </div>
  )
}

export default Dashboard