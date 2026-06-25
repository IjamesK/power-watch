import { useState } from 'react'
import './index.css'
import MapScreen from './screens/MapScreen'
import ReportScreen from './screens/ReportScreen'
import LearnScreen from './screens/LearnScreen'
import AlertsScreen from './screens/AlertsScreen'
import ModeratorScreen from './screens/ModeratorScreen'

export default function App() {
  const [screen, setScreen] = useState<'map' | 'report' | 'learn' | 'alerts' | 'moderator'>('map')
  const [darkMode, setDarkMode] = useState(true)
  const tabs = [
    { id: 'map', icon: '🗺️', label: 'Map' },
    { id: 'report', icon: '📋', label: 'Report' },
    { id: 'learn', icon: '📚', label: 'Learn' },
    { id: 'alerts', icon: '🔔', label: 'Alerts', badge: 2 },
  ]

  return (
   <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: darkMode ? '#0D0D0D' : '#F8FAFC',
    color: darkMode ? '#FFFFFF' : '#111827'
  }}
>

      {/* TOP BAR */}
      <div style={{
        background: darkMode ? '#131313' : '#FFFFFF',
borderBottom: darkMode
  ? '1px solid #2A2A2A'
  : '1px solid #E5E7EB',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

  <div style={{
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: '18px',
    color: darkMode ? '#fff' : '#111827'
  }}>
    ⚡ Power<span style={{ color: '#F59E0B' }}>Watch</span>
  </div>

  <button
    onClick={() => setDarkMode(!darkMode)}
    style={{
      width: '48px',
      height: '24px',
      borderRadius: '12px',
      background: darkMode ? '#F59E0B' : '#D1D5DB',
      border: 'none',
      position: 'relative',
      cursor: 'pointer'
    }}
  >
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: '#fff',
        position: 'absolute',
        top: '2px',
        left: darkMode ? '26px' : '2px',
        transition: '0.2s'
      }}
    />
  </button>

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
        background: darkMode ? '#131313' : '#FFFFFF',
        borderTop: darkMode
         ? '1px solid #2A2A2A'
        : '1px solid #E5E7EB',
        display: 'flex',
        zIndex: 100,
      }}>
        {tabs.map((tab: any) => (
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
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ fontSize: '18px' }}>{tab.icon}</span>
              {tab.badge && (
                <span style={{
                  position: 'absolute', top: '-4px', right: '-6px',
                  background: '#EF4444', color: '#fff',
                  fontSize: '9px', fontWeight: 700,
                  width: '14px', height: '14px',
                  borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>{tab.badge}</span>
              )}
            </div>
            <span style={{ fontSize: '10px', fontWeight: 600 }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
