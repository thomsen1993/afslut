"use client"

import {useEffect, useRef} from 'react'
import L from "leaflet"
import "Leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"
/* import leafIcon from "../assets/leaf-orange.png"
import leafShadow from "../assets/leaf-shadow.png" */

/* let DefaultIcon = L.icon({
    iconUrl: leafIcon,
    shadowUrl: leafShadow,

    iconSize:     [38, 95], 
    shadowSize:   [50, 64], 
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62], 
    popupAnchor:  [-3, -76]
}) */

/* L.Marker.prototype.options.icon = DefaultIcon; */

const LeafLetMap = ({coord=[56, 15], setLat = null, setLon = null}) => {

    const mapRef = useRef()

    const markerRef = useRef()

    useEffect(() => {

        if (!mapRef.current) {
            
            mapRef.current = L.map("mapcontainer").setView(coord, 10)
    
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);

            markerRef.current = L.marker(coord).addTo(mapRef.current).bindPopup("Here are we")

        } else {

            mapRef.current.setView(coord, 10)

            markerRef.current.setLatLng(coord)

            if (setLat || setLon) {
                mapRef.current.on("click", e => {setLat(e.latlng.lat); setLon(e.latlng.lng)})
            }

        }
      
    }, [coord])
    

  return (
    <div style={{width:"400px", height:"300px"}} id='mapcontainer'className='shadow-lg shadow-black rounded-md'>
        Kortet loader...
    </div>
  )
}

export default LeafLetMap