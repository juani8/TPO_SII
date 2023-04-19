import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter permite el ruteo desde el lado del cliente.
    Sin esto, ni Navigate, ni Link, ni redirect funcionarían, así
    como la mayoría de los metodos de react-router-dom*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
