import { Link } from 'react-router-dom'
import { PageHeader } from '../components/AppShell'
import { formatINR } from '../utils/format'
import './CheckoutSuccessPage.css'

type CheckoutPayload = {
  productName: string
  variant: string
  price: number
  plan: {
    months: number
    monthlyAmount: number
    interestRate: number
  }
}

function readCheckout(): CheckoutPayload | null {
  try {
    const raw = sessionStorage.getItem('1fi-checkout')
    return raw ? (JSON.parse(raw) as CheckoutPayload) : null
  } catch {
    return null
  }
}

export function CheckoutSuccessPage() {
  const checkout = readCheckout()

  return (
    <div className="success-page">
      <PageHeader title="Plan selected" backTo="/shop/marketplace" />
      <div className="success-card">
        <div className="success-card__icon">✓</div>
        <h2>You’re all set</h2>
        <p>
          Your EMI plan is ready. Next you’d check eligibility and pledge mutual funds in the live 1Fi
          app.
        </p>

        {checkout ? (
          <div className="success-summary">
            <div>
              <span>Product</span>
              <strong>{checkout.productName}</strong>
            </div>
            <div>
              <span>Variant</span>
              <strong>{checkout.variant}</strong>
            </div>
            <div>
              <span>Price</span>
              <strong>{formatINR(checkout.price)}</strong>
            </div>
            <div>
              <span>EMI</span>
              <strong>
                {formatINR(checkout.plan.monthlyAmount)} × {checkout.plan.months} mo ·{' '}
                {checkout.plan.interestRate}%
              </strong>
            </div>
          </div>
        ) : null}

        <Link to="/shop/marketplace" className="btn btn-primary btn-block">
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
