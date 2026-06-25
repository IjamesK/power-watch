import { useEffect, useState } from 'react'

export default function MapScreen({ darkMode }: any) {
  const theme = {
  background: darkMode ? '#0D0D0D' : '#F8FAFC',
  card: darkMode ? '#1A1A1A' : '#FFFFFF',
  border: darkMode ? '#2A2A2A' : '#E5E7EB',
  text: darkMode ? '#FFFFFF' : '#111827',
  secondary: darkMode ? '#9CA3AF' : '#6B7280'
}
  const [selectedOutage, setSelectedOutage] = useState<any | null>(null)
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

    {selectedOutage ? (
  <div>
    {/* BACK */}
    <button
      onClick={() => setSelectedOutage(null)}
      style={{
       background: theme.card, border: `1px solid ${theme.border}`,
        borderRadius: '8px', padding: '8px 14px',
        color: theme.secondary, fontSize: '13px', fontWeight: 600,
        marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px',
      }}>
      ← Back to Map
    </button>

    {/* HEADER CARD */}
    <div style={{
      background: theme.card,
      border: `1px solid ${selectedOutage.color}44`,
      borderLeft: `4px solid ${selectedOutage.color}`,
      borderRadius: '12px', padding: '18px', marginBottom: '14px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: theme.text, marginBottom: '4px' }}>
            {selectedOutage.zone}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: selectedOutage.color }}>
            {selectedOutage.type}
          </div>
        </div>
        <div style={{
          background: '#131313', border: `1px solid ${selectedOutage.color}44`,
          borderRadius: '8px', padding: '8px 14px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: theme.text, fontFamily: 'Syne, sans-serif' }}>
            {selectedOutage.duration}
          </div>
          <div style={{ fontSize: '10px', color: '#6B7280' }}>duration</div>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: '#6B7280' }}>
        📍 {selectedOutage.cause} &nbsp;·&nbsp; 👥 {selectedOutage.reports} reports
      </div>
    </div>

    {/* AFFECTED AREAS */}
    <div style={{
      background: theme.card, border: `1px solid ${theme.border}`,
      borderRadius: '10px', padding: '14px 16px', marginBottom: '14px',
    }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: selectedOutage.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
        📍 Affected Areas
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {['Trading Centre', 'Main Road', 'Stage Area', 'Nearby Estates'].map(area => (
          <div key={area} style={{
            background: '#131313', border: `1px solid ${theme.border}`,
            borderRadius: '6px', padding: '5px 12px',
            fontSize: '12px', color: '#E5E7EB',
          }}>
            {selectedOutage.zone} {area}
          </div>
        ))}
      </div>
    </div>

    {/* CHECKLIST */}
    <div style={{
      background: theme.card, border: `1px solid ${theme.border}`,
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
          borderBottom: i < arr.length - 1 ? '1px solid #2A2A2A' : 'none',
          alignItems: 'flex-start',
        }}>
          <span style={{ color: selectedOutage.color, fontWeight: 700, flexShrink: 0 }}>→</span>
          <span style={{ fontSize: '13px', color: theme.secondary, lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>

    {/* POWER RESTORED BUTTON */}
    <button
      style={{
        width: '100%', background: '#052E16',
        border: '1px solid #22C55E44', borderRadius: '10px',
        padding: '16px', color: '#22C55E',
        fontSize: '15px', fontWeight: 700, cursor: 'pointer',
      }}>
      ✓ Power is back in my area
    </button>
  </div>

    ) : (

      // ✅ MAIN UI
      <>
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
          <div style={{ fontSize: '12px', color: theme.secondary, marginTop: '2px' }}>Ntinda & Kamwokya affected</div>
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
                <div style={{ fontSize: '18px', fontWeight: 700, color: theme.text }}>{weather.temp}°C</div>
                <div style={{ fontSize: '12px', color: theme.secondary }}>{weather.condition}</div>
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
        background: theme.card,
        border: `1px solid ${theme.border}`,
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

        <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#131313', border: `1px solid ${theme.border}`, borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: 600, color: '#E5E7EB' }}>
          🗺️ Kampala, Uganda
        </div>

        {/* OUTAGE PINS */}
       <OutagePin
  top={90}
  left={120}
  color="#EF4444"
  label="Ntinda"
  detail="General Outage · 2h 14m"
  onClick={() =>
    setSelectedOutage({
      zone: "Ntinda",
      type: "General Outage",
      cause: "Infrastructure Fault",
      duration: "2h 14m",
      color: "#EF4444",
      reports: 14
    })
  }
/>
        <OutagePin 
          top={140} left={200} color="#F59E0B" label="Kamwokya" detail="Area Outage · 45m" 
            onClick={() =>
    setSelectedOutage({
      zone: "Kamwokya",
      type: "Area Outage",
      cause: "Road Construction - KCCA Works",
      duration: "45m",
      color: "#EF4444",
      reports: 12
    })
  }/>
        <OutagePin 
          top={60} left={240} color="#F59E0B" label="Bukoto" detail="Risk Flag · Storm"
                onClick={() =>
    setSelectedOutage({
      zone: "Bukoto",
      type: "Risk Flag",
      cause: "Heavy rain forecast",
      duration: "_",
      color: "#EF4444",
      reports: 2
    })
  }
          />
        <OutagePin 
          top={180} left={80} color="#22C55E" label="Makindye" detail="Power Restored" 
                          onClick={() =>
    setSelectedOutage({
      zone: "Makindye",
      type: "Power Restored",
      cause: "Outage, But power has been restored",
      duration: "_",
      color: "#EF4444",
      reports: 2
    })
  }
          />

        {/* LEGEND */}
        <div style={{
          position: 'absolute', bottom: '12px', right: '12px',
          background: '#131313', border: `1px solid ${theme.border}`,
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
              <span style={{ fontSize: '10px', color: theme.secondary }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* OUTAGE CARDS */}
      <div style={{ fontWeight: 600, fontSize: '13px', color: theme.secondary, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Active Incidents</div>

     <OutageCard
  zone="Ntinda"
  type="General Outage"
  cause="Infrastructure Fault"
  duration="2h 14m"
  color="#EF4444"
  reports={14}
  onClick={() =>
    setSelectedOutage({
      zone: "Ntinda",
      type: "General Outage",
      cause: "Infrastructure Fault",
      duration: "2h 14m",
      color: "#EF4444",
      reports: 14
    })
  }
/>
      <OutageCard
        zone="Kamwokya"
        type="Area Outage"
        cause="Road Construction — KCCA Works"
        duration="45m"
        color="#F59E0B"
        reports={6}
      onClick={() =>
  setSelectedOutage({
    zone: "Kamwokya",
    type: "Area Outage",
    cause: "Road Construction — KCCA Works",
    duration: "45m",
    color: "#F59E0B",
    reports: 6
  })
}
      />
      <OutageCard
        zone="Bukoto"
        type="Risk Flag"
        cause="Heavy rain forecast · Next 3hrs"
        duration="—"
        color="#3B82F6"
        reports={2}
       onClick={() =>
  setSelectedOutage({
    zone: "Bukoto",
    type: "Risk Flag",
    cause: "Heavy rain forecast · Next 3hrs",
    duration: "—",
    color: "#3B82F6",
    reports: 2
  })
}
      />
      </>

    )}

  </div>
)
}    
function OutagePin({
  top,
  left,
  color,
  label,
  detail,
  onClick,
}: any) {
  return (
    <div style={{ position: 'absolute', top, left }} onClick={onClick}>
      <div
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: color,
          border: '2px solid #0D0D0D',
          boxShadow: `0 0 10px ${color}`,
          cursor: 'pointer',
          animation: 'pulse 2s infinite',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#131313',
          border: '1px solid #2A2A2A',
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '9px',
          fontWeight: 600,
          color: '#E5E7EB',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}
      >
        <div>{label}</div>

        {detail && (
          <div
            style={{
              fontSize: '8px',
              color: '#9CA3AF',
              marginTop: '2px',
            }}
          >
            {detail}
          </div>
        )}
      </div>
    </div>
  )
}
function OutageCard({
  zone,
  type,
  cause,
  duration,
  color,
  reports,
  onClick,
}: any) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: '#1A1A1A',
        border: '1px solid #2A2A2A',
        borderLeft: `3px solid ${color}`,
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '6px',
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              color: '#FFFFFF',
              fontSize: '15px',
            }}
          >
            {zone}
          </div>

          <div
            style={{
              fontSize: '12px',
              color,
              fontWeight: 600,
              marginTop: '2px',
            }}
          >
            {type}
          </div>
        </div>

        <div
          style={{
            background: '#131313',
            border: '1px solid #2A2A2A',
            borderRadius: '6px',
            padding: '4px 10px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            {duration}
          </div>

          <div
            style={{
              fontSize: '10px',
              color: '#6B7280',
            }}
          >
            duration
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: '12px',
          color: '#9CA3AF',
          marginBottom: '10px',
        }}
      >
        📍 {cause}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            color: '#6B7280',
          }}
        >
          👥 {reports} community reports
        </div>

        <button
          style={{
            background: '#22C55E22',
            color: '#22C55E',
            border: '1px solid #22C55E44',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          ✓ Power Restored
        </button>
      </div>
    </div>
  )
}
