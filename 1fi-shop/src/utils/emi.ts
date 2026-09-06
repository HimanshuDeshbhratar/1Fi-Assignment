import type { EmiPlan } from '../types/product'

const TENURES = [3, 6, 9, 12, 18, 24] as const

/** 1Fi-style no-cost EMI plans derived from product price. */
export function buildEmiPlans(price: number): EmiPlan[] {
  return TENURES.map((months, index) => {
    const monthlyAmount = Math.ceil(price / months)
    return {
      id: `emi-${months}`,
      months,
      monthlyAmount,
      totalAmount: price,
      interestRate: 0,
      label: `${months} months`,
      badge: months === 12 ? 'Most popular' : months === 3 ? 'Shortest' : index === TENURES.length - 1 ? 'Lowest EMI' : undefined,
    }
  })
}
