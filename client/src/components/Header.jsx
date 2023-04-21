import { React, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import bars from '../assets/bars-solid.svg';
import user_logo from '../assets/circle-user-regular.svg';
import xmark from '../assets/xmark-solid.svg';
import shield from '../assets/shield-halved-solid.svg';

import LoggedInPopUp from './LoggedInPopUp';
import NotLoggedInPopUp from './NotLoggedInPopUp';
import '../index.css';
import { UserContext } from '../UserContext';

const Header = () => {
  {/* Se reciben parametros del useContext */}
  const { user, setUser, ready } = useContext(UserContext);
  {/*boton del menu minimizado del navbar*/}
  const [toggle, setToggle] = useState(false);
  {/*ventana seleccionada actualmente*/}
  const [actual, setActual] = useState('home');
  const navigate = useNavigate();

  
  return (
    <div>
      <header className='p-4 grid grid-cols-3 justify-between items-center h-150'>
        <Link to={'/'} onClick={() => setActual('home')} className='flex items-center gap-1'>
          <img src={shield} alt='' className='w-6 h-6 mx-2 inline align-middle' onClick={() => navigate('/')} />
          <span className='max-[1000px]:hidden font-bold text-xl align-middle'>Encryption</span>
        </Link>

				<div className='header__center'>
					{/*<p className='max-[800px]:hidden whitespace-nowrap'> TPO Seguridad e Integridad de la Información</p>*/}
          <p>{actual}</p>
          <p> {(ready) ? 'logged in' : 'not logged in'} </p>
				</div>

        <div className ={`${!!ready ? 'bg_default' : 'bg-inherit'} header__right`} onClick={() => setToggle(!toggle)}>
          <img src={toggle ? xmark : bars} alt='' className='w-5 h-5' />
          <img src={user_logo} alt='' className='min-w-[20px] h-[20px] right-0 on:border-none' />
          <p className={`${(!ready) && 'hidden'} text-ellipsis overflow-hidden`}>
            {`${(ready) && user.name}`}
          </p>
        </div>
      </header>
      
      {!!ready
          ? <LoggedInPopUp 
            toggle = {toggle}
            setToggle = {setToggle} 
            actual = {actual}
            setActual = {setActual}
            setUser = {setUser}/> 
          : <NotLoggedInPopUp 
            toggle = {toggle}
            setToggle = {setToggle} 
            actual = {actual}
            setActual = {setActual}/>     
      }
    </div>
  )
}

export default Header;