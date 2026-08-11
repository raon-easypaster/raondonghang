import Link from "next/link";
import { getNoticePosts } from "@/app/actions";

// Force dynamic rendering so we always get the latest notices
export const dynamic = "force-dynamic";

export default async function NoticePage() {
    const notices = await getNoticePosts();

    return (
        <main className="container" style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "80vh" }}>
            <div className="fade-up visible">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                    <h1 className="section-title" style={{ marginBottom: 0 }}>교회소식</h1>
                    
                    <a href="https://blog.naver.com/galeb76" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: "0.9rem", padding: "10px 20px" }}>
                        블로그 바로가기
                    </a>
                </div>

                {notices.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "var(--gray-500)" }}>
                        <p style={{ marginBottom: "16px" }}>등록된 교회소식이 없습니다.</p>
                        <p style={{ fontSize: "0.9rem", color: "var(--gray-400)" }}>* 네이버 블로그에 '교회소식' 카테고리로 글을 작성하시면 이곳에 자동으로 나타납니다.</p>
                    </div>
                ) : (
                    <div className="notice-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                        {notices.map((notice, index) => (
                            <a href={notice.link} target="_blank" rel="noopener noreferrer" key={index} className="blog-card" style={{
                                backgroundColor: "white",
                                padding: "24px",
                                borderRadius: "16px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                textDecoration: "none",
                                color: "inherit",
                                display: "flex",
                                flexDirection: "column",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease"
                            }}>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-main)" }}>
                                    {notice.title}
                                </h3>
                                <p style={{ fontSize: "0.95rem", color: "var(--gray)", lineHeight: "1.6", marginBottom: "20px", flexGrow: 1, whiteSpace: "pre-wrap" }}>
                                    {notice.description}
                                </p>
                                <span style={{ fontSize: "0.85rem", color: "var(--accent-mid)", fontWeight: "600" }}>
                                    {notice.pubDate}
                                </span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
