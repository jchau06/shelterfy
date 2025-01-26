// Add endpoints here to make sure user can retrieve their saved locations from database

import React from 'react';

type SavedLocations = {
	id: number;
	name: string;
	address: string;
	city: string;
	zip: string;
	location: string;
};

type StorageProps = {
	addShelters: (shelterData: SavedLocations[]) => void;
};

const Storage = ({ addShelters }: StorageProps) => {
	const mockData = [
		{
			id: 1,
			name: 'Orange County Catholic Worker - Isaiah House',
			address: '316 South Cypress Avenue',
			city: 'Santa Ana',
			zip: '92701',
			location: '33.742825986697724,-117.86675403726602',
		},
		{
			id: 2,
			name: 'Santa Ana Hospitality House - Salvation Army',
			address: '818 E. 3rd Street',
			city: 'Santa Ana',
			zip: '92701',
			location: '33.74691099102931,-117.85949396801158',
		},
		{
			id: 3,
			name: 'Santa Ana Armory Cold Weather Shelter',
			address: '612 E. Warner',
			city: 'Santa Ana',
			zip: '92707',
			location: '33.715084988491185,-117.86210702632653',
		},
		{
			id: 4,
			name: 'Mercy House',
			address: 'P.O. Box 1905',
			city: 'Santa Ana',
			zip: '92702',
			location: '33.74958000000004,-117.87445999999994',
		},
		{
			id: 5,
			name: 'WISEPlace - For Women',
			address: '1411 N. Broadway',
			city: 'Santa Ana',
			zip: '92706',
			location: '33.75712299894407,-117.86908102122558',
		},
		{
			id: 6,
			name: 'Casa Teresa',
			address: 'P.O Box 429',
			city: 'Orange',
			zip: '92856',
			location: '33.787870000000055,-117.85070999999999',
		},
	];

	addShelters(mockData);

	return (
		<div
			style={{
				position: 'fixed', // Keeps it on the right side of the screen
				top: '50%', // Centers it vertically
				right: '70px', // Space from the right edge
				transform: 'translateY(-50%)', // Adjust based on its height
				backgroundColor: '#E0E0E0',
				padding: '1rem',
				borderRadius: '12px',
				width: '350px',
				textAlign: 'center',
				boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
			}}
		>
			<h2
				style={{
					fontSize: '18px',
					fontWeight: 'bold',
					marginBottom: '16px',
					color: 'black',
				}}
			>
				Saved Locations:
			</h2>
			<ul
				style={{
					maxHeight: '400px', // Limits the height of the list
					overflowY: 'scroll', // Makes the list scrollable when content exceeds height
					padding: '0 4px',
					scrollbarWidth: 'thin', // Optional for better scrollbar appearance
				}}
			>
				{mockData.map((item, index) => (
					<li key={index} className='m-4'>
						<div className='flex flex-col items-start bg-white rounded-2xl shadow-md p-6 w-full'>
							<h4 className='text-black'>Name: {item.name}</h4>
							<h4 className='text-black'>
								Address: {item.address}
							</h4>
							<h4 className='text-black'>Zip Code: {item.zip}</h4>
							<h4 className='text-black'>City: {item.city}</h4>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Storage;
