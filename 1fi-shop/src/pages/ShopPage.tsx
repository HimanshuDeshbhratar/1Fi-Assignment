import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { PageHeader } from '../components/AppShell'
import './ShopPage.css'

const tabs = [
  { to: '/shop/top-brands', label: 'Top Brands' },
  { to: '/shop/nearby', label: 'Nearby Stores' },
  { to: '/shop/marketplace', label: '1Fi Marketplace' },
]

export function ShopPage() {
  const location = useLocation()
  const hideShopChrome =
    /\/shop\/marketplace\/.+/.test(location.pathname) ||
    location.pathname.includes('/checkout-success')

  if (hideShopChrome) {
    return <Outlet />
  }

  return (
    <div className="shop-page">
      <PageHeader title="Shop" subtitle="Buy now, pay with mutual-fund backed EMIs" />

      <div className="shop-hero">
        <p className="shop-hero__eyebrow">No credit score · 0% interest</p>
        <h2>Shop today, pay later using mutual funds.</h2>
      </div>

      <div className="shop-tabs" role="tablist" aria-label="Shop sections">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            role="tab"
            className={({ isActive }) => `shop-tab${isActive ? ' is-active' : ''}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  )
}

export function TopBrandsPage() {
  return (
    <div className="blank-panel">
      <h2>Top Brands</h2>
      <p>No implementation required for this assignment. This section is intentionally blank.</p>
    </div>
  )
}

export function NearbyStoresPage() {
  return (
    <div className="blank-panel">
      <h2>Nearby Stores</h2>
      <p>No implementation required for this assignment. This section is intentionally blank.</p>
    </div>
  )
}
