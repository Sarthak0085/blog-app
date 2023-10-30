import axios from "axios";
import baseUrl from "../utils/baseUrl";

export const getAllPosts = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}posts/`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({slug}) => {
    try {
        const { data } = await axios.get(`${baseUrl}posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

