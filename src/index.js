import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import store from './store'
import App from './App'

// console.log(store)

ReactDOM.render(
    <Provider {...store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
