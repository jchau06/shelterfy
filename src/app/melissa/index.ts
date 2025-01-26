import axios, { AxiosError } from 'axios';
import { env } from 'node:process';
const GEOCODE_BASE =
	'https://reversegeo.melissadata.net/v3/web/ReverseGeoCode/doLookup';
const GLOBAL_LOCATOR_BASE =
	'https://address.melissadata.net/V3/WEB/GlobalAddress/doGlobalAddress';
const BUISNESS_VERIF_BASE =
	'https://businesscoder.melissadata.net/WEB/BusinessCoder/doBusinessCoderUS';

// get info on a given location
const getLocation = async (
	addrLineOne: string,
	country: string,
	zipCode: string,
	locality: string
) => {
	try {
		const response = await axios.get(GLOBAL_LOCATOR_BASE, {
			params: {
				id: env.MELISSA_LICENSE_KEY,
				a1: addrLineOne,
				locality: locality,
				ctry: country,
				postal: zipCode,
			},
		});
		const jsonParsedResp = JSON.parse(response.data);
		return findNearbyLocations(
			parseFloat(jsonParsedResp['Records']['Latitude']),
			parseFloat(jsonParsedResp['Records']['Longitude'])
		);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

// find nearby services
// AE transmission result code = error
const verifyBuisness = async (
	addrLineOne: string,
	zipCode: string,
	city: string,
	state: string = 'CA',
	country: string = 'US'
) => {
	try {
		const response = await axios.get(BUISNESS_VERIF_BASE, {
			params: {
				id: env.MELISSA_LICENSE_KEY,
				a1: addrLineOne,
				city: city,
				state: state,
				postal: zipCode,
				ctry: country,
			},
		});
		return JSON.parse(response.data);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

// find shelters near me
/* Return code info:
GS07: results found
GE51: No pts found
GR50: invalid coords

*/
const findNearbyLocations = async (lat: number, long: number) => {
	try {
		const response = await axios.get(GEOCODE_BASE, {
			params: {
				id: env.MELISSA_LICENSE_KEY,
				lat: lat,
				long: long,
				opt: 'IncludeApartments:on',
			},
		});
		return JSON.parse(response.data);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

export default { findNearbyLocations, getLocation, verifyBuisness };

export default { getLocation, verifyBuisness };
