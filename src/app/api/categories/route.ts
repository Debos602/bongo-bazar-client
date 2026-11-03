import { NextResponse } from "next/server";

export async function GET() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_API;

  if (!apiBaseUrl) {
    return NextResponse.json(
      { success: false, message: "Category API is not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${apiBaseUrl}/category`, {
      cache: "no-store",
    });
    // An error page or proxy may not send JSON; keep its status instead of hiding it.
    const body = await response.json().catch(() => ({
      success: false,
      message: `Category API replied with status ${response.status}`,
    }));

    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error("Category proxy error:", error);
    return NextResponse.json(
      { success: false, message: `Cannot reach the API at ${apiBaseUrl}. Is the server running?` },
      { status: 502 }
    );
  }
}
