import { NextResponse } from "next/server"
import { auth, BASE_PATH } from "./auth"

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}

export default auth((req) => {
    const url = new URL(req.url)

    if (url.pathname === '/signin') {
        return NextResponse.next()
    }

    if (url.pathname === '/signup') {
        return NextResponse.next()
    }

    if (url.pathname === '/') {
        if (req.auth) {
            return NextResponse.redirect(
                new URL(
                    "profile",
                    req.url
                )
            )
        } else {
            return NextResponse.next()
        }
    }
    // ignore for "home" page
    if (!req.auth) {

        // redirect to login with dynamic callback url
        return NextResponse.redirect(
            new URL(
                `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
                    url?.pathname
                )}`,
                req.url
            )
        )
    }
})
