import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized({ token, req }) {
            const path = req.nextUrl.pathname;

            // ✅ dashboard শুধু admin দেখতে পারবে
            if (path.startsWith("/dashboard")) {
                return token?.role === "ADMIN";
            }

            // ✅ cart এ login থাকলেই হবে
            if (path.startsWith("/cart")) {
                return !!token;
            }

            return true;
        }
    }
});

export const config = {
    matcher: ["/dashboard", "/cart"]
};
;