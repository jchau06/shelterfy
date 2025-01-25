'use client'

import {
	AdvancedMarker,
	APIProvider,
	InfoWindow,
	Map,
	Pin,
} from '@vis.gl/react-google-maps';
import React, { useState } from 'react';
import SearchComponent from './SearchComponent';

const FindShelter = () => {
	// 34.0467° N, 118.5464° W
	const palisades = { lat: 34.0467, lng: -118.5464 };
	const [open, setOpen] = useState(false);

	return (
		<div>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
				<div className='w-[78vw] h-[80vh]'>
					<Map
						defaultCenter={palisades}
						defaultZoom={9}
						gestureHandling='greedy'
						mapId={process.env.NEXT_PUBLIC_MAP_ID}
					>
						<AdvancedMarker
							position={palisades}
							onClick={() => setOpen(true)}
						>
							<span className='text-3xl'>🔥</span>
						</AdvancedMarker>

						{open && (
							<InfoWindow
								position={palisades}
								onCloseClick={() => setOpen(false)}
							>
								<p className='text-black'>This is Palisades</p>
							</InfoWindow>
						)}
					</Map>
				</div>
			</APIProvider>
			<SearchComponent></SearchComponent>
		</div>
	);
};

export default FindShelter;