"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NoticeActions({ id }: { id: number }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        const password = prompt("관리자 비밀번호를 입력하세요:");
        if (!password) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/notices/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                alert("삭제되었습니다.");
                router.refresh();
            } else {
                const error = await res.json();
                alert("삭제 실패: " + error.message);
            }
        } catch (err) {
            console.error(err);
            alert("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
            <Link
                href={`/notice/edit/${id}`}
                style={{
                    fontSize: "0.8rem",
                    padding: "4px 8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    color: "#555",
                }}
            >
                수정
            </Link>
            <button
                onClick={handleDelete}
                disabled={loading}
                style={{
                    fontSize: "0.8rem",
                    padding: "4px 8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    color: "#e53e3e",
                    background: "none",
                    cursor: "pointer",
                }}
            >
                {loading ? "..." : "삭제"}
            </button>
        </div>
    );
}
