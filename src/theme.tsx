import { createContext, useContext, useState } from 'react'

interface ThemeContextType {
  dark: boolean
  toggle: () => void
  c: {
    bg: string
    panel: string
    border: string
    text: string
    muted: string
    subtext: string
    topbar: string
  }
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true)

  const c = dark ? {
    bg: '#0D0D0D',
    panel: '#1A1A1A',
    border: '#2A2A2A',
    text: '#FFFFFF',
    muted: '#9CA3AF',
    subtext: '#6B7280',
    topbar: '#131313',
  } : {
    bg: '#F8FAFC',
    panel: '#FFFFFF',
    border: '#E5E7EB',
    text: '#111827',
    muted: '#374151',
    subtext: '#6B7280',
    topbar: '#FFFFFF',
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(!dark), c }}>
      <div style={{ background: c.bg, minHeight: '100vh', color: c.text }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
