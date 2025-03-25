import axios, {AxiosInstance} from "axios";

const axiosService: AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/client/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export default axiosService;
