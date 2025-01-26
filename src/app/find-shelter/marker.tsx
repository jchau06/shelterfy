import { AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';

type MarkerProps = {
	position: {
		lat: number;
		lng: number;
	};
	icon: string;
	infoWindowContent?: string;
};

const Marker = ({ position, icon, infoWindowContent }: MarkerProps) => {
	const [open, setOpen] = useState(false);

	const handleSaveLocation = () => {
		console.log('Success')
	};

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
					<div className="flex flex-col items-center justify-center text-center">
						<p className='text-black'>{infoWindowContent}</p>
						{icon !== '🔥' && (
							<button
								className="w-full text-white border-none rounded-[6px] cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 transition duration-300"
								onClick={handleSaveLocation} // Trigger toast on button click
							>
								Save to Saved Locations
							</button>
						)}
					</div>
				</InfoWindow>
			)}
		</div>
	);
};

export default Marker;
