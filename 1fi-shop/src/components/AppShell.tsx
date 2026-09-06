import { NavLink, Outlet, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import './AppShell.css'

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/shop', label: 'Shop', icon: ShopIcon },
  { to: '/limit', label: 'Limit', icon: LimitIcon },
  { to: '/profile', label: 'Profile', icon: ProfileIcon },
]

export function AppShell() {
  const location = useLocation()
  const hideNav =
    location.pathname.startsWith('/shop/marketplace/') &&
    location.pathname !== '/shop/marketplace'

  return (
    <div className="app-shell">
      <div className="app-frame">
        <div className="app-main">
          <Outlet />
        </div>
        {!hideNav && (
          <nav className="bottom-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `bottom-nav__item${isActive ? ' is-active' : ''}`}
              >
                <item.icon />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8h16l-1.2 11.2A2 2 0 0 1 16.81 21H7.19a2 2 0 0 1-1.99-1.8L4 8Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function LimitIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 19.5c1.8-3.2 4.2-4.5 7-4.5s5.2 1.3 7 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function PageHeader({
  title,
  subtitle,
  backTo,
  action,
}: {
  title: string
  subtitle?: string
  backTo?: string
  action?: ReactNode
}) {
  return (
    <header className="page-header">
      <div className="page-header__row">
        {backTo ? (
          <NavLink to={backTo} className="page-header__back" aria-label="Go back">
            ←
          </NavLink>
        ) : (
          <div className="brand-mark" aria-hidden>
            1Fi
          </div>
        )}
        <div className="page-header__titles">
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <div className="page-header__action">{action}</div>
      </div>
    </header>
  )
}
