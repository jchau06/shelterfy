'use client';

import {

  APIProvider,

} from '@vis.gl/react-google-maps';
import React, { useState, useEffect } from 'react';
import Storage from './Storage';

import AppMap from '../find-shelter/app-map';
import { SpinnerCircularFixed } from 'spinners-react';

const SavedLocations = () => {
  // Coordinates for Palisades
//   const palisades = { lat: 34.0467, lng: -118.5464 };
//   const [open, setOpen] = useState(false);

  const [events, setEvents] = useState(null);
//   const [shelterData, setShelterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events?status=open');
        if (!res.ok) {
          throw new Error('HTTP error fetching wildfire data');
        }
        const data = await res.json();
        setEvents(data.events);
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error fetching wildfire data:', error.message);
          throw new Error(`Error fetching wildfire data: ${error.message}`);
        } else {
          console.log('Unknown error fetching wildfire data');
          throw new Error('Unknown error fetching wildfire data');
        }
      }
    };

    getEvents(); // Call the async function
  }, []); // Empty dependency array ensures this runs once on mount

  if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserPosition({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				(error) => {
					console.error('Error getting location:', error.message);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
useEffect(() => {
		if (events) {
			setLoading(false);
		}
	}, [events]);

  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <div className="w-[68vw] h-[80vh]">
			<AppMap
				events={events}
				userPosition={userPosition}
				shelterData={null}
			/>
			{loading && (
							<div className='flex m-4 items-center gap-3'>
								<span className='text-lg'>Fetching data</span>
								<SpinnerCircularFixed
									size={35}
									thickness={100}
									speed={100}
									color='rgba(248, 113, 113, 1)'
									secondaryColor='rgba(130, 130, 130, 1)'
								/>
							</div>
						)}
        </div>
      </APIProvider>
      <Storage />
    </div>
  );
};

export default SavedLocations;
