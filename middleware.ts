export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/g/proposals/:path*", "/dashboard", "/g/drafts/:path*", "/g"],
};
