import axios from "axios";
import { BASE_URL } from "./constants"; // Assurez-vous que BASE_URL pointe vers l'adresse de votre backend

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
