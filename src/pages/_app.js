import AuthState from '@/context/auth/authState'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
          <AuthState>
            <Component { ...pageProps } />
          </AuthState>
        )
  }
