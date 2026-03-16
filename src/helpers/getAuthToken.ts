"use server";

import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export const getAuthToken = async () => {
    const cookieStore = await cookies();

    const sessionToken =
        cookieStore.get("next-auth.session-token")?.value ??
        cookieStore.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) return null;

    const token = await getToken({
        req: {
            cookies: {
                "next-auth.session-token": sessionToken,
                "__Secure-next-auth.session-token": sessionToken,
            },
            headers: {},
        } as any,
        secret: process.env.NEXTAUTH_SECRET!,
    });

    console.log("accessToken from JWT >>>", token?.accessToken);
    return (token?.accessToken as string) ?? null;
};