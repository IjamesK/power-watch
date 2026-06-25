import { useState } from 'react'
import './index.css'
import { ThemeProvider, useTheme } from './theme'
import MapScreen from './screens/MapScreen'
import ReportScreen from './screens/ReportScreen'
import LearnScreen from './screens/LearnScreen'
import AlertsScreen from './screens/AlertsScreen'
import ModeratorScreen from './screens/ModeratorScreen'

function AppInner() {
  const { dark, toggle, c } = useTheme()
  const [screen, setScreen] = useState<'map' | 'report' | 'learn' | 'alerts' | 'moderator'>('map')

  const tabs = [
    { id: 'map', icon: '🗺️', label: 'Map' },
    { id: 'report', icon: '📋', label: 'Report' },
    { id: 'learn', icon: '📚', label: 'Learn' },
    { id: 'alerts', icon: '🔔', label: 'Alerts', badge: 2 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* TOP BAR */}
      <div style={{
        background: c.topbar,
        borderBottom: `1px solid ${c.border}`,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', color: c.text }}>
            ⚡ Power<span style={{ color: '#F59E0B' }}>Watch</span>
          </div>
          {/* THEME TOGGLE */}
          <button
            onClick={toggle}
            title="Toggle theme"
            style={{
              width: '44px', height: '24px',
              borderRadius: '12px',
              background: dark ? '#F59E0B' : '#D1D5DB',
              border: 'none', cursor: 'pointer',
              position: 'relative', flexShrink: 0,
            }}>
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%',
              background: '#fff',
              position: 'absolute', top: '3px',
              left: dark ? '23px' : '3px',
              transition: 'left 0.2s',
            }} />
          </button>
          <span style={{ fontSize: '11px', color: c.subtext }}>{dark ? '🌙' : '☀️'}</span>
        </div>

        <button
          onClick={() => setScreen('moderator')}
          style={{
            background: screen === 'moderator' ? '#F59E0B' : c.panel,
            color: screen === 'moderator' ? '#000' : c.subtext,
            border: `1px solid ${c.border}`,
            borderRadius: '6px',
            padding: '5px 10px',
            fontSize: '11px', fontWeight: 600,
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
        position: 'fixed', bottom: 0,
        left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '430px',
        background: c.topbar,
        borderTop: `1px solid ${c.border}`,
        display: 'flex', zIndex: 100,
      }}>
        {tabs.map((tab: any) => (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id as any)}
            style={{
              flex: 1, padding: '10px 0',
              background: 'transparent',
              color: screen === tab.id ? '#F59E0B' : c.subtext,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '3px',
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

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
