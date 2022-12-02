import axios from "axios";
import { GEO_LOCATION_VENDOR } from "./constants";

export const getGeolocation = (ipAddress) => {
  try {
    return axios.get(
      `${GEO_LOCATION_VENDOR.URL}${ipAddress}?access_key=${GEO_LOCATION_VENDOR.API_KEY}`
    );
  } catch (error) {
    console.error(error);
  }
};
