"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/notices/${id}`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setTitle(data.title);
                setContent(data.content);
            } catch (err) {
                console.error(err);
                alert("게시글을 불러올 수 없습니다.");
                router.push("/notice");
            } finally {
                setFetching(false);
            }
        };

        fetchData();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/notices/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, password }),
            });

            if (res.ok) {
                alert("수정되었습니다.");
                router.push("/notice");
                router.refresh();
            } else {
                const error = await res.json();
                alert("수정 실패: " + error.message);
            }
        } catch (err) {
            console.error(err);
            alert("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="container" style={{ paddingTop: "120px" }}>로딩 중...</div>;

    return (
        <main className="container" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
            <h1 className="section-title">교회소식 수정</h1>

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
                    <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "4px" }}>* 수정하려면 관리자 비밀번호가 필요합니다.</p>
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
                    />
                </div>

                <div style={{ textAlign: "right", gap: "12px", display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" onClick={() => router.back()} className="btn btn-secondary">
                        취소
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "수정 중..." : "수정하기"}
                    </button>
                </div>
            </form>
        </main>
    );
}
