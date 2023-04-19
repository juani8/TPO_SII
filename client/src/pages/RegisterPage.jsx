import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegisterPage = () => {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	// on submit, we need to grab an event, 
	// prevent default so it doesnt reload the page
	async function handleRegisterUser(event) {
		event.preventDefault();
		
		try{
			await axios.post('/register', {
				name, 
				email,
				password,
			});
			alert('Registration successful.');
			navigate('/login');
			navigate(0);
		} catch (err) {
			alert('Registration failed. ' + err);
		}
	};

	return (
		<div className='mt-4 grow flex flex-col justify-around'>
			<div className='mb-64'>
				<h1 className='text-4xl text-center py-4 mt-10'>Register</h1>
				<form action='' className='max-w-xl mx-auto flex flex-col justify-around' 
					onSubmit={handleRegisterUser}>
					<label htmlFor="i_name" className='p-4 border rounded-lg font-medium flex flex-col'> 
						Name: 
						<input type='text' placeholder='Enter your name...'  id='i_name' 
							className='font-normal focus:outline-none'
							value={name} 
							onChange={(event) => setName(event.target.value)}/>
					</label>
					<div className='py-2'></div>
					<label htmlFor="i_email" className='p-4 border rounded-lg font-medium flex flex-col'> 
						Email: 
						<input type='email' placeholder='Enter your email...'  id='i_email' 
							className='font-normal focus:outline-none'
							value={email} 
							onChange={(event) => setEmail(event.target.value)}/>
					</label>
					<div className='py-2'></div>
					<label htmlFor="i_psw" className='p-4 border rounded-lg font-medium flex flex-col'> 
						Password:
						<input type='password' placeholder='Enter your password...' id='i_psw' 
							className='font-normal focus:outline-none'
							value={password} 
							onChange={(event) => setPassword(event.target.value)}/>
					</label>
					<div className='py-2'></div>
					<button className='p-3 text-white border font-normal rounded-lg bg_default'>Register</button>
					<div className='py-2'></div>
					<div className='text-center py-2 text-gray-500'>
						Already registered? 
						<Link className='underline text-black ml-1' to={'/login'}>
							Login now
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterPage;