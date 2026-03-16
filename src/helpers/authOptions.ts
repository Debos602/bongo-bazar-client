import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            image?: string;
            role: string;
            accessToken: string;
        };
    }
    interface User {
        id: string;
        email: string;
        name: string;
        image?: string;
        role: string;
        accessToken: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            // ✅ এখানে বসবে
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const result = await res.json();
                    if (!res.ok || !result.success) return null;

                    // ✅ Cookie থেকে accessToken বের করো
                    const setCookieHeader = res.headers.get("set-cookie");
                    console.log("Cookies >>>", setCookieHeader);

                    const accessToken = setCookieHeader
                        ?.split(";")
                        .find((c) => c.trim().startsWith("accessToken="))
                        ?.split("=")[1];

                    console.log("AccessToken >>>", accessToken);

                    if (!accessToken) return null;

                    // ✅ Token দিয়ে user info আনো
                    const profileRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            Cookie: `accessToken=${accessToken}`, // backend cookie based হলে
                        },
                    });

                    const profile = await profileRes.json();
                    console.log("Profile >>>", profile);

                    const userData = profile?.data ?? profile;

                    if (!userData?.id) return null;

                    return {
                        id: String(userData.id),
                        email: userData.email,
                        name: userData.name,
                        image: userData.image ?? null,
                        role: userData.role,
                        // ✅ token ও save করো পরে use করতে
                        accessToken,
                    };

                } catch (err) {
                    console.error("Error:", err);
                    return null;
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            console.log("token", token);
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.accessToken; // ✅ JWT এ আছে (server only)
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                // ❌ accessToken session এ দিও না — client এ যাবে
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
};