'use client';

import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import AppMap from './app-map';

const FindShelter = () => {
	const [events, setEvents] = useState(null);

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
			}
		};

		getEvents();
	}, []);

	return (
		<div>
			<AppMap events={events} />
			<SearchComponent></SearchComponent>
		</div>
	);
};

export default FindShelter;
