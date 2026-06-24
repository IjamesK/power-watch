import { useState } from 'react'

export default function ReportScreen() {
  const [submitted, setSubmitted] = useState(false)
  const [zone, setZone] = useState('')
  const [issueType, setIssueType] = useState('')
  const [description, setDescription] = useState('')
  const [photoAdded, setPhotoAdded] = useState(false)

  if (submitted) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', marginBottom: '8px' }}>
          Report Submitted
        </div>
        <div style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '8px' }}>
          Your report has been sent to our moderator for verification.
        </div>
        <div style={{
          background: '#1A1A1A', border: '1px solid #2A2A2A',
          borderRadius: '10px', padding: '14px', margin: '20px 0',
          fontSize: '13px', color: '#9CA3AF',
        }}>
          <div style={{ marginBottom: '6px' }}>📍 Zone: <strong style={{ color: '#fff' }}>{zone}</strong></div>
          <div style={{ marginBottom: '6px' }}>⚡ Issue: <strong style={{ color: '#fff' }}>{issueType}</strong></div>
          <div>🔖 Ref: <strong style={{ color: '#F59E0B' }}>PW-{Math.floor(Math.random() * 9000) + 1000}</strong></div>
        </div>
        <div style={{
          background: '#052E16', border: '1px solid #22C55E44',
          borderRadius: '8px', padding: '12px',
          fontSize: '12px', color: '#22C55E', marginBottom: '24px',
        }}>
          You will be notified when your report is verified and goes live on the map.
        </div>
        <button
          onClick={() => { setSubmitted(false); setZone(''); setIssueType(''); setDescription(''); setPhotoAdded(false) }}
          style={{
            background: '#1A1A1A', color: '#E5E7EB',
            border: '1px solid #2A2A2A', borderRadius: '8px',
            padding: '12px 24px', fontSize: '14px', fontWeight: 600,
          }}>
          Submit Another Report
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', marginBottom: '4px' }}>
          Report an Outage
        </div>
        <div style={{ fontSize: '13px', color: '#6B7280' }}>
          Your report goes to a moderator for verification before going live.
        </div>
      </div>

      {/* ZONE */}
      <Label>📍 Your Zone</Label>
      <select
        value={zone}
        onChange={e => setZone(e.target.value)}
        style={selectStyle}>
        <option value="">Select your area...</option>
        {['Ntinda', 'Kamwokya', 'Bukoto', 'Makindye', 'Nsambya', 'Kabalagala', 'Kololo', 'Nakawa', 'Kireka', 'Najjera'].map(z => (
          <option key={z} value={z}>{z}</option>
        ))}
      </select>

      {/* ISSUE TYPE */}
      <Label>⚡ Issue Type</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {[
          { id: 'No Power', icon: '🔌' },
          { id: 'Flickering', icon: '💡' },
          { id: 'Knocked Pole', icon: '🪵' },
          { id: 'Faulty Meter', icon: '📟' },
          { id: 'Transformer Issue', icon: '⚙️' },
          { id: 'Other Hazard', icon: '⚠️' },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setIssueType(opt.id)}
            style={{
              background: issueType === opt.id ? '#1C0A00' : '#1A1A1A',
              border: `1px solid ${issueType === opt.id ? '#F59E0B' : '#2A2A2A'}`,
              borderRadius: '8px', padding: '10px 8px',
              color: issueType === opt.id ? '#F59E0B' : '#9CA3AF',
              fontSize: '12px', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
            <span>{opt.icon}</span>{opt.id}
          </button>
        ))}
      </div>

      {/* DESCRIPTION */}
      <Label>📝 Description</Label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Describe what you see. E.g. pole knocked down near the junction, no power since 2pm..."
        rows={3}
        style={{
          ...selectStyle,
          resize: 'none',
          fontFamily: 'Inter, sans-serif',
        }}
      />

      {/* PHOTO UPLOAD */}
      <Label>📸 Photo Evidence</Label>
      <button
        onClick={() => setPhotoAdded(!photoAdded)}
        style={{
          width: '100%',
          background: photoAdded ? '#052E16' : '#1A1A1A',
          border: `2px dashed ${photoAdded ? '#22C55E' : '#2A2A2A'}`,
          borderRadius: '10px', padding: '20px',
          color: photoAdded ? '#22C55E' : '#6B7280',
          fontSize: '13px', fontWeight: 600,
          marginBottom: '16px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '6px',
        }}>
        <span style={{ fontSize: '24px' }}>{photoAdded ? '✅' : '📷'}</span>
        {photoAdded ? 'Photo attached — tap to remove' : 'Tap to attach a photo'}
      </button>

      {/* QUESTIONNAIRE */}
      <div style={{
        background: '#131313', border: '1px solid #2A2A2A',
        borderRadius: '10px', padding: '14px', marginBottom: '20px',
      }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#F59E0B', marginBottom: '10px' }}>
          📋 Quick Questions
        </div>
        {[
          'Has this area had outages before this week?',
          'Are there any road works nearby?',
          'Did you hear any explosion or see sparks?',
        ].map(q => (
          <div key={q} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #2A2A2A' }}>
            <span style={{ fontSize: '12px', color: '#9CA3AF', flex: 1, paddingRight: '10px' }}>{q}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button style={{ background: '#1A3A1A', color: '#22C55E', border: '1px solid #22C55E44', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', fontWeight: 600 }}>Yes</button>
              <button style={{ background: '#1A1A1A', color: '#6B7280', border: '1px solid #2A2A2A', borderRadius: '4px', padding: '3px 8px', fontSize: '11px' }}>No</button>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <button
        onClick={() => { if (zone && issueType) setSubmitted(true) }}
        style={{
          width: '100%',
          background: zone && issueType ? '#F59E0B' : '#1A1A1A',
          color: zone && issueType ? '#000' : '#4B5563',
          border: 'none', borderRadius: '10px',
          padding: '15px', fontSize: '15px', fontWeight: 700,
          transition: 'all 0.2s',
        }}>
        Submit Report →
      </button>
      {(!zone || !issueType) && (
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>
          Select a zone and issue type to continue
        </div>
      )}
    </div>
  )
}

function Label({ children }: any) {
  return (
    <div style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
      {children}
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  background: '#1A1A1A',
  border: '1px solid #2A2A2A',
  borderRadius: '8px',
  padding: '12px 14px',
  color: '#E5E7EB',
  fontSize: '14px',
  marginBottom: '16px',
  outline: 'none',
}