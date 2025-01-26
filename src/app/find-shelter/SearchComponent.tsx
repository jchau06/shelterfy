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
		<div>
			<button
				onClick={handleSearch}
				className='w-full p-[10px] bg-[#007BFF] text-white border-none rounded-[6px] cursor-pointer m-20'
			>
				Find shelters near me
			</button>
		</div>
	);
};

export default SearchComponent;
