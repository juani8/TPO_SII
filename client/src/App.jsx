import './index.css';
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

function App() {

  return (
    <div>
      <UserContextProvider>
        <Header />
        <Routes>
          {/* Funciona como un switch, segun la ruta en la que se está */}
          <Route index element = {<IndexPage />} />
          <Route path='/login' element = {<LoginPage />} />
          <Route path='/register' element = {<RegisterPage />} />
        </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App;
