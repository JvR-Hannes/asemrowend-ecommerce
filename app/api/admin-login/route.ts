import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { password } = await req.json();

    if (password === process.env.ADMIN_SECRET) {
        const res = NextResponse.json({ ok: true });

        res.cookies.set("admin-auth", process.env.ADMIN_SECRET!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        return res;
    }

    return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
    );
}