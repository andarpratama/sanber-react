import api from "./api";

export const createStudent = async (body) => {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.post("/student", body, { headers });
        return response.data;
    } catch (error) {
        return error
    }
};