import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { formatINR } from '../utils/format'
import './ProductCard.css'

export function ProductCard({ product }: { product: Product }) {
  const emiHint = Math.ceil(product.startingPrice / 12)

  return (
    <Link to={`/shop/marketplace/${product.id}`} className="product-card">
      <div className="product-card__media">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://1fi.in/og-image.jpg'
          }}
        />
        {product.emiAvailable ? <span className="product-card__badge">0% EMI</span> : null}
      </div>
      <div className="product-card__body">
        <p className="product-card__brand">{product.brand}</p>
        <h3>{product.name}</h3>
        <p className="product-card__tag">{product.tagline}</p>
        <div className="product-card__price-row">
          <strong>{formatINR(product.startingPrice)}</strong>
          <span>EMI from {formatINR(emiHint)}/mo</span>
        </div>
      </div>
    </Link>
  )
}
