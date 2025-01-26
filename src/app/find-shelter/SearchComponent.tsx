'use client';

import axios from 'axios';
import React, { useState } from 'react';

import Collapsible from './collapsible';



// Seearch results are all type Shelter
type Shelter = {
	id: number;
	name: string;
	address: string;
	zip: number;
};

const getShelterData = async (userPosition: { lat: number; lng: number }) => {
	let shelterData = [];

	const url = 'https://homeless-shelter.p.rapidapi.com/location';

	const params = {
		lat: userPosition.lat,
		lng: userPosition.lng,
		radius: 10,
	};
	const headers = {
		'x-rapidapi-host': 'homeless-shelter.p.rapidapi.com',
		'x-rapidapi-key': process.env.NEXT_PUBLIC_SHELTER_API_KEY,
	};

	try {
		const response = await axios.get(url, {
			params,
			headers,
		});

		shelterData = response.data;
	} catch (error) {
		console.error('Error fetching shelters:', error);
	}

	return shelterData;
};

type ShelterData = {
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
}[];
type SearchComponentProp = {
	addShelters: (shelterData: ShelterData) => void;
	userPosition: {
		lat: number;
		lng: number;
	} | null;
};

const SearchComponent = ({
	addShelters,
	userPosition,
}: SearchComponentProp) => {
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

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userPosition) return;
		const shelterData = await getShelterData(userPosition);
		console.log(shelterData);
		addShelters(shelterData);
	};

	return (
		<div className="max-w-lg mx-auto mt-40 ml-10 mr-10">
		  {/* Search Button */}
		  <button
			onClick={handleSearch}
			className="w-full p-[10px] text-white border-none rounded-[6px] cursor-pointer my-6 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 transition duration-300"
		  >
			{loading ? 'Searching...' : 'Find shelters near me'}
		  </button>
	
		  {/* Collapsible Content */}
		  <div className="mt-4">
			<Collapsible title="Click here for Directions!">
			  <p>Click on the above button to show shelters near you!</p>
			  <p>Press on the 📍, 🔥, 🏠 to reveal their location!</p>
			  <p>
				After clicking 🏠, you can verify and add the shelter to your list of
				saved locations!
			  </p>
			</Collapsible>
		  </div>
		</div>
	  );
	};
	
	export default SearchComponent;
	