import { withAuth } from "next-auth/middleware";

export default withAuth({

    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ token, req }) {
            const path = req.nextUrl.pathname;

            if (path.startsWith("/dashboard")) {
                return token?.role === "ADMIN";
            }

            return true;
        }
    }
});

export const config = {
    matcher: ["/dashboard/:path*"]
};