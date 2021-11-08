import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { PINS_URLS } from '../../const';
import { MapMock } from '../../types/map';

type MapProps = {
  mapProps: MapMock;
}

function Map({ mapProps }: MapProps): JSX.Element {

  const { city, locations, selectedPlace } = mapProps;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: PINS_URLS.MAIN_PIN,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: PINS_URLS.ACTIVE_PIN,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      locations.forEach((location) => {
        leaflet.marker({
          lat: location.latitude,
          lng: location.longitude,
        }, {
          icon: (selectedPlace !== undefined && selectedPlace.latitude === location.latitude && selectedPlace.longitude === location.longitude)
            ? currentCustomIcon
            : defaultCustomIcon,
        })
          .addTo(map);
      });
    }
  }, [map, locations, defaultCustomIcon, selectedPlace, currentCustomIcon]);

  return (
    <div
      style={{ height: '500px' }}
      ref={mapRef}
    >

    </div>
  );
}

export default Map;
