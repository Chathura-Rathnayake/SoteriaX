
import React, { useState, useRef, useCallback } from "react";
import { render } from "react-dom";
import MapGL from 'react-map-gl';



export default function Simplemap() {
    const [viewport, setViewport] = useState({
        latitude: 8.064669,
        longitude: 439.448345,
        zoom: 6,
        
    })
    const MAPBOX_TOKEN ="pk.eyJ1IjoibnVrZXp6eiIsImEiOiJja3F0NWlqaDAwcGpzMnBucXk0anBpN3duIn0.tibmy5QPalU6q9_bvGkb6Q";
    const mapRef = useRef();
    const handleViewportChange = useCallback(
      (newViewport) => setViewport(newViewport),
      []
    );

    return (
        <div style={{ height: "65vh" }}>
        <MapGL
          ref={mapRef}
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/nukezzz/ckqy7z6nk09cp18s7nao9mmy9"
        >

        </MapGL>
      </div>
    );
}
