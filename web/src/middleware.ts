import { NextRequest, NextResponse } from "next/server";

const JSON_ROUTES = [
  { pattern: /^\/$/, target: "/api/storefront/index" },
  { pattern: /^\/categories$/, target: "/api/storefront/categories" },
  { pattern: /^\/categories\/([^/]+)$/, target: "/api/storefront/categories/$1" },
  { pattern: /^\/products\/([^/]+)$/, target: "/api/storefront/products/$1" },
  { pattern: /^\/blogs$/, target: "/api/storefront/blogs" },
  { pattern: /^\/blogs\/([^/]+)$/, target: "/api/storefront/blogs/$1" },
  { pattern: /^\/pages\/([^/]+)$/, target: "/api/storefront/pages/$1" },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.endsWith(".json")) {
    const stripped = pathname.slice(0, -".json".length) || "/";
    for (const { pattern, target } of JSON_ROUTES) {
      const match = stripped.match(pattern);
      if (match) {
        const rewritten = target.replace(/\$(\d+)/g, (_, i) => match[Number(i)] ?? "");
        const url = request.nextUrl.clone();
        url.pathname = rewritten;
        return NextResponse.rewrite(url);
      }
    }
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie =
      request.cookies.get("better-auth.session_token") ??
      request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const sessionRes = await fetch(
        new URL("/api/sessions", request.url).toString(),
        {
          headers: { cookie: request.headers.get("cookie") || "" },
        }
      );
      const session = await sessionRes.json();
      if (!session?.user) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next|favicon).*)"],
};
