/* Importaciones propias */
import {MapPage} from './pages/MapPage';
import {SocketProvider} from './context/SocketContext';

export const MapsApp = () => {
    return (
        <SocketProvider>
            <MapPage/>
        </SocketProvider>
    )
}