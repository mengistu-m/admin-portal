import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/",
    "/home-builder/:path*",
    "/services/:path*",
    "/portfolio/:path*",
    "/testimonials/:path*",
    "/team/:path*",
    "/blog/:path*",
    "/careers/:path*",
    "/leads/:path*",
    "/settings/:path*"
  ],
};
