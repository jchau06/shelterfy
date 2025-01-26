'use client';

import React, { JSX, useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import AppMap from './app-map';
import { SpinnerCircularFixed } from 'spinners-react';
import axios, { AxiosResponse } from 'axios';
import { getUserLocation, getEvents } from '@/lib/utils';
import Marker from './marker';


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
	const [loading, setLoading] = useState(true);
	const [userPosition, setUserPosition] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const [shelterMarkers, setShelterMarkers] = useState<JSX.Element[]>([]);

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

	useEffect(() => {
		if (events) {
			setLoading(false);
		}
	}, [events]);

	const addShelters = (shelterData: ShelterData) => {
		const shelterMarkers = shelterData?.map((shelter, index) => {
			const positionArr = shelter.location.split(',').map(Number);
			const position = {
				lat: positionArr[0],
				lng: positionArr[1],
			};
			return (
				<Marker
					key={index}
					position={position}
					icon='🏠'
					infoWindowContent={shelter.name}
				/>
			);
		});
		setShelterMarkers(shelterMarkers);
	};

	return (
		<div className='flex'>
			<div>
				<AppMap
					events={events}
					userPosition={userPosition}
					shelterMarkers={shelterMarkers}
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
			<SearchComponent
				addShelters={addShelters}
				userPosition={userPosition}
			></SearchComponent>
		</div>
	);
};

export default FindShelter;
