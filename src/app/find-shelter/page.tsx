'use client';

import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import AppMap from './app-map';
import { SpinnerCircularFixed } from 'spinners-react';
import axios, { AxiosResponse } from 'axios';
import { getUserLocation, getEvents } from '@/lib/utils';

type ShelterData = {
	address: string;
	city: string;
	description: string;
	email_address: string;
	facebook: string;
	fax_number: string;
	instagram: string;
	location: string;
	name: string;
	official_website: string;
	phone_number: string;
	photo_urls: string[];
	state: string;
	twitter: string;
	update_datetime: string;
	zip_code: string;
}[];

const FindShelter = () => {
	const [events, setEvents] = useState(null);
	const [shelterData, setShelterData] = useState<ShelterData | null>(null);
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
			}
		};

		const getShelterData = async () => {
			const url = 'https://homeless-shelter.p.rapidapi.com/location';

			const params = {
				lat: 33.648787,
				lng: -117.842712,
				radius: 10,
			};
			const headers = {
				'x-rapidapi-host': 'homeless-shelter.p.rapidapi.com',
				'x-rapidapi-key': process.env.NEXT_PUBLIC_SHELTER_API_KEY,
			};

			try {
				const response = await axios.get(url, {
					params,
					headers,
				});
				setShelterData(response.data);
			} catch (error) {
				console.error('Error fetching shelters:', error);
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
		getShelterData();
	}, []);

	useEffect(() => {
		if (events && shelterData) {
			setLoading(false);
		}
	}, [events, shelterData]);

	return (
		<div>
			<AppMap
				events={events}
				userPosition={userPosition}
				shelterData={shelterData}
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
			<SearchComponent></SearchComponent>
		</div>
	);
};

export default FindShelter;
