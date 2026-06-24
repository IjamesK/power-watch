import { useState } from 'react'

const incoming = [
  {
    id: 1,
    zone: 'Ntinda',
    issue: 'No Power',
    description: 'Complete blackout since 11am. Whole street affected including the market.',
    photo: true,
    time: '11:42 AM',
    questions: { previous: 'Yes', construction: 'No', explosion: 'No' },
    status: 'pending',
  },
  {
    id: 2,
    zone: 'Kamwokya',
    issue: 'Knocked Pole',
    description: 'Electricity pole knocked down near the Shell petrol station junction.',
    photo: true,
    time: '1:15 PM',
    questions: { previous: 'No', construction: 'Yes', explosion: 'No' },
    status: 'pending',
  },
  {
    id: 3,
    zone: 'Bukoto',
    issue: 'Flickering',
    description: 'Lights flickering badly for the past hour. Afraid appliances will get damaged.',
    photo: false,
    time: '2:04 PM',
    questions: { previous: 'Yes', construction: 'No', explosion: 'No' },
    status: 'pending',
  },
  {
    id: 4,
    zone: 'Nakawa',
    issue: 'Faulty Meter',
    description: 'Meter box sparking and making noise. Very dangerous.',
    photo: true,
    time: '2:31 PM',
    questions: { previous: 'No', construction: 'No', explosion: 'Yes' },
    status: 'pending',
  },
]

const causes = [
  'Planned Maintenance',
  'Weather Event',
  'Road Construction',
  'Infrastructure Fault',
  'Transformer Overload',
  'Vandalism / Theft',
  'Unknown',
]

