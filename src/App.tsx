import { useState } from 'react'
import './App.css'

// ── SCREENS ──
import MapScreen from './screens/MapScreen'
import ReportScreen from './screens/ReportScreen'
import LearnScreen from './screens/LearnScreen'
import AlertsScreen from './screens/AlertsScreen'
import ModeratorScreen from './screens/ModeratorScreen'

export default function App() {
  const [screen, setScreen] = useState<'map' | 'report' | 'learn' | 'alerts' | 'moderator'>('map')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* TOP BAR */}
      <div style={{
        background: '#131313',
        borderBottom: '1px solid #2A2A2A',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', color: '#fff' }}>
          ⚡ Power<span style={{ color: '#F59E0B' }}>Watch</span>
        </div>
        <button
          onClick={() => setScreen('moderator')}
          style={{
            background: screen === 'moderator' ? '#F59E0B' : '#1A1A1A',
            color: screen === 'moderator' ? '#000' : '#6B7280',
            border: '1px solid #2A2A2A',
            borderRadius: '6px',
            padding: '5px 10px',
            fontSize: '11px',
            fontWeight: 600,
          }}>
          🛡 Mod
        </button>
      </div>

      {/* SCREEN CONTENT */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
        {screen === 'map' && <MapScreen />}
        {screen === 'report' && <ReportScreen />}
        {screen === 'learn' && <LearnScreen />}
        {screen === 'alerts' && <AlertsScreen />}
        {screen === 'moderator' && <ModeratorScreen />}
      </div>

      {/* BOTTOM NAV */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        background: '#131313',
        borderTop: '1px solid #2A2A2A',
        display: 'flex',
        zIndex: 100,
      }}>
        {[
          { id: 'map', icon: '🗺️', label: 'Map' },
          { id: 'report', icon: '📋', label: 'Report' },
          { id: 'learn', icon: '📚', label: 'Learn' },
          { id: 'alerts', icon: '🔔', label: 'Alerts' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id as any)}
            style={{
              flex: 1,
              padding: '10px 0',
              background: 'transparent',
              color: screen === tab.id ? '#F59E0B' : '#6B7280',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              borderTop: screen === tab.id ? '2px solid #F59E0B' : '2px solid transparent',
              transition: 'all 0.15s',
            }}>
            <span style={{ fontSize: '18px' }}>{tab.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: 600 }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}