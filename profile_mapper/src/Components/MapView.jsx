import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapView = ({ lat, lng, zoom = 12, fullWidth = false }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    let map;

    loader.load().then(() => {
      if (mapRef.current) {
        map = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom,
        });

        new window.google.maps.Marker({
          position: { lat, lng },
          map,
        });
      }
    });

    return () => {
      if (map) map = null;
    };
  }, [lat, lng, zoom]);

  return (
    <div
      ref={mapRef}
      style={{
        width: fullWidth ? '100%' : '200px',
        height: fullWidth ? '400px' : '200px',
        borderRadius: '12px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default MapView;










// import React, { useEffect, useRef } from 'react'

// function MapView({lat, lng}) {

//     const mapRef = useRef();

//     useEffect(()=>{
//         if (lat && lng && window.google) {
//             const map = new window.google.maps.Map(mapRef.current,{
//                 center:{lat,lng},
//                 zoom: 14,
//             })
//             new window.google.maps.Marker({position:{lat,lng},map})
//         }
//     },[lat,lng])

//   return (
//     <div ref={mapRef} style={{width:'30%', height:'200px'}}/>
//   )
// }

// export default MapView