import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/AppShell'
import { EmiPlanList } from '../components/EmiPlanList'
import { ErrorState, LoadingState } from '../components/States'
import { useProduct } from '../hooks/useProducts'
import type { EmiPlan, ProductVariant } from '../types/product'
import { buildEmiPlans } from '../utils/emi'
import { formatINR } from '../utils/format'
import './ProductDetailPage.css'

export function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { status, data: product, error, reload } = useProduct(productId)

  if (status === 'loading') {
    return (
      <div>
        <PageHeader title="Product" backTo="/shop/marketplace" />
        <LoadingState label="Loading product details…" />
      </div>
    )
  }

  if (status === 'error' || !product) {
    return (
      <div>
        <PageHeader title="Product" backTo="/shop/marketplace" />
        <ErrorState message={error ?? 'Product unavailable'} onRetry={reload} />
      </div>
    )
  }

  return <ProductDetailContent product={product} onDone={() => navigate('/shop/checkout-success')} />
}

function ProductDetailContent({
  product,
  onDone,
}: {
  product: NonNullable<ReturnType<typeof useProduct>['data']>
  onDone: () => void
}) {
  const [imageIndex, setImageIndex] = useState(0)
  const [storage, setStorage] = useState(product.storageOptions[0] ?? 'Standard')
  const [color, setColor] = useState(product.colorOptions[0] ?? 'Default')
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const activeVariant: ProductVariant = useMemo(() => {
    const match = product.variants.find((v) => {
      const storageOk = !v.storage || v.storage === storage || storage === 'Standard'
      const colorOk = !v.color || v.color === color || color === 'Default'
      return storageOk && colorOk
    })
    return match ?? product.variants[0]
  }, [product.variants, storage, color])

  const plans = useMemo(() => buildEmiPlans(activeVariant.price), [activeVariant.price])

  const effectivePlan = selectedPlan && plans.some((p) => p.id === selectedPlan.id)
    ? plans.find((p) => p.id === selectedPlan.id)!
    : selectedPlan

  const handleProceed = async () => {
    if (!effectivePlan) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    sessionStorage.setItem(
      '1fi-checkout',
      JSON.stringify({
        productName: product.name,
        variant: activeVariant.label,
        plan: effectivePlan,
        price: activeVariant.price,
      }),
    )
    setSubmitting(false)
    onDone()
  }

  return (
    <div className="pdp">
      <PageHeader title={product.name} backTo="/shop/marketplace" />

      <div className="pdp__gallery">
        <img
          src={product.images[imageIndex] ?? product.images[0]}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = 'https://1fi.in/og-image.jpg'
          }}
        />
        {product.images.length > 1 ? (
          <div className="pdp__thumbs">
            {product.images.map((src, idx) => (
              <button
                key={src + idx}
                type="button"
                className={`pdp__thumb${idx === imageIndex ? ' is-active' : ''}`}
                onClick={() => setImageIndex(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="section pdp__summary">
        <p className="pdp__brand">{product.brand}</p>
        <h2>{product.name}</h2>
        <p className="pdp__tagline">{product.tagline}</p>
        <div className="pdp__price">
          <strong>{formatINR(activeVariant.price)}</strong>
          <span>Inclusive of taxes · Zero downpayment</span>
        </div>
        <p className="pdp__desc">{product.description}</p>
      </div>

      {product.storageOptions.length > 0 && product.storageOptions[0] !== 'Standard' ? (
        <div className="section">
          <h3 className="section-title">Storage</h3>
          <div className="chip-row">
            {product.storageOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`chip${storage === option ? ' is-active' : ''}`}
                onClick={() => setStorage(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {product.colorOptions.length > 0 && product.colorOptions[0] !== 'Default' ? (
        <div className="section">
          <h3 className="section-title">Colour</h3>
          <div className="chip-row">
            {product.colorOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`chip${color === option ? ' is-active' : ''}`}
                onClick={() => setColor(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="section">
        <h3 className="section-title">Why 1Fi</h3>
        <ul className="pdp__highlights">
          {product.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3 className="section-title">Choose EMI plan</h3>
        <p className="pdp__emi-note">Mutual-fund backed · No-cost EMIs · Select a tenure to continue</p>
        <EmiPlanList
          plans={plans}
          selectedId={effectivePlan?.id ?? null}
          onSelect={setSelectedPlan}
        />
      </div>

      <div className="pdp__cta-bar">
        <div className="pdp__cta-meta">
          {effectivePlan ? (
            <>
              <strong>{formatINR(effectivePlan.monthlyAmount)}/mo</strong>
              <span>{effectivePlan.months} months · 0% interest</span>
            </>
          ) : (
            <>
              <strong>Select a plan</strong>
              <span>EMI options from 3 to 24 months</span>
            </>
          )}
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          disabled={!effectivePlan || submitting}
          onClick={handleProceed}
        >
          {submitting ? 'Processing…' : 'Proceed with plan'}
        </button>
        <Link to="/shop/marketplace" className="pdp__back-link">
          Back to marketplace
        </Link>
      </div>
    </div>
  )
}
