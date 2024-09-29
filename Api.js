// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust based on your backend's URL

export const startCoupons = async () => {
    try {
        const response = await axios.post(`${API_URL}/start-coupons`);
        return response.data;
    } catch (error) {
        console.error('Error starting coupons:', error);
        throw error;
    }
};

export const stopCoupons = async () => {
    try {
        const response = await axios.post(`${API_URL}/stop-coupons`);
        return response.data;
    } catch (error) {
        console.error('Error stopping coupons:', error);
        throw error;
    }
};