import { sql } from "@vercel/postgres";
import Link from "next/link";

// Force dynamic rendering so we always get the latest notices
export const dynamic = "force-dynamic";

export default async function NoticePage() {
    let notices: any[] = [];
    let error: string | null = null;

    try {
        // Attempt to fetch notices
        // This will fail if the table doesn't exist or DB is not connected
        const result = await sql`SELECT * FROM notices ORDER BY created_at DESC`;
        notices = result.rows;
    } catch (e) {
        console.error("Database Error:", e);
        // If table doesn't exist, we might treat it as empty list but log error
        error = "데이터베이스 연결이 설정되지 않았거나 'notices' 테이블이 없습니다.";
    }

    return (
        <main className="container" style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "80vh" }}>
            <div className="fade-up visible">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                    <h1 className="section-title" style={{ marginBottom: 0 }}>교회소식</h1>

                    {/* 임시 글쓰기 버튼 (나중에 권한 처리 필요) */}
                    <Link href="/notice/write" className="btn btn-secondary" style={{ fontSize: "0.9rem", padding: "10px 20px" }}>
                        글쓰기
                    </Link>
                </div>

                {error ? (
                    <div style={{ padding: "40px", backgroundColor: "#fff5f5", borderRadius: "12px", color: "#e53e3e" }}>
                        <h3 style={{ marginBottom: "12px" }}>시스템 메시지</h3>
                        <p>{error}</p>
                        <p style={{ marginTop: "12px", fontSize: "0.9rem", color: "#666" }}>
                            * Vercel 대시보드에서 Postgres 데이터베이스를 연결하고 Schema를 생성해주세요.
                        </p>
                    </div>
                ) : notices.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "var(--gray-500)" }}>
                        등록된 소식이 없습니다.
                    </div>
                ) : (
                    <div className="notice-list">
                        {notices.map((notice) => (
                            <div key={notice.id} className="notice-item" style={{
                                padding: "24px 0",
                                borderBottom: "1px solid rgba(0,0,0,0.06)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "8px" }}>
                                        {notice.title}
                                    </h3>
                                    <p style={{ fontSize: "0.95rem", color: "var(--gray-700)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                        {notice.content}
                                    </p>
                                    <span style={{ fontSize: "0.85rem", color: "var(--gray-500)", marginTop: "8px", display: "inline-block" }}>
                                        {new Date(notice.created_at).toLocaleDateString("ko-KR")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
