import {createContext} from 'react';

/* Importaciones propias */
import {useSocket} from '../hooks/useSocket';

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    const {socket, online} = useSocket('http://localhost:4000');

    return (
        <SocketContext.Provider value={{socket, online}}>
            {children}
        </SocketContext.Provider>
    )
}