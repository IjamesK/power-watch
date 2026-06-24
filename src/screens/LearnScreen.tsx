import { useState } from 'react'

const tips = [
  {
    id: 1,
    icon: '🏪',
    title: 'Running a Shop or Salon?',
    category: 'Business',
    color: '#F59E0B',
    summary: 'How to protect your equipment and customers during an outage.',
    content: [
      'Switch off all heavy appliances immediately when power goes — fridges, dryers, straighteners.',
      'Keep a printed price list ready so you can still serve customers manually.',
      'Invest in a UPS (Uninterruptible Power Supply) for your till or computer.',
      'Inform customers of expected downtime — they appreciate honesty over silence.',
      'After power returns, wait 2 minutes before switching appliances back on to avoid surge damage.',
    ],
  },
  {
    id: 2,
    icon: '🧊',
    title: 'Protecting Fridges & Cold Storage',
    category: 'Equipment',
    color: '#3B82F6',
    summary: 'Keep your stock safe during outages lasting hours.',
    content: [
      'A full fridge stays cold for up to 4 hours if the door stays closed.',
      'A full freezer stays frozen for 24–48 hours if sealed.',
      'Do not open the fridge unnecessarily during an outage.',
      'Group items together inside — food keeps cold better in clusters.',
      'When power returns, check temperatures before serving anything that thawed.',
    ],
  },
  {
    id: 3,
    icon: '⚡',
    title: 'What Causes Power Outages?',
    category: 'Education',
    color: '#22C55E',
    summary: 'Understand the common causes so you can predict and prepare.',
    content: [
      'Planned maintenance — UEDCL scheduled works for upgrades or repairs.',
      'Transformer overload — too many people using power at once in one area.',
      'Road construction — cables cut accidentally during KCCA or UNRA works.',
      'Weather — heavy rain, lightning, and storms damage overhead lines.',
      'Faulty infrastructure — old poles, corroded meter boxes, and ageing cables.',
    ],
  },
  {
    id: 4,
    icon: '🌩️',
    title: 'Storm Safety During an Outage',
    category: 'Safety',
    color: '#EF4444',
    summary: 'What to do when bad weather and power failure happen together.',
    content: [
      'Never touch fallen power lines — even if you think they are dead.',
      'Stay away from metal poles and fences during lightning.',
      'Unplug expensive appliances before a storm, not after the power goes.',
      'Report any sparking or smoking infrastructure immediately via the Report tab.',
      'Keep a torch and power bank charged at all times during rainy season.',
    ],
  },
  {
    id: 5,
    icon: '🔌',
    title: 'Reducing Overload in Your Area',
    category: 'Community',
    color: '#8B5CF6',
    summary: 'Small habits that protect shared infrastructure for everyone.',
    content: [
      'Avoid switching on all heavy appliances at the same time — stagger usage.',
      'Peak demand hours are 6pm–9pm. Reduce load during this window.',
      'Report illegal connections to UEDCL — they strain the whole network.',
      'Energy-saving bulbs reduce your draw on the local transformer.',
      'Share this knowledge with neighbours — community habits protect everyone.',
    ],
  },
  {
    id: 6,
    icon: '🏗️',
    title: 'Road Works & Power Outages',
    category: 'Awareness',
    color: '#F97316',
    summary: 'Why construction causes outages and how to stay ahead of it.',
    content: [
      'KCCA and UNRA road works frequently cut underground and overhead cables.',
      'Check the PowerWatch map for active construction zone flags in your area.',
      'If road works are happening near you, expect a higher outage risk.',
      'You can report construction-related outages using the Report tab with "Other Hazard".',
      'UEDCL uses our reports to coordinate better with construction teams.',
    ],
  },
]

export default function LearnScreen() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', marginBottom: '4px' }}>
          Learn & Prepare
        </div>
        <div style={{ fontSize: '13px', color: '#6B7280' }}>
          Practical guides to help you stay ahead of outages.
        </div>
      </div>

      {/* FEATURED TIP */}
      <div style={{
        background: 'linear-gradient(135deg, #1C0A00 0%, #1A1A1A 100%)',
        border: '1px solid #B45309',
        borderRadius: '12px',
        padding: '18px',
        marginBottom: '20px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#F59E0B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
          ⚡ Tip of the Day
        </div>
        <div style={{ fontSize: '14px', color: '#E5E7EB', fontWeight: 500, lineHeight: 1.5 }}>
          When power returns after a long outage, wait <strong style={{ color: '#F59E0B' }}>2 minutes</strong> before switching appliances back on. Sudden voltage surges after restoration are a leading cause of equipment damage.
        </div>
      </div>

      {/* CATEGORY FILTER LABEL */}
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
        All Guides
      </div>

      {/* GUIDE CARDS */}
      {tips.map(tip => (
        <div key={tip.id} style={{ marginBottom: '10px' }}>
          <button
            onClick={() => setOpenId(openId === tip.id ? null : tip.id)}
            style={{
              width: '100%',
              background: openId === tip.id ? '#1A1A1A' : '#131313',
              border: `1px solid ${openId === tip.id ? tip.color + '66' : '#2A2A2A'}`,
              borderLeft: `3px solid ${tip.color}`,
              borderRadius: '10px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
            <span style={{ fontSize: '24px', flexShrink: 0 }}>{tip.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{tip.title}</div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>{tip.summary}</div>
            </div>
            <div style={{
              fontSize: '11px', fontWeight: 600,
              color: tip.color,
              background: tip.color + '22',
              padding: '3px 8px', borderRadius: '4px',
              flexShrink: 0,
            }}>
              {tip.category}
            </div>
          </button>

          {/* EXPANDED CONTENT */}
          {openId === tip.id && (
            <div style={{
              background: '#1A1A1A',
              border: `1px solid ${tip.color}44`,
              borderTop: 'none',
              borderRadius: '0 0 10px 10px',
              padding: '16px',
            }}>
              {tip.content.map((point, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '10px',
                  padding: '8px 0',
                  borderBottom: i < tip.content.length - 1 ? '1px solid #2A2A2A' : 'none',
                }}>
                  <span style={{ color: tip.color, fontWeight: 700, flexShrink: 0, fontSize: '13px' }}>
                    {i + 1}.
                  </span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.5 }}>{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}