export default function ModeratorScreen() {
  const [reports, setReports] = useState(incoming)
  const [openId, setOpenId] = useState<number | null>(null)
  const [selectedCause, setSelectedCause] = useState<Record<number, string>>({})
  const [researchNote, setResearchNote] = useState<Record<number, string>>({})

  const updateStatus = (id: number, status: 'approved' | 'rejected') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    setOpenId(null)
  }

  const pending = reports.filter(r => r.status === 'pending')
  const approved = reports.filter(r => r.status === 'approved')
  const rejected = reports.filter(r => r.status === 'rejected')

  return (
    <div style={{ padding: '16px' }}>

      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1A1A2E 100%)',
        border: '1px solid #3B82F644',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px',
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '4px' }}>
          🛡️ Moderator Dashboard
        </div>
        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '14px' }}>
          Review, verify, and approve community reports before they go live.
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <StatPill label="Pending" value={pending.length} color="#F59E0B" />
          <StatPill label="Approved" value={approved.length} color="#22C55E" />
          <StatPill label="Rejected" value={rejected.length} color="#EF4444" />
        </div>
      </div>

      {/* PENDING REPORTS */}
      {pending.length > 0 && (
        <>
          <SectionLabel>⏳ Pending Review</SectionLabel>
          {pending.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              isOpen={openId === report.id}
              onToggle={() => setOpenId(openId === report.id ? null : report.id)}
              cause={selectedCause[report.id] || ''}
              onCause={(c: string) => setSelectedCause(prev => ({ ...prev, [report.id]: c }))}
              note={researchNote[report.id] || ''}
              onNote={(n: string) => setResearchNote(prev => ({ ...prev, [report.id]: n }))}
              onApprove={() => updateStatus(report.id, 'approved')}
              onReject={() => updateStatus(report.id, 'rejected')}
            />
          ))}
        </>
      )}

      {/* APPROVED */}
      {approved.length > 0 && (
        <>
          <SectionLabel>✅ Approved & Live</SectionLabel>
          {approved.map(report => (
            <div key={report.id} style={{
              background: '#052E16',
              border: '1px solid #22C55E44',
              borderLeft: '3px solid #22C55E',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{report.zone} — {report.issue}</div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{report.time} · {selectedCause[report.id] || 'Cause tagged'}</div>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#22C55E' }}>LIVE ✓</div>
            </div>
          ))}
        </>
      )}

      {/* REJECTED */}
      {rejected.length > 0 && (
        <>
          <SectionLabel>❌ Rejected</SectionLabel>
          {rejected.map(report => (
            <div key={report.id} style={{
              background: '#1A0505',
              border: '1px solid #EF444444',
              borderLeft: '3px solid #EF4444',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{report.zone} — {report.issue}</div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{report.time}</div>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#EF4444' }}>REJECTED</div>
            </div>
          ))}
        </>
      )}

      {pending.length === 0 && approved.length === 0 && rejected.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6B7280', fontSize: '14px' }}>
          No reports in queue right now.
        </div>
      )}
    </div>
  )
}

function ReportCard({ report, isOpen, onToggle, cause, onCause, note, onNote, onApprove, onReject }: any) {
  const urgentColors: Record<string, string> = {
    'No Power': '#EF4444',
    'Knocked Pole': '#F59E0B',
    'Faulty Meter': '#EF4444',
    'Flickering': '#F59E0B',
  }
  const color = urgentColors[report.issue] || '#6B7280'

  return (
    <div style={{ marginBottom: '10px' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: isOpen ? '#1A1A1A' : '#131313',
          border: `1px solid ${isOpen ? color + '55' : '#2A2A2A'}`,
          borderLeft: `3px solid ${color}`,
          borderRadius: isOpen ? '10px 10px 0 0' : '10px',
          padding: '14px 16px',
          textAlign: 'left',
          cursor: 'pointer',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
              {report.zone} — {report.issue}
            </div>
            <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>{report.time}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{report.description}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginLeft: '10px', flexShrink: 0 }}>
            {report.photo && (
              <span style={{ fontSize: '10px', background: '#1C3A5E', color: '#3B82F6', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                📸 Photo
              </span>
            )}
            {report.questions.explosion === 'Yes' && (
              <span style={{ fontSize: '10px', background: '#3F1515', color: '#EF4444', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                ⚠️ Urgent
              </span>
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div style={{
          background: '#1A1A1A',
          border: `1px solid ${color}33`,
          borderTop: '1px solid #2A2A2A',
          borderRadius: '0 0 10px 10px',
          padding: '16px',
        }}>

          {/* QUESTIONNAIRE ANSWERS */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#F59E0B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              📋 Reporter Answers
            </div>
            {[
              { q: 'Previous outages this week?', a: report.questions.previous },
              { q: 'Road works nearby?', a: report.questions.construction },
              { q: 'Explosion or sparks seen?', a: report.questions.explosion },
            ].map(item => (
              <div key={item.q} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #2A2A2A', fontSize: '12px' }}>
                <span style={{ color: '#9CA3AF' }}>{item.q}</span>
                <span style={{ color: item.a === 'Yes' ? '#F59E0B' : '#6B7280', fontWeight: 600 }}>{item.a}</span>
              </div>
            ))}
          </div>

          {/* CAUSE TAGGING */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#F59E0B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              🏷️ Tag Cause
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {causes.map(c => (
                <button
                  key={c}
                  onClick={() => onCause(c)}
                  style={{
                    background: cause === c ? '#1C0A00' : '#131313',
                    border: `1px solid ${cause === c ? '#F59E0B' : '#2A2A2A'}`,
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: cause === c ? '#F59E0B' : '#6B7280',
                    cursor: 'pointer',
                  }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* RESEARCH NOTE */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#F59E0B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              🔍 Research Note
            </div>
            <textarea
              value={note}
              onChange={e => onNote(e.target.value)}
              placeholder="Note where you checked e.g. Checked UEDCL Twitter — no announcement found. KCCA notices show road works on Ntinda road this week..."
              rows={3}
              style={{
                width: '100%',
                background: '#131313',
                border: '1px solid #2A2A2A',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#E5E7EB',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                resize: 'none',
                outline: 'none',
              }}
            />
          </div>

          {/* APPROVE / REJECT */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onApprove}
              style={{
                flex: 1,
                background: '#052E16',
                border: '1px solid #22C55E44',
                borderRadius: '8px',
                padding: '12px',
                color: '#22C55E',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
              }}>
              ✓ Approve & Go Live
            </button>
            <button
              onClick={onReject}
              style={{
                flex: 1,
                background: '#1A0505',
                border: '1px solid #EF444444',
                borderRadius: '8px',
                padding: '12px',
                color: '#EF4444',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
              }}>
              ✗ Reject
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function StatPill({ label, value, color }: any) {
  return (
    <div style={{
      background: '#131313',
      border: `1px solid ${color}44`,
      borderRadius: '8px',
      padding: '8px 14px',
      textAlign: 'center',
      flex: 1,
    }}>
      <div style={{ fontSize: '20px', fontWeight: 800, color, fontFamily: 'Syne, sans-serif' }}>{value}</div>
      <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>{label}</div>
    </div>
  )
}

function SectionLabel({ children }: any) {
  return (
    <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px', marginTop: '4px' }}>
      {children}
    </div>
  )
}