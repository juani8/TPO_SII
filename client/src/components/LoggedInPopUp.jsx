import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoggedInPopUp = (props) => {

  const navigate = useNavigate();

  function logout() {
    axios.get('/logout');
    props.setUser(null);
    navigate('/');
    navigate(0);
  };

  return (
    <div>
      <div className={`${props.toggle ? 'flex' : 'hidden'} popup__menu`}>
        <ul className="list-none flex flex-1 flex-col justify-center items-start">
          <li className = 'popup__item' onClick={logout}>
            Log out
          </li>
        </ul>
      </div>
    </div>
  )
};

export default LoggedInPopUp;