import { useState } from 'react'

const alerts = [
  {
    id: 1,
    type: 'General Outage',
    zone: 'Ntinda',
    time: 'Today · 11:42 AM',
    duration: '2h 14m',
    cause: 'Infrastructure Fault — Transformer failure reported',
    color: '#EF4444',
    icon: '🔴',
    status: 'active',
    checklist: [
      'Save any open work on your devices',
      'Switch off heavy appliances to avoid surge damage',
      'Check your generator or inverter is ready',
      'Inform customers of potential downtime',
      'Expected restoration: Under investigation',
    ],
  },
  {
    id: 2,
    type: 'Area Outage',
    zone: 'Kamwokya',
    time: 'Today · 1:15 PM',
    duration: '45m',
    cause: 'Road Construction — KCCA works on Kamwokya road cutting cables',
    color: '#F59E0B',
    icon: '🟠',
    status: 'active',
    checklist: [
      'This is likely a short outage caused by construction work',
      'Avoid resetting your meter box — wait for restoration',
      'Report any visible cable damage via the Report tab',
      'Expected restoration: 2–3 hours',
    ],
  },
  {
    id: 3,
    type: 'Risk Flag',
    zone: 'Bukoto',
    time: 'Today · 2:00 PM',
    duration: '—',
    cause: 'Heavy rain and storm forecast for the next 3 hours',
    color: '#3B82F6',
    icon: '🔵',
    status: 'risk',
    checklist: [
      'Unplug sensitive electronics before the storm arrives',
      'Charge your devices and power banks now',
      'Keep a torch accessible',
      'Stay away from metal poles and fallen lines',
    ],
  },
  {
    id: 4,
    type: 'Planned Maintenance',
    zone: 'Nakawa',
    time: 'Tomorrow · 9:00 AM',
    duration: 'Est. 4hrs',
    cause: 'Scheduled UEDCL maintenance — transformer upgrade',
    color: '#8B5CF6',
    icon: '🟣',
    status: 'planned',
    checklist: [
      'Plan heavy electricity use for before 9am or after 1pm',
      'Charge all devices tonight',
      'Inform your team or staff in advance',
      'This outage will restore automatically — no action needed after',
    ],
  },
  {
    id: 5,
    type: 'Restored',
    zone: 'Makindye',
    time: 'Today · 10:30 AM',
    duration: 'Was 1h 20m',
    cause: 'Faulty meter box — resolved by UEDCL field team',
    color: '#22C55E',
    icon: '🟢',
    status: 'resolved',
    checklist: [],
  },
]

export default function AlertsScreen() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [restored, setRestored] = useState<number[]>([5])

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', marginBottom: '4px' }}>
          Alerts & Notifications
        </div>
        <div style={{ fontSize: '13px', color: '#6B7280' }}>
          Tap any alert to see details and your preparedness checklist.
        </div>
      </div>

      {/* NOTIFICATION PREFERENCE */}
      <div style={{
        background: '#131313',
        border: '1px solid #2A2A2A',
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>🔔 Zone Notifications</div>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>You are receiving alerts for Ntinda</div>
        </div>
        <div style={{
          background: '#052E16',
          border: '1px solid #22C55E44',
          color: '#22C55E',
          fontSize: '11px',
          fontWeight: 600,
          padding: '5px 12px',
          borderRadius: '6px',
        }}>
          Active
        </div>
      </div>

      {/* ALERT LIST */}
      {alerts.map(alert => (
        <div key={alert.id} style={{ marginBottom: '10px' }}>

          {/* ALERT ROW */}
          <button
            onClick={() => setOpenId(openId === alert.id ? null : alert.id)}
            style={{
              width: '100%',
              background: openId === alert.id ? '#1A1A1A' : '#131313',
              border: `1px solid ${openId === alert.id ? alert.color + '55' : '#2A2A2A'}`,
              borderLeft: `3px solid ${alert.color}`,
              borderRadius: openId === alert.id ? '10px 10px 0 0' : '10px',
              padding: '14px 16px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1 }}>
                <span style={{ fontSize: '16px', marginTop: '1px' }}>{alert.icon}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                    {alert.zone} — {alert.type}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>{alert.time}</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{alert.cause}</div>
                </div>
              </div>
              <div style={{ flexShrink: 0, marginLeft: '10px', textAlign: 'right' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: alert.color }}>{alert.duration}</div>
                <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>
                  {openId === alert.id ? '▲ less' : '▼ more'}
                </div>
              </div>
            </div>
          </button>

          {/* EXPANDED DETAIL */}
          {openId === alert.id && (
            <div style={{
              background: '#1A1A1A',
              border: `1px solid ${alert.color}44`,
              borderTop: '1px solid #2A2A2A',
              borderRadius: '0 0 10px 10px',
              padding: '16px',
            }}>

              {/* CHECKLIST */}
              {alert.checklist.length > 0 && (
                <>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: alert.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    📋 What To Do Now
                  </div>
                  {alert.checklist.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '8px',
                      padding: '7px 0',
                      borderBottom: i < alert.checklist.length - 1 ? '1px solid #2A2A2A' : 'none',
                      alignItems: 'flex-start',
                    }}>
                      <span style={{ color: alert.color, fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>→</span>
                      <span style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </>
              )}

              {/* RESTORED STATE */}
              {alert.status === 'resolved' || restored.includes(alert.id) ? (
                <div style={{
                  background: '#052E16',
                  border: '1px solid #22C55E44',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                  marginTop: alert.checklist.length > 0 ? '12px' : '0',
                }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>✅</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#22C55E' }}>Power Restored</div>
                  <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>Confirmed by community</div>
                </div>
              ) : (
                <button
                  onClick={() => setRestored([...restored, alert.id])}
                  style={{
                    width: '100%',
                    marginTop: alert.checklist.length > 0 ? '14px' : '0',
                    background: '#052E16',
                    border: '1px solid #22C55E44',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#22C55E',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}>
                  ✓ Power is back in my area
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}