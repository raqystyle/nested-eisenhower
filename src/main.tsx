import React from 'react'
import ReactDOM from 'react-dom'
import './main.css'
import App from './App'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact children={<App />} />
        <Route path="/:id" children={<App />} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
