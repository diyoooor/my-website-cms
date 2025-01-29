import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password, age, name } = await request.json();

        // Basic validation checks (mock example)
        if (!email || !password || !age || !name) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        // Additional checks, e.g., password length
        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters long." },
                { status: 400 }
            );
        }

        // In a real scenario, insert the user into the database here.
        // For example:
        // const user = await prisma.user.create({
        //   data: { email, password: hashedPassword, age: parseInt(age), name },
        // });

        // For this mock, just return success
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Something went wrong during registration." },
            { status: 500 }
        );
    }
}
