import axios from 'axios';
import {createContext, useEffect, useState} from 'react';


export const UserContext = createContext({});

/* se utilizara para que otros componentes hereden el contexto del
usuario actual. Una alternativa es utilizar redux*/
export function UserContextProvider({children}){
	const [user, setUser] = useState(null);
	const [ready,setReady] = useState(false);
	// useEffect con [] hace que se renderice una sola vez
	useEffect(() => {
		if (!user) {
			axios.get('/profile').then(({data}) => {
				setUser(data);
				setReady(true);
			})
		};
	}, []);
	return (
		<UserContext.Provider value={{user, setUser, ready}}>
			{children}
		</UserContext.Provider>
	);
};