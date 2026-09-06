export type ProductVariant = {
  id: string
  label: string
  price: number
  storage: string | null
  color: string | null
}

export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  tagline: string
  description: string
  images: string[]
  startingPrice: number
  inStock: boolean
  emiAvailable: boolean
  highlights: string[]
  variants: ProductVariant[]
  storageOptions: string[]
  colorOptions: string[]
}

export type EmiPlan = {
  id: string
  months: number
  monthlyAmount: number
  totalAmount: number
  interestRate: number
  label: string
  badge?: string
}

export type ApiError = {
  message: string
}
