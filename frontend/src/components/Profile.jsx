function Profile({ user }) {
  const roleColor = {
    FARMER: '#2d5a27',
    BUYER: '#1565c0',
    ANALYST: '#6a1b9a'
  }

  const roleIcon = {
    FARMER: '🌱',
    BUYER: '🛒',
    ANALYST: '📊'
  }

  const roleDescription = {
    FARMER: 'You can add commodities and submit market prices.',
    BUYER: 'You can view all markets, commodities and current prices.',
    ANALYST: 'You have full access. You can manage markets and view all data.'
  }

  return (
    <div>
      <div className="page-header">
        <h1>👤 My Profile</h1>
        <p>Your account details and permissions</p>
      </div>

      {/* Profile Card */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        marginBottom: '24px'
      }}>
        {/* Banner */}
        <div style={{
          background: `linear-gradient(135deg, ${roleColor[user.role]}, ${roleColor[user.role]}99)`,
          height: '100px',
          position: 'relative'
        }}></div>

        {/* Avatar */}
        <div style={{padding: '0 24px 24px', marginTop: '-40px'}}>
          <div style={{
            width: '80px', height: '80px',
            background: roleColor[user.role],
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', border: '4px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            {roleIcon[user.role]}
          </div>

          <h2 style={{fontSize: '22px', fontWeight: '800', color: '#1a3a1a', marginTop: '12px'}}>
            {user.name}
          </h2>
          <span style={{
            display: 'inline-block',
            background: roleColor[user.role],
            color: 'white',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            marginTop: '6px'
          }}>
            {roleIcon[user.role]} {user.role}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px'}}>

        <div style={{background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'}}>
          <p style={{fontSize: '11px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px'}}>
            User ID
          </p>
          <p style={{fontSize: '18px', fontWeight: '700', color: '#1a3a1a'}}>
            {user.id}
          </p>
        </div>

        <div style={{background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'}}>
          <p style={{fontSize: '11px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px'}}>
            Email
          </p>
          <p style={{fontSize: '15px', fontWeight: '600', color: '#1a3a1a'}}>
            {user.email || 'Not provided'}
          </p>
        </div>

        <div style={{background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'}}>
          <p style={{fontSize: '11px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px'}}>
            Province
          </p>
          <p style={{fontSize: '15px', fontWeight: '600', color: '#1a3a1a'}}>
            📍 {user.province || 'Not provided'}
          </p>
        </div>

        <div style={{background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'}}>
          <p style={{fontSize: '11px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px'}}>
            {user.role === 'FARMER' ? 'Farm Location' : user.role === 'BUYER' ? 'Company' : 'Organisation'}
          </p>
          <p style={{fontSize: '15px', fontWeight: '600', color: '#1a3a1a'}}>
            {user.farmLocation || user.companyName || user.organisation || 'Not provided'}
          </p>
        </div>
      </div>

      {/* Permissions Card */}
      <div style={{
        background: 'white', borderRadius: '14px',
        padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        borderLeft: `4px solid ${roleColor[user.role]}`
      }}>
        <h3 style={{fontSize: '15px', fontWeight: '700', color: '#1a3a1a', marginBottom: '16px'}}>
          🔐 Your Permissions
        </h3>
        <p style={{fontSize: '13px', color: '#555', marginBottom: '16px'}}>
          {roleDescription[user.role]}
        </p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>{user.role === 'ANALYST' ? '✅' : '❌'}</span>
            <span style={{fontSize: '13px', color: '#444'}}>Add & delete markets</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>{user.role === 'FARMER' ? '✅' : '❌'}</span>
            <span style={{fontSize: '13px', color: '#444'}}>Add commodities</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>{user.role === 'FARMER' ? '✅' : '❌'}</span>
            <span style={{fontSize: '13px', color: '#444'}}>Submit prices</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>✅</span>
            <span style={{fontSize: '13px', color: '#444'}}>View all markets, commodities and prices</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>{user.role === 'ANALYST' ? '✅' : '❌'}</span>
            <span style={{fontSize: '13px', color: '#444'}}>Export data</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile