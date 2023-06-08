import { React, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from '../UserContext';


const LoginPage = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();
	useContext(UserContext);

	async function handleLogin(event) {
		event.preventDefault();
		
		try {
			const response = await axios.post('/login',

			{email, 
			password},

			{withCredentials: true});
			
			setUser(response.data);

			if (response.status == 200) {
				alert('Login successful.');
				navigate('/');
        		navigate(0);
			}
		} catch (err) {
			alert('Login failed. ' + err);
		}
	}


  return (
		<div className='mt-4 grow flex flex-col justify-around'>
      <div className='mb-64'>
				<h1 className='text-4xl text-center py-4 mt-10'>Login</h1>
				<form className='max-w-xl mx-auto flex flex-col justify-around'
				onSubmit={handleLogin}>
					<label htmlFor='i_email' className='p-4 border rounded-lg font-medium flex flex-col'> 
					Email:
						<input type='email' placeholder='Enter your email...'  id='i_email' autocomplete="off"
							className='font-normal focus:outline-none'
							value={email} 
							onChange={(event) => setEmail(event.target.value)}/>
					</label>
					<div className='py-2'></div>
					<label htmlFor='i_psw' className='p-4 border rounded-lg font-medium flex flex-col'> 
					Password:
						<input type='password' placeholder='Enter your password...' id='i_psw' 
							className='font-normal focus:outline-none'
							value={password} 
							onChange={(event) => setPassword(event.target.value)}/>
					</label>
					<div className='py-2'></div>
					<button className='p-3 text-white border font-normal rounded-lg bg_default'>Login</button>
					<div className='py-2'></div>
					<div className='text-center py-2 text-gray-500'>
						Not registered yet? 
						<Link className='underline text-black ml-1' to={'/register'}>
							Register now
						</Link>
					</div>
				</form>
			</div>
		</div>
  )
}

export default LoginPage;