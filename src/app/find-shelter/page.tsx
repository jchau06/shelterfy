'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React from 'react';

const FindShelter = () => {
	// 34.0467° N, 118.5464° W
	const position = { lat: 34.0467, lng: -118.5464 };

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
			<div className='w-[78vw] h-[80vh]'>
				<Map
					defaultCenter={position}
					defaultZoom={9}
					gestureHandling='greedy'
				></Map>
			</div>
		</APIProvider>
	);
};

export default FindShelter;
