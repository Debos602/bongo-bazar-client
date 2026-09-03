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
    const body = await response.json();

    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    console.error("Category proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch categories" },
      { status: 502 }
    );
  }
}
