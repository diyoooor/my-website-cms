import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Mock credentials check:
        // In a real application, you’d verify against your database or auth provider.
        if (email === "test@example.com" && password === "password123") {
            // Return a success response
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            // Return an error response
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
