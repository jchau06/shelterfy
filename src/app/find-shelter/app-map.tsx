'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';
import Marker from './marker';

type AppMapProps = {
	events:
		| {
				id: string;
				title: string;
				description: string;
				link: string;
				categories: {
					id: number;
					title: string;
				}[];
				sources: {
					id: string;
					url: string;
				}[];
				geometries: {
					date: string;
					type: string;
					coordinates: number[];
				}[];
		  }[]
		| null;
	userPosition: {
		lat: number;
		lng: number;
	} | null;
	shelterData:
		| {
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
		  }[]
		| null;
};

const AppMap = ({ events, userPosition, shelterData }: AppMapProps) => {
	// 34.0467° N, 118.5464° W
	const palisades = { lat: 34.0467, lng: -118.5464 };

	const fireMarkers = events?.map((event, index) => {
		if (event.categories[0].title === 'Wildfires') {
			const position = {
				lat: event.geometries[0].coordinates[1],
				lng: event.geometries[0].coordinates[0],
			};
			return (
				<Marker
					key={index}
					position={position}
					icon='🔥'
					infoWindowContent={event.title}
				/>
			);
		}
		return null;
	});

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

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
			<div className='w-[70vw] h-[80vh]'>
				<Map
					defaultCenter={userPosition || palisades}
					defaultZoom={9}
					gestureHandling='greedy'
					mapId={process.env.NEXT_PUBLIC_MAP_ID}
					reuseMaps
					colorScheme='DARK'
					disableDefaultUI
				>
					{fireMarkers}
					{userPosition && (
						<Marker
							position={userPosition}
							icon='📍'
							infoWindowContent='My current location'
						/>
					)}
					{shelterMarkers}
				</Map>
			</div>
		</APIProvider>
	);
};

export default AppMap;
