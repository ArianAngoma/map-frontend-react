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
    const {setRef, coords, newMarker$} = useMapbox(startPoint);

    useEffect(() => {
        newMarker$.subscribe(marker => {
            console.log(marker);
        });
    }, [newMarker$])

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