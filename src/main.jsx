import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { legacy_createStore, compose, applyMiddleware } from "redux"
import { thunk } from 'redux-thunk'
import { rootReducer } from './redux/rootReducer.js'
import { Provider } from 'react-redux'


const store = legacy_createStore(rootReducer, compose(
    applyMiddleware(
        thunk
    )
))


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
