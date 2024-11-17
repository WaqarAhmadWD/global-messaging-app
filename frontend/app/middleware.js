import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("Authorization"); // Retrieve token from cookies
  const url = req.nextUrl.clone();

  // If no token and the path is '/', redirect to '/chat_request'
  if (!token && url.pathname === "/") {
    url.pathname = "/chat_request";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Proceed with the request
}
