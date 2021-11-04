import {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

/* Punto inicial del mapa */
const startPoint = {
    lng: -77.0279,
    lat: -12.0676,
    zoom: 14
}

export const MapPage = () => {
    const mapDiv = useRef();

    const map = useRef();

    /* Estado para las coordenadas */
    const [coords, setCoords] = useState(startPoint);

    /* Mostrar el mapa al cargar el componente */
    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [startPoint.lng, startPoint.lat],
            zoom: startPoint.zoom
        });
    }, []);

    /* Escuchar cuando se mueve el mapa */
    useEffect(() => {
        map.current?.on('move', () => {
            const {lng, lat} = map.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.current.getZoom().toFixed(2)
            })
        });

        return map.current?.off('move');
    }, []);

    return (
        <>
            <div className="info">
                Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>

            <div className="mapContainer"
                 ref={mapDiv}/>
        </>
    )
}