import axios from "axios";
import baseUrl from "../utils/baseUrl";
// import baseUrl from "../utils/baseUrl";

export const signup = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post(`${baseUrl}auth/register`, {
      name,
        email,
      password
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post(`${baseUrl}auth/login`, {
        email,
      password
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getUserProfile = async ({ token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`${baseUrl}user/profile`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
    }
}

export const updateUserProfile = async ({ token, userData }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.put(`${baseUrl}user/update-profile`, userData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
    }
}

export const updateProfilePicture = async ({ token, formData }) => {
    try {
        const config = {
            headers: {
                "Content-Type":"multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.put(`${baseUrl}user/update-profile-picture`,
            formData,
            config
        );
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
    }
}