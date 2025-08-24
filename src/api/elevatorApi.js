// elevatorApi.js
import axios from "axios";

const API_BASE = "https://elevatory-backend.onrender.com/api/elevators";

// Get all elevators
export async function getAllElevators() {
    const res = await axios.get(API_BASE);
    return res.data;
}

// Start elevator
export async function startElevator(id) {
    return axios.post(`${API_BASE}/${id}/start`);
}

// Stop elevator
export async function stopElevator(id) {
    return axios.post(`${API_BASE}/${id}/stop`);
}

// Call elevator to floor
export async function callElevator(id, floor) {
    return axios.post(`${API_BASE}/${id}/call`, { floor });
}
