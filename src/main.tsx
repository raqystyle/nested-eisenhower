import React from 'react'
import ReactDOM from 'react-dom'
import './main.css'
import App from './App'
import { AppShell } from './AppShell'
import { Provider } from './stateContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <AppShell>
        <Router>
          <Switch>
            <Route path="/" exact children={<App />} />
            <Route path="/:id" children={<App />} />
          </Switch>
        </Router>
      </AppShell>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
