import { useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { EmptyState, ErrorState, LoadingState } from '../components/States'
import { useProducts } from '../hooks/useProducts'
import './MarketplacePage.css'

const BRANDS = ['All', 'Apple', 'Google', 'Samsung', 'OnePlus'] as const

export function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState<string>('All')
  const params = useMemo(() => ({ query, brand }), [query, brand])
  const { status, data, error, reload } = useProducts(params)

  return (
    <div className="marketplace">
      <div className="marketplace__toolbar section">
        <label className="search-field">
          <span className="visually-hidden">Search products</span>
          <input
            type="search"
            placeholder="Search phones, laptops…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <div className="chip-row" aria-label="Filter by brand">
          {BRANDS.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${brand === item ? ' is-active' : ''}`}
              onClick={() => setBrand(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {status === 'loading' ? <LoadingState label="Fetching marketplace products…" /> : null}
      {status === 'error' && error ? <ErrorState message={error} onRetry={reload} /> : null}

      {status === 'success' && data ? (
        data.length === 0 ? (
          <EmptyState
            title="No products found"
            body="Try another brand or search term. You can also request a product from 1Fi support."
          />
        ) : (
          <div className="section">
            <div className="marketplace__meta">
              <h2 className="section-title">1Fi Marketplace</h2>
              <span>{data.length} products</span>
            </div>
            <div className="product-grid">
              {data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )
      ) : null}
    </div>
  )
}
