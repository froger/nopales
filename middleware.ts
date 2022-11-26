export { default } from "next-auth/middleware";

export const config = { matcher: ["/proposals/:path*", "/dashboard/:path*"] };
