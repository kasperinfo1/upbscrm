import React, { useEffect, useState } from 'react';
import { RiUserLocationLine } from 'react-icons/ri';

const GeoLocation = () => {
    const [geoLocation, setGeoLocation] = useState({ lat: null, lon: null });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeoLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => console.error('Error fetching geolocation:', error)
            );
        }
    }, []);

    return geoLocation.lat && geoLocation.lon ? (
        <span className='d-flex align-items-center gap-1'><span className='d-md-none d-flex'><RiUserLocationLine /></span><span className='d-none d-md-flex'>Location:</span> {geoLocation.lat.toFixed(2)}, {geoLocation.lon.toFixed(2)}</span>
    ) : null;
};

export default GeoLocation;
