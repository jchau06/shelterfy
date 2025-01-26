import axios, { AxiosError } from 'axios';

const PROPERTY_VERIF_BASE = "https://property.melissadata.net/v4/WEB/LookupDeeds/";
const BUISNESS_VERIF_BASE =
	'https://businesscoder.melissadata.net/WEB/BusinessCoder/doBusinessCoderUS';


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
				id: process.env.MELISSA_LICENSE_KEY,
				a1: addrLineOne,
				city: city,
				state: state,
				postal: zipCode,
				ctry: country,
			},
		});
		return verifyProperty(JSON.parse(response.data)["MelissaAddressKey"]);
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

const verifyProperty = async (melissaAddrKey:string) =>{
	try {
		const response = await axios.get(PROPERTY_VERIF_BASE, {
			params: {
				id: env.MELISSA_LICENSE_KEY,
				mak: melissaAddrKey
			},
		});
		return JSON.parse(response.data);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

export default verifyBuisness;
