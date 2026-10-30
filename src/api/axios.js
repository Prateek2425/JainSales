import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api", // Replace with your API base URL
    timeout: 15000, //15 sec timeout
    headers: {
        "Content-Type": "application/json",
    },
});


axiosInstance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers.Accept = "application/json";
        // console.log("API Request");
        // console.log(config.method);
        // console.log(config.url);
        return config;
    },

    error => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
    response => {
        // console.log("Success");
        // console.log(response.data);
        return response;
    },
    async error => {

        return Promise.reject(error);
    }

);

export default axiosInstance;