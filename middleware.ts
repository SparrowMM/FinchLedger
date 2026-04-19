import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const BASIC_AUTH_CREDENTIALS = process.env.FINCHLEDGER_BASIC_AUTH?.trim();
const API_WRITE_LIMIT = Number(process.env.FINCHLEDGER_API_WRITE_LIMIT ?? "60");
const API_WRITE_WINDOW_MS = Number(
  process.env.FINCHLEDGER_API_WRITE_WINDOW_MS ?? "60000"
);

type RateLimitEntry = { count: number; windowStart: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

function unauthorizedResponse(request: NextRequest) {
  const isApi = request.nextUrl.pathname.startsWith("/api/");
  if (isApi) {
    return NextResponse.json(
      { error: "未授权访问，请先通过认证。" },
      {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="FinchLedger"' },
      }
    );
  }

  return new NextResponse("Authentication Required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="FinchLedger"' },
  });
}

function checkBasicAuth(request: NextRequest): boolean {
  if (!BASIC_AUTH_CREDENTIALS) return true;
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) return false;

  const expected = `Basic ${btoa(BASIC_AUTH_CREDENTIALS)}`;
  return authHeader === expected;
}

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https:; font-src 'self' data:;"
  );
}

function enforceApiWriteRateLimit(request: NextRequest): NextResponse | null {
  const isApi = request.nextUrl.pathname.startsWith("/api/");
  const isWriteMethod = ["POST", "PUT", "PATCH", "DELETE"].includes(
    request.method
  );
  if (!isApi || !isWriteMethod) return null;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now - entry.windowStart > API_WRITE_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return null;
  }

  entry.count += 1;
  if (entry.count > API_WRITE_LIMIT) {
    return NextResponse.json(
      { error: "请求过于频繁，请稍后再试。" },
      { status: 429 }
    );
  }

  return null;
}

export async function middleware(request: NextRequest) {
  if (!checkBasicAuth(request)) {
    return unauthorizedResponse(request);
  }

  const rateLimitResponse = enforceApiWriteRateLimit(request);
  if (rateLimitResponse) {
    applySecurityHeaders(rateLimitResponse);
    return rateLimitResponse;
  }

  const response = await updateSession(request);
  applySecurityHeaders(response);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
