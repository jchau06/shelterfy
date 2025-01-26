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
			name: 'Tustin Temporary Emergency Shelter',
			address: '2345 Barranca Parkway',
			city: 'Tustin',
			zip: '92782',
			location: '33.69828714677183,-117.832490273428858',
		},
		{
			id: 2,
			name: 'Build Futures',
			address: '18822 Beach Blvd #211',
			city: 'Huntington Beach',
			zip: '92648',
			location: '33.688876998465915,-117.98808703105342',
		},
		{
			id: 3,
			name: 'Human Options - Emergency Shelter Women',
			address: '5540 Trabuco Rd',
			city: 'East Irvine',
			zip: '92620',
			location: '33.69686298244487,-117.7649440047168',
		},
	];

	addShelters(mockData);

	return (
		<div className="bg-orange-100"
			style={{
				position: 'fixed', // Keeps it on the right side of the screen
				top: '50%', // Centers it vertically
				right: '70px', // Space from the right edge
				transform: 'translateY(-50%)', // Adjust based on its height
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
					maxHeight: '400px', 
					overflowY: 'scroll', 
					padding: '0 4px',
					scrollbarWidth: 'thin', 
				}}
			>
				{mockData.map((item, index) => (
					<li key={index} className="m-4">
						<div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-[12px] shadow-md transition transform hover:scale-105 cursor-pointer">
							<h4 className="text-white font-semibold">{item.name}</h4>
							<h4 className="text-white">{item.address}</h4>
							<h4 className="text-white">{item.zip}</h4>
							<h4 className="text-white">{item.city}</h4>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Storage;
