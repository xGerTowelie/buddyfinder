import { NextResponse } from "next/server"
import { auth, BASE_PATH } from "./auth"

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}

// this method gets called on requests,
// that match the exported config
export default auth((req) => {
    const url = new URL(req.url)

    if (url.pathname === '/signin') {
        return NextResponse.next()
    }

    if (url.pathname === '/signup') {
        return NextResponse.next()
    }

    // ignore for "home" page
    if (!req.auth && url?.pathname !== "/") {

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
