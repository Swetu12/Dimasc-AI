import {NextRequest, NextResponse} from "next/server";

const publicRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth")?.value;

    const isPublic = publicRoutes.some(
        (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(`${route}/`),
    )

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|static|favicon.ico).*)"],
}