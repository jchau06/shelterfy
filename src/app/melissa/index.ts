import axios, {AxiosError} from 'axios';
import {env} from "node:process";
const GEOCODE_BASE = "https://reversegeo.melissadata.net/v3/web/ReverseGeoCode/doLookup";
const GLOBAL_LOCATOR_BASE = "https://address.melissadata.net/V3/WEB/GlobalAddress/doGlobalAddress";


// get info on users' current location
const getLocation = async(ipAddr:string) => {
  try {
    const response = await axios.get(GEOCODE_BASE,
        {params:{
            id: env.MELISSA_LICENSE_KEY,
            ip: ipAddr 
        }}
    );
    return JSON.parse(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// locate any danger near my location

// find shelters near me
const findNearbyLocations = async (lat:number, long:number) => {
    try {
        const response = await axios.get(GEOCODE_BASE,
            {params:{
                id: env.MELISSA_LICENSE_KEY,
                lat: lat,
                long: long,
                opt: "IncludeApartments:on"
            }}
        );
        return JSON.parse(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
}

export default {findNearbyLocations, getLocation};