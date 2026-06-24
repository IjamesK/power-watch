import { useEffect, useState } from 'react'

export default function MapScreen() {
  const [weather, setWeather] = useState<any>(null)

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
  return (
    <div style={{ padding: '16px' }}>

      {/* ALERT BANNER */}
      <div style={{
        background: '#1C0A00',
        border: '1px solid #B45309',
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ fontSize: '20px' }}>⚠️</span>
        <div>
          <div style={{ fontWeight: 600, color: '#F59E0B', fontSize: '13px' }}>2 Active Outages Near You</div>
          <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>Ntinda & Kamwokya affected</div>
        </div>
      </div>
{/* WEATHER WIDGET */}
<div style={{
        background: weather ? riskBg[weather.risk as keyof typeof riskBg] : '#131313',
        border: `1px solid ${weather ? riskColor[weather.risk as keyof typeof riskColor] + '44' : '#2A2A2A'}`,
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '12px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          🌤️ Live Weather · Kampala
        </div>
        {weather ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '28px' }}>{weather.icon}</span>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{weather.temp}°C</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{weather.condition}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>💨 {weather.wind} km/h</div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px' }}>🌧️ {weather.rain}mm</div>
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
          <div style={{ fontSize: '13px', color: '#6B7280' }}>Fetching weather...</div>
        )}
      </div>
      {/* MAP PLACEHOLDER */}
      <div style={{
        background: '#1A1A1A',
        border: '1px solid #2A2A2A',
        borderRadius: '12px',
        height: '260px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
        {/* Grid lines to simulate map */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(#2A2A2A 1px, transparent 1px), linear-gradient(90deg, #2A2A2A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }} />

        <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#131313', border: '1px solid #2A2A2A', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: 600, color: '#E5E7EB' }}>
          🗺️ Kampala, Uganda
        </div>

        {/* OUTAGE PINS */}
        <OutagePin top={90} left={120} color="#EF4444" label="Ntinda" detail="General Outage · 2h 14m" />
        <OutagePin top={140} left={200} color="#F59E0B" label="Kamwokya" detail="Area Outage · 45m" />
        <OutagePin top={60} left={240} color="#F59E0B" label="Bukoto" detail="Risk Flag · Storm" />
        <OutagePin top={180} left={80} color="#22C55E" label="Makindye" detail="Power Restored" />

        {/* LEGEND */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          background: '#131313', border: '1px solid #2A2A2A',
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
              <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* OUTAGE CARDS */}
      <div style={{ fontWeight: 600, fontSize: '13px', color: '#9CA3AF', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Active Incidents</div>

      <OutageCard
        zone="Ntinda"
        type="General Outage"
        cause="Infrastructure Fault"
        duration="2h 14m"
        color="#EF4444"
        reports={14}
      />
      <OutageCard
        zone="Kamwokya"
        type="Area Outage"
        cause="Road Construction — KCCA Works"
        duration="45m"
        color="#F59E0B"
        reports={6}
      />
      <OutageCard
        zone="Bukoto"
        type="Risk Flag"
        cause="Heavy rain forecast · Next 3hrs"
        duration="—"
        color="#3B82F6"
        reports={2}
      />
    </div>
  )
}

function OutagePin({ top, left, color, label, detail }: any) {
  return (
    <div style={{ position: 'absolute', top, left }}>
      <div style={{
        width: '14px', height: '14px', borderRadius: '50%',
        background: color, border: '2px solid #0D0D0D',
        boxShadow: `0 0 10px ${color}`,
        cursor: 'pointer',
      }} />
      <div style={{
        position: 'absolute', top: '-28px', left: '50%',
        transform: 'translateX(-50%)',
        background: '#131313', border: '1px solid #2A2A2A',
        borderRadius: '5px', padding: '3px 7px',
        fontSize: '9px', fontWeight: 600, color: '#E5E7EB',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </div>
    </div>
  )
}

function OutageCard({ zone, type, cause, duration, color, reports }: any) {
  return (
    <div style={{
      background: '#1A1A1A', border: '1px solid #2A2A2A',
      borderLeft: `3px solid ${color}`,
      borderRadius: '10px', padding: '14px 16px',
      marginBottom: '10px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <div>
          <div style={{ fontWeight: 700, color: '#fff', fontSize: '15px' }}>{zone}</div>
          <div style={{ fontSize: '12px', color, fontWeight: 600, marginTop: '2px' }}>{type}</div>
        </div>
        <div style={{ background: '#131313', border: '1px solid #2A2A2A', borderRadius: '6px', padding: '4px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{duration}</div>
          <div style={{ fontSize: '10px', color: '#6B7280' }}>duration</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '10px' }}>📍 {cause}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '11px', color: '#6B7280' }}>👥 {reports} community reports</div>
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