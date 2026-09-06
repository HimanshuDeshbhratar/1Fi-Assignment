import type { EmiPlan } from '../types/product'
import { formatINR } from '../utils/format'
import './EmiPlanList.css'

export function EmiPlanList({
  plans,
  selectedId,
  onSelect,
}: {
  plans: EmiPlan[]
  selectedId: string | null
  onSelect: (plan: EmiPlan) => void
}) {
  return (
    <div className="emi-list" role="listbox" aria-label="EMI plans">
      {plans.map((plan) => {
        const selected = plan.id === selectedId
        return (
          <button
            key={plan.id}
            type="button"
            role="option"
            aria-selected={selected}
            className={`emi-card${selected ? ' is-selected' : ''}`}
            onClick={() => onSelect(plan)}
          >
            <div className="emi-card__top">
              <strong>{plan.label}</strong>
              {plan.badge ? <span className="emi-card__badge">{plan.badge}</span> : null}
            </div>
            <div className="emi-card__amount">
              {formatINR(plan.monthlyAmount)}
              <span>/month</span>
            </div>
            <p className="emi-card__meta">
              {plan.interestRate}% interest · Total {formatINR(plan.totalAmount)}
            </p>
          </button>
        )
      })}
    </div>
  )
}
