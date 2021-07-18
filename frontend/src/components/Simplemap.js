import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';


export default function Simplemap() {
    const [viewport,setViewport] = useState({
        latitude:  6.008760,
        longitude: 80.249948, 
        
        width: "70vw",
        height:"60vh",
        zoom:16

    })    
    return (
        <div>
            <ReactMapGl
                {...viewport} 
                    mapboxApiAccessToken="pk.eyJ1IjoibnVrZXp6eiIsImEiOiJja3F0NWlqaDAwcGpzMnBucXk0anBpN3duIn0.tibmy5QPalU6q9_bvGkb6Q"
                    mapStyle="mapbox://styles/nukezzz/ckqy7z6nk09cp18s7nao9mmy9"
                    onViewportChange={viewport => {
                        setViewport(viewport);
                    }}
                    >
            </ReactMapGl>
        </div>
    );
  }
  