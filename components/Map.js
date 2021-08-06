import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import * as geolib from 'geolib'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = searchResults?.map(item => ({ latitude: item.lat, longitude: item.long }))

    const center = geolib.getCenter(coordinates)

    const [viewport, setViewport] = useState({
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
        width: "100%",
        height: "100%"
    })

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/coderkhalid/cks0i5e0qcnnk17p4d2fz2zb8"
            mapboxApiAccessToken={process.env.mapbox_key}
            onViewportChange={(viewport) => setViewport(viewport)}
            {...viewport}
        >
            {searchResults?.map(item => (
                <div key={item.img}>
                    <Marker
                        latitude={item.lat}
                        longitude={item.long}
                        offsetLeft={-20}
                        offsetLeft={-10}
                    >
                        <p className="cursor-pointer text-2xl relative z-40" onClick={() => setSelectedLocation(item)} role="img">
                            <img src="/pin.png" loading="lazy" alt="" className="w-10" />
                        </p>
                    </Marker>
                    {selectedLocation?.long === item?.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={item.lat}
                            longitude={item.long}
                        >
                            <div className="p-3 min-w-[300px] relative z-50">
                                <img src={item.img} loading="lazy" className="w-full object-cover h-48 rounded-lg mb-3" alt="" />
                                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xl font-semibold">{item.price}</p>
                                        <p className="cursor-pointer flex items-center">
                                            <StarIcon className="h-5 text-yellow-500 mr-1" />
                                            {item.star}
                                        </p>
                                    </div>
                                    <HeartIcon className="cursor-pointer h-7 text-red-600" />

                                </div>
                            </div>
                        </Popup>
                    ) : ""}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
