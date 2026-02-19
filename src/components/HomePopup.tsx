"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [dontShowToday, setDontShowToday] = useState(false);

    useEffect(() => {
        // Check localStorage on mount
        const hideUntil = localStorage.getItem("popupHideUntil");
        if (hideUntil) {
            const now = new Date();
            const hideDate = new Date(hideUntil);
            if (now < hideDate) {
                return; // Don't show if hidden
            }
        }
        // Show popup with a slight delay for better UX
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        if (dontShowToday) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0); // Reset to midnight of next day
            localStorage.setItem("popupHideUntil", tomorrow.toISOString());
        }
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content fade-up visible">
                <div className="popup-header">
                    <h3>최신 자료 바로가기</h3>
                    <button onClick={handleClose} className="popup-close-btn">
                        ✕
                    </button>
                </div>
                <div className="popup-body">
                    <Link
                        href="https://raon-easypaster.github.io/infographic/"
                        target="_blank"
                        className="popup-link-item"
                    >
                        <span className="icon">🎨</span>
                        <span className="text">설교 인포그래픽 <small>최신자료</small></span>
                    </Link>
                    <Link
                        href="https://raon-easypaster.github.io/weekly/"
                        target="_blank"
                        className="popup-link-item"
                    >
                        <span className="icon">📖</span>
                        <span className="text">주간묵상집 <small>이번주 말씀</small></span>
                    </Link>
                    <Link
                        href="https://raon-easypaster.github.io/daily/"
                        target="_blank"
                        className="popup-link-item"
                    >
                        <span className="icon">🙏</span>
                        <span className="text">매일성경묵상 <small>오늘의 묵상</small></span>
                    </Link>
                </div>
                <div className="popup-footer">
                    <label className="dont-show">
                        <input
                            type="checkbox"
                            checked={dontShowToday}
                            onChange={(e) => setDontShowToday(e.target.checked)}
                        />
                        오늘 하루 열지 않기
                    </label>
                </div>
            </div>
        </div>
    );
}
