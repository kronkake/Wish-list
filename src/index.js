import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { HashRouter } from 'react-router-dom'

import muiTheme from './muiTheme'
import { MuiThemeProvider } from 'material-ui/styles' 

ReactDOM.render(
    <HashRouter>
        <MuiThemeProvider theme={muiTheme}>
            <App />
        </MuiThemeProvider>
    </HashRouter>, 
    document.getElementById('root'))

registerServiceWorker()
