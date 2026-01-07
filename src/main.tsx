import { AppProviders } from './shared/providers/AppProviders'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'normalize.css'
import './shared/styles/styles.scss'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element not found')
}

createRoot(container).render(
  <AppProviders >
    <App />
  </AppProviders>
)