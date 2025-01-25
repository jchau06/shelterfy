import axios, {AxiosError} from 'axios';
import {env} from "node:process";
const GEOCODE_BASE = "https://reversegeo.melissadata.net/v3/web/ReverseGeoCode/doLookup";


// verify address' proximity to fires

// locate any danger near my location

// find shelters near me
async function findNearbyLocations(lat:number, long:number){
    try {
        const response = await axios.get(GEOCODE_BASE,
            {params:{
                id: env.MELISSA_LICENSE_KEY,
                lat: lat,
                long: long,
                opt: "IncludeApartments:on"
            }}
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
}