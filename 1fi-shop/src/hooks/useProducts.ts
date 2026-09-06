import { useEffect, useState } from 'react'
import { fetchProductById, fetchProducts, type ProductListParams } from '../api/products'
import type { Product } from '../types/product'

type AsyncState<T> =
  | { status: 'idle' | 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string }

export function useProducts(params: ProductListParams = {}) {
  const [state, setState] = useState<AsyncState<Product[]>>({
    status: 'loading',
    data: null,
    error: null,
  })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading', data: null, error: null })

    fetchProducts(params)
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data, error: null })
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ status: 'error', data: null, error: err.message })
      })

    return () => {
      cancelled = true
    }
    // serialize params for dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.query, params.brand, params.category, params.fail, reloadKey])

  return {
    ...state,
    reload: () => setReloadKey((k) => k + 1),
  }
}

export function useProduct(id: string | undefined) {
  const [state, setState] = useState<AsyncState<Product>>({
    status: 'loading',
    data: null,
    error: null,
  })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!id) {
      setState({ status: 'error', data: null, error: 'Missing product id' })
      return
    }

    let cancelled = false
    setState({ status: 'loading', data: null, error: null })

    fetchProductById(id)
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data, error: null })
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ status: 'error', data: null, error: err.message })
      })

    return () => {
      cancelled = true
    }
  }, [id, reloadKey])

  return {
    ...state,
    reload: () => setReloadKey((k) => k + 1),
  }
}
