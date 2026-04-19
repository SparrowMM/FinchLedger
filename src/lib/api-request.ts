import { NextResponse } from "next/server";
import { ZodError, type ZodSchema } from "zod";

export async function parseJsonWithSchema<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "请求体格式错误，应为 JSON。" },
        { status: 400 }
      ),
    };
  }

  try {
    const data = schema.parse(raw);
    return { ok: true, data };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        ok: false,
        response: NextResponse.json(
          {
            error: "请求参数校验失败。",
            details: error.issues.map((item) => ({
              path: item.path.join("."),
              message: item.message,
            })),
          },
          { status: 400 }
        ),
      };
    }

    return {
      ok: false,
      response: NextResponse.json({ error: "请求参数校验失败。" }, { status: 400 }),
    };
  }
}
