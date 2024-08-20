import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api/developer/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getDeveloperList = async (path, page = 1, limit = 10) => {
    try {
        const response = await apiClient.get(path, {
            params: {
                page: page,
                limit: limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching developer list:', error);
        throw error;
    }
};