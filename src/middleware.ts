import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth(async request => {
    if (!request.auth) {
        return
    }

    if (request.auth.error === "TokenExpired" &&
        !request.nextUrl.pathname.startsWith("/login") &&
        !request.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
})
