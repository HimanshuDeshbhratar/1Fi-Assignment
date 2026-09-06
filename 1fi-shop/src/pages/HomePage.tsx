import { Link } from 'react-router-dom'
import { PageHeader } from '../components/AppShell'
import './HomePage.css'

export function HomePage() {
  return (
    <div className="home">
      <PageHeader title="Home" subtitle="Mutual-fund backed shopping" />
      <section className="home-hero">
        <p className="pill">New · No-cost EMIs backed by mutual funds</p>
        <h2>
          Shop today, <em>Pay later</em> using <span>mutual funds.</span>
        </h2>
        <p className="home-hero__copy">
          No credit score required. No interest. Fully backed by your investments.
        </p>
        <div className="home-hero__actions">
          <Link to="/shop/marketplace" className="btn btn-primary">
            Start Shopping
          </Link>
          <Link to="/limit" className="btn btn-secondary">
            Check Eligibility
          </Link>
        </div>
      </section>

      <section className="section">
        <h3 className="section-title">Quick actions</h3>
        <div className="home-actions">
          <Link to="/shop/marketplace" className="home-action">
            <strong>1Fi Marketplace</strong>
            <span>Browse devices on no-cost EMI</span>
          </Link>
          <Link to="/shop/top-brands" className="home-action">
            <strong>Top Brands</strong>
            <span>Coming soon</span>
          </Link>
          <Link to="/shop/nearby" className="home-action">
            <strong>Nearby Stores</strong>
            <span>Coming soon</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export function PlaceholderPage({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <PageHeader title={title} />
      <div className="blank-panel">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  )
}
