import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage'
import { HomePage, PlaceholderPage } from './pages/HomePage'
import { MarketplacePage } from './pages/MarketplacePage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { NearbyStoresPage, ShopPage, TopBrandsPage } from './pages/ShopPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />}>
          <Route index element={<Navigate to="marketplace" replace />} />
          <Route path="top-brands" element={<TopBrandsPage />} />
          <Route path="nearby" element={<NearbyStoresPage />} />
          <Route path="marketplace" element={<MarketplacePage />} />
          <Route path="marketplace/:productId" element={<ProductDetailPage />} />
          <Route path="checkout-success" element={<CheckoutSuccessPage />} />
        </Route>
        <Route
          path="limit"
          element={
            <PlaceholderPage
              title="Limit"
              body="Eligibility and shopping limit live in the main 1Fi app. This assignment focuses on Marketplace."
            />
          }
        />
        <Route
          path="profile"
          element={
            <PlaceholderPage
              title="Profile"
              body="Profile is out of scope for this assignment."
            />
          }
        />
        <Route path="*" element={<Navigate to="/shop/marketplace" replace />} />
      </Route>
    </Routes>
  )
}
