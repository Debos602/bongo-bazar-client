// src/lib/axiosInstance.ts
import axios from "axios";
import { getServerSession } from "next-auth"; // ✅ works on both server + client
import { authOptions } from "@/helpers/authOptions";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
    const session = await getServerSession(authOptions); // ✅ safe for Server Actions

    console.log("instance-server-token", session);

    const token = (session?.user as any)?.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;