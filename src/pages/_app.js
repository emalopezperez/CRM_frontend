import AuthState from '@/context/auth/authState'
import ProductState from '@/context/products/productState'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthState>
      <ProductState>
        <Component { ...pageProps } />
      </ProductState>
    </AuthState>
  )
}
