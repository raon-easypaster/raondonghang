"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [dontShowToday, setDontShowToday] = useState(false);
    const [links, setLinks] = useState({
        infographic: "https://raon-easypaster.github.io/infographic/",
        weekly: "https://raon-easypaster.github.io/weekly/",
        daily: "https://raon-easypaster.github.io/daily/" // Daily URL structure is complex (bible book), linking to index for safety
    });

    useEffect(() => {
        // Calculate dynamic links
        const calculateLinks = async () => {
            const now = new Date();
            const dayCallback = now.getDay(); // 0 is Sunday
            const diff = now.getDate() - dayCallback; // Last Sunday
            const lastSunday = new Date(now.setDate(diff));

            const yyyy = lastSunday.getFullYear().toString();
            const yy = yyyy.substring(2);
            const mm = (lastSunday.getMonth() + 1).toString().padStart(2, '0');
            const dd = lastSunday.getDate().toString().padStart(2, '0');

            const dateStr = `${yy}${mm}${dd}`; // e.g. 260215

            let dailyLink = "https://raon-easypaster.github.io/daily/";

            // Try to find today's daily meditation or fallback to latest
            try {
                const today = new Date();
                const todayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

                // Fetch the daily index page
                // Note: We use a simple fetch here. CORS might be an issue in dev, but GitHub Pages to GitHub Pages usually works or needs proxy.
                // Since this runs on client, we might face CORS if the easy-paster repo doesn't allow it. 
                // However, for a user request, we will try to implement a best-effort logic.
                // Actually, client-side fetching of external HTML often fails due to CORS.
                // A safer approach without a backend proxy is to blindly link to "latest" if we can't check.
                // But the user specifically asked for "Today if exists, else Latest".
                // Since we can't easily scrape on client due to CORS, we will try a different specific approach:
                // We will assume standard naming convention validation is not possible without CORS.
                // BUT, if the user allows, we can try to "ping" the predicted URL for today.
                // Predicting the URL is hard because of the "bible book" part (e.g. /genesis/).
                // So we MUST rely on parsing the index page.

                const response = await fetch("https://raon-easypaster.github.io/daily/");
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, "text/html");

                // 1. Try to find a link with today's date
                // The cards usually have the date in title or link
                // Let's look for hrefs containing today's date string
                const specificLink = doc.querySelector(`a[href*="${todayStr}"]`);

                if (specificLink) {
                    dailyLink = (specificLink as HTMLAnchorElement).href;
                    // If relative URL, make it absolute
                    if (!dailyLink.startsWith("http")) {
                        dailyLink = new URL(dailyLink, "https://raon-easypaster.github.io/daily/").href;
                    }
                } else {
                    // 2. Fallback to the first card (latest)
                    const latestCard = doc.querySelector(".card");
                    if (latestCard) {
                        let latestHref = (latestCard as HTMLAnchorElement).getAttribute("href");
                        if (latestHref) {
                            if (!latestHref.startsWith("http")) {
                                dailyLink = new URL(latestHref, "https://raon-easypaster.github.io/daily/").href;
                            } else {
                                dailyLink = latestHref;
                            }
                        }
                    }
                }
            } catch (e) {
                console.error("Failed to fetch daily index:", e);
                // Fallback is already set to index page
            }

            setLinks({
                infographic: `https://raon-easypaster.github.io/infographic/${yyyy}/${dateStr}info.html`,
                weekly: `https://raon-easypaster.github.io/weekly/${yyyy}/${dateStr}daily.html`,
                daily: dailyLink
            });
        };

        calculateLinks();

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
                    <h3>주일 말씀을 되새겨요</h3>
                    <button onClick={handleClose} className="popup-close-btn">
                        ✕
                    </button>
                </div>
                <div className="popup-body">
                    <Link
                        href={links.infographic}
                        target="_blank"
                        className="popup-link-item"
                    >
                        <span className="icon">🎨</span>
                        <span className="text">설교 인포그래픽 <small>최신자료</small></span>
                    </Link>
                    <Link
                        href={links.weekly}
                        target="_blank"
                        className="popup-link-item"
                    >
                        <span className="icon">📖</span>
                        <span className="text">주간묵상집 <small>말씀이 삶이 되는 순간</small></span>
                    </Link>
                    <Link
                        href={links.daily}
                        target="_blank"
                        className="popup-link-item"
                    >
                        <span className="icon">🙏</span>
                        <span className="text">매일성경묵상 <small>말씀과 동행하는 삶</small></span>
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
