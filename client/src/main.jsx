import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import {Route, Routes} from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import axios from 'axios';

// conecta con el back-end
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

// esto esta por defecto en las apps de react
// renderiza la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter permite el ruteo desde el lado del cliente.
    Sin esto, ni Navigate, ni Link, ni redirect funcionarían, así
    como la mayoría de los metodos de react-router-dom*/}
    <BrowserRouter>
      <UserContextProvider>
        <Header />
        <Routes>
          {/* Funciona como un switch, segun la ruta en la que se está */}
          <Route index element = {<IndexPage />} />
          <Route path='/login' element = {<LoginPage />} />
          <Route path='/register' element = {<RegisterPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
