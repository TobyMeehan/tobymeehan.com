import { signIn } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams

    await signIn("thavyra", { redirectTo: params.get("callbackUrl") ?? undefined })
}