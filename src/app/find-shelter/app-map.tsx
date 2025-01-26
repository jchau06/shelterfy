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
};

const AppMap = ({ events, userPosition }: AppMapProps) => {
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

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
			<div className='w-[78vw] h-[80vh]'>
				<Map
					defaultCenter={userPosition || palisades}
					defaultZoom={9}
					gestureHandling='greedy'
					mapId={process.env.NEXT_PUBLIC_MAP_ID}
				>
					{fireMarkers}
					{userPosition && (
						<Marker
							position={userPosition}
							icon='📍'
							infoWindowContent='My current location'
						/>
					)}
				</Map>
			</div>
		</APIProvider>
	);
};

export default AppMap;
