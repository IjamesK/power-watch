import { useState } from 'react'

const outages = [
  {
    id: 1,
    zone: 'Ntinda',
    type: 'General Outage',
    cause: 'Infrastructure Fault',
    detail: 'A transformer serving the Ntinda trading centre has failed. UEDCL field team has been dispatched and is currently on site investigating.',
    duration: '2h 14m',
    started: '11:42 AM',
    color: '#EF4444',
    reports: 14,
    affected: ['Ntinda Market', 'Ntinda Shopping Centre', 'Kisaasi Road', 'Kulambiro'],
    checklist: [
      'Switch off heavy appliances to prevent surge damage when power returns',
      'Save all open work on computers and phones now',
      'Inform customers of downtime — estimated 2–4 more hours',
      'Switch to generator if available',
      'Wait 2 minutes after power returns before switching appliances back on',
    ],
    status: 'active',
  },
  {
    id: 2,
    zone: 'Kamwokya',
    type: 'Area Outage',
    cause: 'Road Construction — KCCA Works',
    detail: 'KCCA road works on Kamwokya main road have accidentally cut an underground cable. A repair team has been notified.',
    duration: '45m',
    started: '1:15 PM',
    color: '#F59E0B',
    reports: 6,
    affected: ['Kamwokya Stage', 'Kisementi Area', 'Kamwokya II'],
    checklist: [
      'This is likely a short outage — cable repairs usually take 2–3 hours',
      'Avoid resetting your meter box — wait for restoration',
      'Report any visible cable damage via the Report tab',
      'Keep fridges and freezers closed to maintain temperature',
    ],
    status: 'active',
  },
  {
    id: 3,
    zone: 'Bukoto',
    type: 'Risk Flag',
    cause: 'Storm Forecast',
    detail: 'Heavy rain and strong winds are forecast for Bukoto and surrounding areas in the next 3 hours. No outage confirmed yet but risk is elevated.',
    duration: '—',
    started: '2:00 PM',
    color: '#3B82F6',
    reports: 2,
    affected: ['Bukoto', 'Naguru', 'Kololo'],
    checklist: [
      'Unplug sensitive electronics before the storm arrives',
      'Charge all devices and power banks now',
      'Keep a torch accessible',
      'Stay away from metal poles and any fallen lines',
      'If power goes out, report immediately via the Report tab',
    ],
    status: 'risk',
  },
]

export default function OutageDetailScreen({ id, onBack }: { id: number; onBack: () => void }) {
  const outage = outages.find(o => o.id === id)
  const [restored, setRestored] = useState(false)

  if (!outage) return null

  return (
    <div style={{ padding: '16px' }}>

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        style={{
          background: '#1A1A1A',
          border: '1px solid #2A2A2A',
          borderRadius: '8px',
          padding: '8px 14px',
          color: '#9CA3AF',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
        ← Back to Map
      </button>

      {/* HEADER */}
      <div style={{
        background: '#1A1A1A',
        border: `1px solid ${outage.color}44`,
        borderLeft: `4px solid ${outage.color}`,
        borderRadius: '12px',
        padding: '18px',
        marginBottom: '14px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: '#fff', marginBottom: '4px' }}>
              {outage.zone}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: outage.color }}>{outage.type}</div>
          </div>
          <div style={{
            background: '#131313',
            border: `1px solid ${outage.color}44`,
            borderRadius: '8px',
            padding: '8px 14px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif' }}>{outage.duration}</div>
            <div style={{ fontSize: '10px', color: '#6B7280' }}>duration</div>
          </div>
        </div>
        <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '10px', lineHeight: 1.5 }}>
          {outage.detail}
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6B7280' }}>
          <span>🕐 Started {outage.started}</span>
          <span>👥 {outage.reports} reports</span>
        </div>
      </div>

      {/* AFFECTED AREAS */}
      <div style={{
        background: '#1A1A1A',
        border: '1px solid #2A2A2A',
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '14px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: outage.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
          📍 Affected Areas
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {outage.affected.map(area => (
            <div key={area} style={{
              background: '#131313',
              border: '1px solid #2A2A2A',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '12px',
              color: '#E5E7EB',
            }}>
              {area}
            </div>
          ))}
        </div>
      </div>

      {/* CHECKLIST */}
      <div style={{
        background: '#1A1A1A',
        border: '1px solid #2A2A2A',
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '14px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: outage.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
          📋 What To Do Now
        </div>
        {outage.checklist.map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: '10px',
            padding: '8px 0',
            borderBottom: i < outage.checklist.length - 1 ? '1px solid #2A2A2A' : 'none',
            alignItems: 'flex-start',
          }}>
            <span style={{ color: outage.color, fontWeight: 700, flexShrink: 0, fontSize: '13px', marginTop: '1px' }}>→</span>
            <span style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* POWER RESTORED */}
      {restored ? (
        <div style={{
          background: '#052E16',
          border: '1px solid #22C55E44',
          borderRadius: '10px',
          padding: '16px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px', marginBottom: '6px' }}>✅</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#22C55E' }}>Thank you for confirming!</div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Your confirmation helps update the map for everyone in {outage.zone}.</div>
        </div>
      ) : (
        <button
          onClick={() => setRestored(true)}
          style={{
            width: '100%',
            background: '#052E16',
            border: '1px solid #22C55E44',
            borderRadius: '10px',
            padding: '16px',
            color: '#22C55E',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
          }}>
          ✓ Power is back in my area
        </button>
      )}
    </div>
  )
}
