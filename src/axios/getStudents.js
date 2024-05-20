import api from "./api";

export const getStudents = async () => {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.get("/student", { headers });
        return response.data;
    } catch (error) {
        return error
    }
};