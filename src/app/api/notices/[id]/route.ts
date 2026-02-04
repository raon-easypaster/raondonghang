import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await sql`SELECT * FROM notices WHERE id = ${id}`;

        if (result.rows.length === 0) {
            return NextResponse.json(
                { message: "Notice not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { message: "Database Error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { title, content, password } = await request.json();

        // Admin Password Verify
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword || password !== adminPassword) {
            return NextResponse.json(
                { message: "관리자 비밀번호가 일치하지 않습니다." },
                { status: 401 }
            );
        }

        await sql`
      UPDATE notices
      SET title = ${title}, content = ${content}
      WHERE id = ${id}
    `;

        return NextResponse.json({ message: "Updated successfully" });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { message: "Database Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { password } = await request.json();

        // Admin Password Verify
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword || password !== adminPassword) {
            return NextResponse.json(
                { message: "관리자 비밀번호가 일치하지 않습니다." },
                { status: 401 }
            );
        }

        await sql`DELETE FROM notices WHERE id = ${id}`;

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { message: "Database Error" },
            { status: 500 }
        );
    }
}
