'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { JSX, useState } from 'react';
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
	shelterMarkers: JSX.Element[];
};

const AppMap = ({ events, userPosition, shelterMarkers }: AppMapProps) => {
	// 34.0467° N, 118.5464° W
	const palisades = { lat: 34.0467, lng: -118.5464 };

	const fireMarkers = events?.map((event, index) => {
		if (event.categories[0].title === 'Wildfires') {
			const lat = event.geometries[0].coordinates[1];
			const lng = event.geometries[0].coordinates[0];
			if (
				!(
					lat >= 32.5343 &&
					lat <= 42.0095 &&
					lng >= -124.4096 &&
					lng <= -114.1312
				)
			) {
				return null;
			}

			const position = {
				lat: lat,
				lng: lng,
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
