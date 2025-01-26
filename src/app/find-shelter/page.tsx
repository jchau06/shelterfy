'use client';

import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import AppMap from './app-map';
import { SpinnerCircularFixed } from 'spinners-react';

const FindShelter = () => {
	const [events, setEvents] = useState(null);
	const [loading, setLoading] = useState(true);
	const [userPosition, setUserPosition] = useState<{
		lat: number;
		lng: number;
	} | null>(null);

	useEffect(() => {
		const getEvents = async () => {
			try {
				const res = await fetch(
					'https://eonet.gsfc.nasa.gov/api/v2.1/events?status=open'
				);
				if (!res.ok) {
					throw new Error('HTTP error fetching wildfire data');
				}
				const data = await res.json();
				setEvents(data.events);
			} catch (error) {
				if (error instanceof Error) {
					console.log('Error fetching wildfire data:', error.message);
					throw new Error(
						`Error fetching wildfire data: ${error.message}`
					);
				} else {
					console.log('Unknown error fetching wildfire data');
					throw new Error('Unknown error fetching wildfire data');
				}
			} finally {
				setLoading(false);
			}
		};

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

		getEvents();
	}, []);

	return (
		<div>
			<AppMap events={events} userPosition={userPosition} />
			{loading && (
				<div className='flex m-4 items-center gap-3'>
					<span className='text-lg'>Retrieving fire data</span>
					<SpinnerCircularFixed
						size={35}
						thickness={100}
						speed={100}
						color='rgba(248, 113, 113, 1)'
						secondaryColor='rgba(130, 130, 130, 1)'
					/>
				</div>
			)}
			<SearchComponent></SearchComponent>
		</div>
	);
};

export default FindShelter;
