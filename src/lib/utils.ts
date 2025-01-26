import axios from 'axios';

export const getEvents = async () => {
	let events = [];

	try {
		const res = await fetch(
			'https://eonet.gsfc.nasa.gov/api/v2.1/events?status=open'
		);
		if (!res.ok) {
			throw new Error('HTTP error fetching wildfire data');
		}
		const data = await res.json();
		events = data.events;
	} catch (error) {
		if (error instanceof Error) {
			console.log('Error fetching wildfire data:', error.message);
			throw new Error(`Error fetching wildfire data: ${error.message}`);
		} else {
			console.log('Unknown error fetching wildfire data');
			throw new Error('Unknown error fetching wildfire data');
		}
	}

	return events;
};

export const getShelterData = async () => {
	let shelterData = [];

	const url = 'https://homeless-shelter.p.rapidapi.com/location';

	const params = {
		lat: 33.648787,
		lng: -117.842712,
		radius: 10,
	};
	const headers = {
		'x-rapidapi-host': 'homeless-shelter.p.rapidapi.com',
		'x-rapidapi-key': 'fb5e98260emshf81df3cb1fd50cap129c09jsnc8066210ed42',
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

export const getUserLocation = () => {
	let userPosition = null;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				userPosition = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
			},
			(error) => {
				console.error('Error getting location:', error.message);
			}
		);
	} else {
		console.error('Geolocation is not supported by this browser.');
	}

	return userPosition;
};
