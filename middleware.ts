import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");

  const USER = "fiesta";
  const PASS = "fiesta";

  if (!auth) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area", charset="UTF-8"',
      },
    });
  }

  const [type, credentials] = auth.split(" ");
  if (type !== "Basic") {
    return new NextResponse("Invalid auth", { status: 401 });
  }

  const decoded = atob(credentials);
  const [user, pass] = decoded.split(":");

  if (user !== USER || pass !== PASS) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}
