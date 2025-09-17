import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/index'
import './stylesheets_scss/styles.scss'


const container = document.getElementById('root')

if (container) {
    const root = createRoot(container)
    root.render(
        <Provider store={store}>
            <App />
        </Provider> 
    )
} else {
    console.error('Root element not found')
}

