export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="state-box" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{label}</p>
      <div className="skeleton-stack" aria-hidden>
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton short" />
      </div>
    </div>
  )
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <div className="state-box error" role="alert">
      <div className="state-icon">!</div>
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  )
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="state-box">
      <div className="state-icon muted">∅</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}
