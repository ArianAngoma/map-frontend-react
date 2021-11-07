import {useRef, useState, useEffect, useCallback} from 'react';
import mapboxgl from 'mapbox-gl';
import {v4} from 'uuid';
import {Subject} from 'rxjs';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

export const useMapbox = (startPoint) => {
    /* Referencia al DIV del mapa */
    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);

    /* Referencia a los marcadores */
    const markers = useRef({});

    /* Observables de RxJs */
    const moveMarker = useRef(new Subject());
    const newMarker = useRef(new Subject());

    /* Referencia al mapa */
    const map = useRef();

    /* Estado para las coordenadas */
    const [coords, setCoords] = useState(startPoint);

    /* Función para agregar marcadores */
    const addMarker = useCallback((e, id) => {
        const {lng, lat} = e.lngLat || e;
        const marker = new mapboxgl.Marker();
        marker.id = id ?? v4();

        marker.setLngLat([lng, lat])
            .addTo(map.current)
            .setDraggable(true);

        /* Agregar al objeto de marcadores */
        markers.current[marker.id] = marker;

        /* Emitir el marcador creado */
        if (!id) newMarker.current.next({
            id: marker.id,
            lng,
            lat
        });

        /* Escuchar movimiento del marcador */
        marker.on('drag', ({target}) => {
            const {id} = target;
            const {lng, lat} = target.getLngLat();

            /* Emitir el movimiento del marcador */
            moveMarker.current.next({id, lng, lat})

        });
    }, []);

    /* Función para actualizar la ubicación del marcador */
    const updateLocation = useCallback(({id, lng, lat}) => {
        markers.current[id].setLngLat([lng, lat]);
    }, []);

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

    /* Agregar marcadores caundo hacemos click */
    useEffect(() => {
        map.current?.on('click', addMarker);
    }, [addMarker]);

    return {
        coords,
        setRef,
        addMarker,
        updateLocation,
        newMarker$: newMarker.current,
        moveMarker$: moveMarker.current
    }
}