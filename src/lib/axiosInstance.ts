import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

axiosInstance.interceptors.request.use(async (config) => {
    const session = await getServerSession(authOptions);

    const token = session?.user?.accessToken; // ✅ no any

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;