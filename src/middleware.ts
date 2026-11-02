import { withAuth } from "next-auth/middleware";

// Signing in is required here; each dashboard's layout checks the role against the API.
export default withAuth({
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    matcher: ["/dashboard/:path*"],
};
