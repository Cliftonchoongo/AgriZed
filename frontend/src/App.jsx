import { useState } from 'react'
import Markets from './components/Markets'
import Commodities from './components/Commodities'
import Prices from './components/Prices'
import Users from './components/Users'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('markets')

  return (
    <div className="app">
      <header>
        <h1>🌾 AgriZed</h1>
        <p>Agricultural Market Price Monitor</p>
        <nav>
          <button onClick={() => setActivePage('markets')}>Markets</button>
          <button onClick={() => setActivePage('commodities')}>Commodities</button>
          <button onClick={() => setActivePage('prices')}>Prices</button>
          <button onClick={() => setActivePage('users')}>Users</button>
        </nav>
      </header>
      <main>
        {activePage === 'markets' && <Markets />}
        {activePage === 'commodities' && <Commodities />}
        {activePage === 'prices' && <Prices />}
        {activePage === 'users' && <Users />}
      </main>
    </div>
  )
}

export default App