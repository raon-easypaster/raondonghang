"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/notices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, password }),
            });

            if (res.ok) {
                alert("교회소식이 등록되었습니다.");
                router.push("/notice");
                router.refresh();
            } else {
                const error = await res.json();
                alert("등록 실패: " + error.message);
            }
        } catch (err) {
            console.error(err);
            alert("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
            <h1 className="section-title">교회소식 작성</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: "720px", margin: "0 auto" }}>
                <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>관리자 비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            fontSize: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #ddd"
                        }}
                        placeholder="관리자 비밀번호를 입력하세요"
                    />
                    <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "4px" }}>* 관리자만 작성할 수 있습니다.</p>
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            fontSize: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #ddd"
                        }}
                        placeholder="제목을 입력하세요"
                    />
                </div>

                <div style={{ marginBottom: "32px" }}>
                    <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            minHeight: "300px",
                            fontSize: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            fontFamily: "inherit"
                        }}
                        placeholder="내용을 입력하세요"
                    />
                </div>

                <div style={{ textAlign: "right", gap: "12px", display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" onClick={() => router.back()} className="btn btn-secondary">
                        취소
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "등록 중..." : "등록하기"}
                    </button>
                </div>
            </form>
        </main>
    );
}
