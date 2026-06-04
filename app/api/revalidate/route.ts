import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "Revalidation not configured" },
      { status: 501 },
    );
  }

  const headerSecret = request.headers.get("x-sanity-secret");
  if (headerSecret !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/properties/developed", "layout");
  revalidatePath("/properties/developing", "layout");
  revalidatePath("/properties/shortlet", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
