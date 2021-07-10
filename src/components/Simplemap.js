import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';


export default function Simplemap() {
    const [viewport,setViewport] = useState({
        latitude: 6.009619,
        longitude: 80.247971,
        width: "70vw",
        height:"50vh",
        zoom:13

    })    
    return (
        <div>
            <ReactMapGl
                {...viewport} 
                    mapboxApiAccessToken="pk.eyJ1IjoibnVrZXp6eiIsImEiOiJja3F0NWlqaDAwcGpzMnBucXk0anBpN3duIn0.tibmy5QPalU6q9_bvGkb6Q"
                    
                    onViewportChange={viewport => {
                        setViewport(viewport);

                    }}
                    >
            </ReactMapGl>
        </div>
    );
  }
  