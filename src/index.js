import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { HashRouter } from 'react-router-dom'

import muiTheme from './muiTheme'
import { MuiThemeProvider } from 'material-ui/styles'

import { Provider } from 'react-redux'
import { initFirestoreEventListeners } from './Data/Api/Eventlisteners'
import store from './Data/Store'

initFirestoreEventListeners()

ReactDOM.render(
    <HashRouter>
        <MuiThemeProvider theme={muiTheme}>
            <Provider store={store}>
                <App />
            </Provider>
        </MuiThemeProvider>
    </HashRouter>,
    document.getElementById('root')
)

registerServiceWorker()
