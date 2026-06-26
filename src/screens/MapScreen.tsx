import { useEffect, useState } from 'react'
import { useTheme } from '../theme'

export default function MapScreen() {
  const { c, dark } = useTheme()
  const [selectedOutage, setSelectedOutage] = useState<any | null>(null)
  const [weather, setWeather] = useState<any>(null)
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=0.3163&longitude=32.5822&current=temperature_2m,precipitation,windspeed_10m&timezone=Africa%2FNairobi')
      .then(r => r.json())
      .then(data => {
        const temp = data.current.temperature_2m
        const rain = data.current.precipitation
        const wind = data.current.windspeed_10m
        let icon = '☀️', condition = 'Clear', risk = 'low'
        if (rain > 5 || wind > 40) { icon = '⛈️'; condition = 'Storm'; risk = 'high' }
        else if (rain > 1 || wind > 25) { icon = '🌧️'; condition = 'Heavy rain'; risk = 'medium' }
        else if (rain > 0) { icon = '🌦️'; condition = 'Light rain'; risk = 'medium' }
        setWeather({ temp, rain, wind, icon, condition, risk })
      })
      .catch(() => setWeather({ temp: 24, rain: 0, wind: 12, icon: '☀️', condition: 'Clear', risk: 'low' }))
  }, [])

  const riskColor = { low: '#22C55E', medium: '#F59E0B', high: '#EF4444' }
  const riskLabel = { low: 'Low Outage Risk', medium: 'Elevated Risk', high: 'High Outage Risk' }
  const riskBg = { low: '#052E16', medium: '#1C0A00', high: '#1A0505' }

  const outages = [
    { zone: 'Ntinda', type: 'General Outage', cause: 'Infrastructure Fault — Transformer failure', duration: '2h 14m', color: '#EF4444', reports: 14, top: 90, left: 120, detail: 'General Outage · 2h 14m' },
    { zone: 'Kamwokya', type: 'Area Outage', cause: 'Road Construction — KCCA Works', duration: '45m', color: '#F59E0B', reports: 6, top: 140, left: 200, detail: 'Area Outage · 45m' },
    { zone: 'Bukoto', type: 'Risk Flag', cause: 'Heavy rain forecast · Next 3hrs', duration: '—', color: '#3B82F6', reports: 2, top: 60, left: 240, detail: 'Risk Flag · Storm' },
    { zone: 'Makindye', type: 'Power Restored', cause: 'Faulty meter box — resolved by UEDCL', duration: '1h 20m', color: '#22C55E', reports: 8, top: 180, left: 80, detail: 'Power Restored' },
  ]

  if (selectedOutage) {
    return (
      <div style={{ padding: '16px' }}>

        {/* BACK */}
        <button
          onClick={() => { setSelectedOutage(null); setRestored(false) }}
          style={{
            background: c.panel, border: `1px solid ${c.border}`,
            borderRadius: '8px', padding: '8px 14px',
            color: c.muted, fontSize: '13px', fontWeight: 600,
            marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
          ← Back to Map
        </button>

        {/* HEADER */}
        <div style={{
          background: c.panel,
          border: `1px solid ${selectedOutage.color}44`,
          borderLeft: `4px solid ${selectedOutage.color}`,
          borderRadius: '12px', padding: '18px', marginBottom: '14px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: c.text, marginBottom: '4px' }}>
                {selectedOutage.zone}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: selectedOutage.color }}>
                {selectedOutage.type}
              </div>
            </div>
            <div style={{
              background: dark ? '#131313' : '#F1F5F9',
              border: `1px solid ${selectedOutage.color}44`,
              borderRadius: '8px', padding: '8px 14px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: c.text, fontFamily: 'Syne, sans-serif' }}>
                {selectedOutage.duration}
              </div>
              <div style={{ fontSize: '10px', color: c.subtext }}>duration</div>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: c.subtext }}>
            📍 {selectedOutage.cause} &nbsp;·&nbsp; 👥 {selectedOutage.reports} reports
          </div>
        </div>

        {/* AFFECTED AREAS */}
        <div style={{
          background: c.panel, border: `1px solid ${c.border}`,
          borderRadius: '10px', padding: '14px 16px', marginBottom: '14px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: selectedOutage.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            📍 Affected Areas
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Trading Centre', 'Main Road', 'Stage Area', 'Nearby Estates'].map(area => (
              <div key={area} style={{
                background: dark ? '#131313' : '#F1F5F9',
                border: `1px solid ${c.border}`,
                borderRadius: '6px', padding: '5px 12px',
                fontSize: '12px', color: c.text,
              }}>
                {selectedOutage.zone} {area}
              </div>
            ))}
          </div>
        </div>

        {/* CHECKLIST */}
        <div style={{
          background: c.panel, border: `1px solid ${c.border}`,
          borderRadius: '10px', padding: '14px 16px', marginBottom: '14px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: selectedOutage.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            📋 What To Do Now
          </div>
          {[
            'Switch off heavy appliances to prevent surge damage',
            'Save all open work on your devices now',
            'Inform customers — estimate 2–4 more hours',
            'Wait 2 minutes after power returns before switching back on',
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: 'flex', gap: '10px', padding: '8px 0',
              borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none',
              alignItems: 'flex-start',
            }}>
              <span style={{ color: selectedOutage.color, fontWeight: 700, flexShrink: 0 }}>→</span>
              <span style={{ fontSize: '13px', color: c.muted, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* POWER RESTORED */}
        {restored ? (
          <div style={{
            background: '#052E16', border: '1px solid #22C55E44',
            borderRadius: '10px', padding: '16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>✅</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#22C55E' }}>Thank you for confirming!</div>
            <div style={{ fontSize: '12px', color: c.subtext, marginTop: '4px' }}>
              Your confirmation helps update the map for everyone in {selectedOutage.zone}.
            </div>
          </div>
        ) : (
          <button
            onClick={() => setRestored(true)}
            style={{
              width: '100%', background: '#052E16',
              border: '1px solid #22C55E44', borderRadius: '10px',
              padding: '16px', color: '#22C55E',
              fontSize: '15px', fontWeight: 700, cursor: 'pointer',
            }}>
            ✓ Power is back in my area
          </button>
        )}
      </div>
    )
  }

  return (
    <div style={{ padding: '16px' }}>

      {/* ALERT BANNER */}
      <div style={{
        background: '#1C0A00', border: '1px solid #B45309',
        borderRadius: '10px', padding: '14px 16px',
        marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{ fontSize: '20px' }}>⚠️</span>
        <div>
          <div style={{ fontWeight: 600, color: '#F59E0B', fontSize: '13px' }}>2 Active Outages Near You</div>
          <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>Ntinda & Kamwokya affected</div>
        </div>
      </div>

      {/* WEATHER WIDGET */}
      <div style={{
        background: weather ? riskBg[weather.risk as keyof typeof riskBg] : c.panel,
        border: `1px solid ${weather ? riskColor[weather.risk as keyof typeof riskColor] + '44' : c.border}`,
        borderRadius: '10px', padding: '14px 16px', marginBottom: '12px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: c.subtext, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          🌤️ Live Weather · Kampala
        </div>
        {weather ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '28px' }}>{weather.icon}</span>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: c.text }}>{weather.temp}°C</div>
                <div style={{ fontSize: '12px', color: c.muted }}>{weather.condition}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: c.subtext }}>💨 {weather.wind} km/h</div>
              <div style={{ fontSize: '11px', color: c.subtext, marginBottom: '6px' }}>🌧️ {weather.rain}mm</div>
              <div style={{
                fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '5px',
                color: riskColor[weather.risk as keyof typeof riskColor],
                background: riskBg[weather.risk as keyof typeof riskBg],
                border: `1px solid ${riskColor[weather.risk as keyof typeof riskColor]}44`,
              }}>
                {riskLabel[weather.risk as keyof typeof riskLabel]}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '13px', color: c.subtext }}>Fetching weather...</div>
        )}
      </div>

      {/* MAP */}
      <div style={{
        background: c.panel, border: `1px solid ${c.border}`,
        borderRadius: '12px', height: '260px',
        position: 'relative', overflow: 'hidden', marginBottom: '16px',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${c.border} 1px, transparent 1px), linear-gradient(90deg, ${c.border} 1px, transparent 1px)`,
          backgroundSize: '40px 40px', opacity: 0.5,
        }} />
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          background: dark ? '#131313' : '#F1F5F9',
          border: `1px solid ${c.border}`, borderRadius: '6px',
          padding: '5px 10px', fontSize: '11px', fontWeight: 600, color: c.text,
        }}>
          🗺️ Kampala, Uganda
        </div>

        {outages.map(o => (
          <OutagePin
            key={o.zone}
            top={o.top} left={o.left}
            color={o.color} label={o.zone} detail={o.detail}
            onClick={() => setSelectedOutage(o)}
          />
        ))}

        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          background: dark ? '#131313' : '#F1F5F9',
          border: `1px solid ${c.border}`,
          borderRadius: '8px', padding: '8px 12px',
          display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          {[
            { color: '#EF4444', label: 'General Outage' },
            { color: '#F59E0B', label: 'Area Outage' },
            { color: '#3B82F6', label: 'Risk Flag' },
            { color: '#22C55E', label: 'Restored' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }} />
              <span style={{ fontSize: '10px', color: c.muted }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE INCIDENTS */}
      <div style={{ fontWeight: 600, fontSize: '12px', color: c.subtext, marginBottom: '10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Active Incidents
      </div>

      {outages.map(o => (
        <OutageCard
          key={o.zone}
          zone={o.zone} type={o.type} cause={o.cause}
          duration={o.duration} color={o.color} reports={o.reports}
          c={c}
          onClick={() => setSelectedOutage(o)}
        />
      ))}
    </div>
  )
}

function OutagePin({ top, left, color, label, detail, onClick }: any) {
  return (
    <div style={{ position: 'absolute', top, left, cursor: 'pointer' }} onClick={onClick}>
      <div style={{
        width: '14px', height: '14px', borderRadius: '50%',
        background: color, border: '2px solid #0D0D0D',
        boxShadow: `0 0 10px ${color}`,
        animation: 'pulse 2s infinite',
      }} />
      <div style={{
        position: 'absolute', top: '-40px', left: '50%',
        transform: 'translateX(-50%)',
        background: '#131313', border: '1px solid #2A2A2A',
        borderRadius: '6px', padding: '4px 8px',
        fontSize: '9px', fontWeight: 600, color: '#E5E7EB',
        whiteSpace: 'nowrap', textAlign: 'center',
      }}>
        <div>{label}</div>
        {detail && <div style={{ fontSize: '8px', color: '#9CA3AF', marginTop: '2px' }}>{detail}</div>}
      </div>
    </div>
  )
}

function OutageCard({ zone, type, cause, duration, color, reports, onClick, c }: any) {
  return (
    <div onClick={onClick} style={{
      cursor: 'pointer',
      background: c.panel, border: `1px solid ${c.border}`,
      borderLeft: `3px solid ${color}`,
      borderRadius: '10px', padding: '14px 16px', marginBottom: '10px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <div>
          <div style={{ fontWeight: 700, color: c.text, fontSize: '15px' }}>{zone}</div>
          <div style={{ fontSize: '12px', color, fontWeight: 600, marginTop: '2px' }}>{type}</div>
        </div>
        <div style={{ background: c.panel, border: `1px solid ${c.border}`, borderRadius: '6px', padding: '4px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: c.text }}>{duration}</div>
          <div style={{ fontSize: '10px', color: c.subtext }}>duration</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: c.muted, marginBottom: '10px' }}>📍 {cause}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '11px', color: c.subtext }}>👥 {reports} community reports</div>
        <button style={{
          background: '#22C55E22', color: '#22C55E',
          border: '1px solid #22C55E44',
          borderRadius: '6px', padding: '5px 12px',
          fontSize: '11px', fontWeight: 600,
        }}>
          ✓ Power Restored
        </button>
      </div>
    </div>
  )
}
