import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApiProvider } from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider
      url="https://jean-test-api.herokuapp.com/"
      token="8ce798cc-a4a9-4615-84ea-d845cb69453f" // set your api token here
    >
      <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
