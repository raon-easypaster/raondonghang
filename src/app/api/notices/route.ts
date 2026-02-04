import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, content } = await request.json();

        if (!title || !content) {
            return NextResponse.json(
                { message: "제목과 내용을 입력해주세요." },
                { status: 400 }
            );
        }

        // Insert into DB
        await sql`
      INSERT INTO notices (title, content)
      VALUES (${title}, ${content});
    `;

        return NextResponse.json({ message: "Success" }, { status: 201 });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { message: "데이터베이스 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}
