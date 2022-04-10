import axios from "axios";

const baseAxios = axios.create({
    baseURL: "http://localhost:3000/api",
});

export default baseAxios;