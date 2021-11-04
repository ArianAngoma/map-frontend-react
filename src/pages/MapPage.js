import {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const startPoint = {
    lng: 5,
    lat: 34,
    zoom: 2
}

export const MapPage = () => {

    const mapDiv = useRef();

    const [map, setMap] = useState(null);

    /* Mostrar el mapa al cargar el componente */
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [startPoint.lng, startPoint.lat],
            zoom: startPoint.zoom
        });
        setMap(map);
    }, []);

    return (
        <>
            <div className="mapContainer"
                 ref={mapDiv}/>
        </>
    )
}