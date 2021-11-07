import {useContext, useEffect} from 'react';
import {useMapbox} from '../hooks/useMapbox';

/* Importaciones propias */
import {SocketContext} from '../context/SocketContext';

/* Punto inicial del mapa */
const startPoint = {
    lng: -77.0279,
    lat: -12.0676,
    zoom: 14
}

export const MapPage = () => {
    /* Socket */
    const {socket} = useContext(SocketContext);

    /* Custom Hook para Mapbox */
    const {setRef, coords, newMarker$, moveMarker$} = useMapbox(startPoint);

    /* Escuchar si se crea un nuevo marcador */
    useEffect(() => {
        newMarker$.subscribe(marker => {
            // console.log(marker);
            socket.emit('new-marker', marker);
        });
    }, [newMarker$, socket]);

    /* Escuchar si se mueve un marcador */
    useEffect(() => {
        moveMarker$.subscribe(marker => {
            // console.log(marker);
        });
    }, [moveMarker$]);

    /* Escuchar evento de nuevos marcadores */
    useEffect(() => {
        socket.on('new-marker', (marker) => {
            console.log(marker);
        });
    }, [socket]);

    return (
        <>
            <div className="info">
                Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>

            <div className="mapContainer"
                 ref={setRef}/>
        </>
    )
}