import type { Product } from '../types/product'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let cache: Product[] | null = null

async function loadCatalog(): Promise<Product[]> {
  if (cache) return cache
  const response = await fetch('/mock/products.json')
  if (!response.ok) {
    throw new Error('Unable to load marketplace catalog')
  }
  cache = (await response.json()) as Product[]
  return cache
}

export type ProductListParams = {
  query?: string
  brand?: string
  category?: string
  /** Simulate failure for error-state demos */
  fail?: boolean
}

export async function fetchProducts(params: ProductListParams = {}): Promise<Product[]> {
  await delay(550)
  if (params.fail) {
    throw new Error('Marketplace is temporarily unavailable. Please try again.')
  }

  let products = await loadCatalog()

  if (params.brand && params.brand !== 'All') {
    products = products.filter((p) => p.brand === params.brand)
  }
  if (params.category && params.category !== 'All') {
    products = products.filter((p) => p.category === params.category)
  }
  if (params.query?.trim()) {
    const q = params.query.trim().toLowerCase()
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }

  return products
}

export async function fetchProductById(id: string): Promise<Product> {
  await delay(450)
  const products = await loadCatalog()
  const product = products.find((p) => p.id === id || p.slug === id)
  if (!product) {
    throw new Error('Product not found')
  }
  return product
}

export async function fetchBrands(): Promise<string[]> {
  const products = await loadCatalog()
  return ['All', ...Array.from(new Set(products.map((p) => p.brand)))]
}
