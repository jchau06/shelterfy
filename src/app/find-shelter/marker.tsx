import { AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';

type MarkerProps = {
	position: {
		lat: number;
		lng: number;
	};
	icon: string;
	infoWindowContent: string;
};

const Marker = ({ position, icon, infoWindowContent }: MarkerProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<AdvancedMarker position={position} onClick={() => setOpen(true)}>
				<span className='text-3xl'>{icon || '📍'}</span>
			</AdvancedMarker>

			{open && infoWindowContent && (
				<InfoWindow
					position={position}
					onCloseClick={() => setOpen(false)}
				>
					<p className='text-black'>{infoWindowContent}</p>
				</InfoWindow>
			)}
		</div>
	);
};

export default Marker;
