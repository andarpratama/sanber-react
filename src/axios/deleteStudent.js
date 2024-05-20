import api from "./api";

export const deleteStudent = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await api.delete("/student/" + id, { headers });
        return response.data;
    } catch (error) {
        return error
    }
};