'use client';

import axios from 'axios';
import React, { useState } from 'react';

// Seearch results are all type Shelter
type Shelter = {
	id: number;
	name: string;
	address: string;
	zip: number;
};

const getShelterData = async (city?: string, state?: string, zip?: number) => {
	// Not finished

	if (!(city && state) || !zip) {
		return;
	}

	let url = '';
	let params = {};
	if (city && state) {
		url = 'https://homeless-shelter.p.rapidapi.com/state-city';
		let params = {
			state: state,
			city: city,
		};
	} else if (zip) {
		url = 'https://homeless-shelter.p.rapidapi.com/zipcode';
		let params = {
			zipcode: zip,
		};
	} else {
		return;
	}

	let data = [];

	const headers = {
		'x-rapidapi-host': 'homeless-shelter.p.rapidapi.com',
		'x-rapidapi-key': process.env.NEXT_PUBLIC_SHELTER_API_KEY,
	};

	try {
		const response = await axios.get(url, {
			params,
			headers,
		});
		data = response.data;
	} catch (error) {
		console.error('Error fetching shelters:', error);
	}

	return data;
};

const SearchComponent = () => {
	const [formData, setFormData] = useState({
		city: '',
		state: '',
		zipCode: '',
	});
	const [results, setResults] = useState<Shelter[]>([]);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
  const [userPressed, setPressed] = useState(false); //Edit no results found message.

	const handleSearch = () => {
		console.log('submitted');

		// setLoading(true);

		// console.log('CITY:', formData.city);
		// console.log('STATE:', formData.state);
		// console.log('ZIP:', formData.zipCode);

		// setLoading(false);
    // setPressed(true); // If no results are found => error message is output.
	};


	return (
		<div
			style={{
				position: 'fixed', // Fixed position to keep it on the right side of the screen
				top: '50%', // Center it vertically
				right: '20px', // Space from the right edge
				transform: 'translateY(-50%)', // Center it based on its height
				backgroundColor: '#E0E0E0',
				padding: '20px',
				borderRadius: '12px',
				maxWidth: '400px',
				textAlign: 'center',
				boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
			}}
		>
			<form>
				<h2 className='text-[18px] font-bold mb-4 text-black'>
					Search for Shelters Near
				</h2>
				<input
					type='text'
					name='city'
					placeholder='Enter a city'
					value={formData.city}
					onChange={handleChange}
					required
					className='w-full p-[10px] mb-[10px] rounded-[6px] border-gray-500 box-border text-black'
				/>
				<input
					type='text'
					name='state'
					placeholder='Enter a state'
					value={formData.state}
					onChange={handleChange}
					required
					className='w-full p-[10px] mb-[10px] rounded-[6px] border-gray-500 box-border text-black'
				/>
				<input
					type='number'
					name='zipCode'
					placeholder='Enter a zip code'
					value={formData.zipCode}
					onChange={handleChange}
					required
					className='w-full p-[10px] mb-[10px] rounded-[6px] border-gray-500 box-border text-black'
				/>
				<button
					type='submit'
					onClick={handleSearch}
					className='w-full p-[10px] bg-[#007BFF] text-white border-none rounded-[6px] cursor-pointer'
				>
					Search
				</button>
			</form>
			{loading && <p>Loading search results...</p>}{' '}
			{/* Display loading message */}
			{results.length > 0 && (
				<div
					style={{
						marginTop: '20px',
						maxHeight: '300px', // Set a maximum height for the results container
						overflowY: 'auto', // Make the results scrollable
						paddingRight: '10px', // Add some padding to the right to avoid the scrollbar being cut off
					}}
				>
					<h3>Search Results</h3>
					<ul style={{ listStyleType: 'none', padding: 0 }}>
						{results.map((result, index) => (
							<li
								key={index}
								style={{
									backgroundColor: '#fff',
									padding: '10px',
									margin: '5px 0',
									borderRadius: '6px',
									boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
								}}
							>
								<h4 style={{ margin: '0', color: '#007BFF' }}>
									{result.name}
								</h4>
								<p style={{ margin: '5px 0', color: '#555' }}>
									{result.address}
								</p>
							</li>
						))}
					</ul>
				</div>
			)}
			{results.length === 0 && !loading && userPressed && (
				<p style={{ color: '#888' }}>
					No results found. Try a different search.
				</p>
			)}
		</div>
	);
};

export default SearchComponent;
