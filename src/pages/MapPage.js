/* Importaciones propias */
import {useMapbox} from '../hooks/useMapbox';

/* Punto inicial del mapa */
const startPoint = {
    lng: -77.0279,
    lat: -12.0676,
    zoom: 14
}

export const MapPage = () => {
    /* Custom Hook para Mapbox */
    const {setRef, coords} = useMapbox(startPoint);

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