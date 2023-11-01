import axios from "axios";
import baseUrl from "../utils/baseUrl";

export const createNewComment = async ({ token, desc, slug, parent, replyOnUser }) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post(`${baseUrl}comments/`, { desc, slug, parent, replyOnUser }, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const updateComment = async ({ token, desc, commentId }) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${baseUrl}comments/${commentId}`, { desc }, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const updateCommentByAdmin = async ({ token, updatedData, commentId }) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${baseUrl}comments/admin/${commentId}`, { updatedData }, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const deleteComment = async ({ token, commentId }) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`${baseUrl}comments/${commentId}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const getAllComments = async (searchKeyword = "", page = 1, limit = 1) => {
    try {
        const { data } = await axios.get(`${baseUrl}comments?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`);
        return { data };
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};