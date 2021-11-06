import {useEffect, useMemo, useState} from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath) => {
    /* Se hace uso del useMemo para establecer un nuevo socket solo si la cadena de conexión cambia */
    const socket = useMemo(() => io.connect(serverPath, {
        transports: ['websocket']
    }), [serverPath]);

    /* Estado para online */
    const [online, setOnline] = useState(false);

    /* Escuchar si el cliente se conecta */
    useEffect(() => {
        // console.log(socket);
        setOnline(socket.connected)
    }, [socket]);

    /* Escuchar si se recupera la conexión */
    useEffect(() => {
        socket.on('connect', () => [
            setOnline(true)
        ]);
    }, [socket]);

    /* Escuchar cuando perdemos la conexión */
    useEffect(() => {
        socket.on('disconnect', () => [
            setOnline(false)
        ]);
    }, [socket]);


    return {socket, online};
}