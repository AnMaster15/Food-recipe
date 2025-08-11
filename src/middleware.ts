// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For now, allow access to recipes without authentication
  // You can add authentication logic here later if needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboards/:path*', '/recipes/:path*'], // Add other protected routes here
};
