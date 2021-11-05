/* Importaciones propias */
import {useMapbox} from '../hooks/useMapbox';
import {useEffect} from 'react';

/* Punto inicial del mapa */
const startPoint = {
    lng: -77.0279,
    lat: -12.0676,
    zoom: 14
}

export const MapPage = () => {
    /* Custom Hook para Mapbox */
    const {setRef, coords, newMarker$, moveMarker$} = useMapbox(startPoint);

    /* Escuchar si se crea un nuevo marcador */
    useEffect(() => {
        newMarker$.subscribe(marker => {
            console.log(marker);
        });
    }, [newMarker$]);

    /* Escuchar si se mueve un marcador */
    useEffect(() => {
        moveMarker$.subscribe(marker => {
            console.log(marker);
        });
    }, [moveMarker$]);

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