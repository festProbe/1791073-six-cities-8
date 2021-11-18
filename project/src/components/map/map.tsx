import React, { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { PINS_URLS } from '../../const';
import { Offer, Location } from '../../types/offer';

type MapProps = {
  offers: Offer[],
  currentPlace: Location | null,
}

function Map({ offers, currentPlace }: MapProps): JSX.Element {

  const city = offers[0].city;

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
      map.setView({
        lat: city.location.latitude,
        lng: city.location.longitude,
      }, city.location.zoom,
      );
    }
  }, [city, map]);

  useEffect(() => {
    if (map) {
      offers.map((offer) => offer.location).forEach((location) => {
        leaflet.marker({
          lat: location.latitude,
          lng: location.longitude,
        }, {
          icon: (currentPlace !== undefined && currentPlace !== null && currentPlace.latitude === location.latitude && currentPlace.longitude === location.longitude)
            ? currentCustomIcon
            : defaultCustomIcon,
        })
          .addTo(map);
      });
    }
  }, [map, offers, currentCustomIcon, defaultCustomIcon, currentPlace]);

  return (
    <div
      style={{ height: '500px' }}
      ref={mapRef}
    >

    </div>
  );
}

export default Map;
