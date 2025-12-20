import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './shared/store'
import 'normalize.css'
import './shared/styles/styles.scss'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element not found')
}

createRoot(container).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)