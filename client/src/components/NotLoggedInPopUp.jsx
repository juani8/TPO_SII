import { React } from 'react';
import { Link } from 'react-router-dom';

const NotLoggedInPopUp = (props) => {

  const itemCSS = (name) => {
    return `font-medium cursor-pointer ${props.actual === name ? 'text-blue-600' : 'text-black'}`;
  } 

  return (
    <div>
      <div className={`${props.toggle ? 'flex' : 'hidden'} popup__menu`}>
        <ul className="list-none flex flex-1 flex-col justify-center items-start">
          <li onClick={() => {props.setActual('Main page'); props.setToggle(false)}} className = {itemCSS('Main page')}>
            <Link to={'/'} className='popup__item'>
              Main page
            </Link>
          </li>            
          <li onClick={() => {props.setActual('Login'); props.setToggle(false)}} className = {itemCSS('Login')}>
            <Link to={'/login'} className='popup__item'>
              Login
            </Link>
          </li>
          <li onClick={() => {props.setActual('Register'); props.setToggle(false)}} className = {itemCSS('Register')}>
            <Link to={'/register'} className='popup__item'>
              Register
            </Link>
          </li>
        </ul>
      </div>       
    </div>
  )
};

export default NotLoggedInPopUp;