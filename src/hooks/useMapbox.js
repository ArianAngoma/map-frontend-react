import {useRef, useState, useEffect, useCallback} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

export const useMapbox = (startPoint) => {
    /* Referencia al DIV del mapa */
    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);

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
    }, [startPoint]);

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

    return {
        coords,
        setRef
    }
}