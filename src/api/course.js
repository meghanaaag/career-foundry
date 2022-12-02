import  axios from "axios";
import { DOMAIN, apiRoutes } from "./constants";

const getCourses = async () => {
  try {
    return axios.get(`${DOMAIN}${apiRoutes.GET_COURSES}`);
  } catch (error) {
    console.error(error);
  }
};

const getCourseDetails = async (courseSlug) => {
  try {
    return await axios.get(
      `${DOMAIN}${apiRoutes.GET_COURSE_DETAILS}${courseSlug}`
    );
  } catch (error) {
    console.error(error);
  }
};

export { getCourses, getCourseDetails };
