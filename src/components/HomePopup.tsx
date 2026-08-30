"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [dontShowToday, setDontShowToday] = useState(false);
    const [links, setLinks] = useState({
        infographic: "https://raon-easypaster.github.io/infographic/",
        weekly: "https://raon-easypaster.github.io/weekly/",
        daily: "https://raon-easypaster.github.io/daily/", // Daily URL structure is complex (bible book), linking to index for safety
        share: "https://raon-easypaster.github.io/share/"
    });

    useEffect(() => {
        // Calculate dynamic links
        const calculateLinks = async () => {
            let infographicLink = "https://raon-easypaster.github.io/infographic/";
            let weeklyLink = "https://raon-easypaster.github.io/weekly/";
            let dailyLink = "https://raon-easypaster.github.io/daily/";
            let shareLink = "https://raon-easypaster.github.io/share/";

            // Helper: fetch archiveData.js and extract the first entry's URL
            const getLatestFromArchiveData = async (
                baseUrl: string,
                urlField: string
            ): Promise<string | null> => {
                try {
                    const response = await fetch(`${baseUrl}data/archiveData.js`);
                    const text = await response.text();
                    // Extract the JSON array from the JS file
                    const match = text.match(/window\.ARCHIVE_DATA\s*=\s*(\[[\s\S]*?\]);/);
                    if (!match) return null;
                    const data = JSON.parse(match[1]);
                    if (!Array.isArray(data) || data.length === 0) return null;
                    const relUrl = data[0][urlField];
                    if (!relUrl) return null;
                    return `${baseUrl}${relUrl}`;
                } catch (e) {
                    console.error(`Failed to fetch archiveData from ${baseUrl}:`, e);
                    return null;
                }
            };

            // 인포그래픽: get latest from archiveData.js (field: relativeURL)
            const latestInfographic = await getLatestFromArchiveData(
                "https://raon-easypaster.github.io/infographic/",
                "relativeURL"
            );
            if (latestInfographic) infographicLink = latestInfographic;

            // 주간묵상집: get latest from archiveData.js (field: url)
            const latestWeekly = await getLatestFromArchiveData(
                "https://raon-easypaster.github.io/weekly/",
                "url"
            );
            if (latestWeekly) weeklyLink = latestWeekly;

            // 매일성경묵상: find closest past date from index page cards
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const response = await fetch("https://raon-easypaster.github.io/daily/");
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, "text/html");

                const cardLinks = Array.from(doc.querySelectorAll("a.card"));
                const posts = cardLinks.map(link => {
                    const href = (link as HTMLAnchorElement).getAttribute("href");
                    if (!href) return null;
                    const match = href.match(/(\d{4}-\d{2}-\d{2})/);
                    if (!match) return null;
                    const date = new Date(match[1]);
                    date.setHours(0, 0, 0, 0);
                    const fullHref = href.startsWith("http") ? href : new URL(href, "https://raon-easypaster.github.io/daily/").href;
                    return { href: fullHref, date };
                }).filter(item => item !== null) as { href: string, date: Date }[];

                posts.sort((a, b) => b.date.getTime() - a.date.getTime());
                const targetPost = posts.find(post => post.date <= today);
                if (targetPost) {
                    dailyLink = targetPost.href;
                } else if (posts.length > 0) {
                    dailyLink = posts[0].href;
                }
            } catch (e) {
                console.error("Failed to fetch daily index:", e);
            }

            setLinks({
                infographic: infographicLink,
                weekly: weeklyLink,
                daily: dailyLink,
                share: shareLink
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
                        href="/bulletin"
                        className="popup-link-item popup-link-featured"
                    >
                        <span className="icon">📰</span>
                        <span className="text">가장 최근 주보 보기 <small>이번 주 예배 순서와 교회 소식</small></span>
                        <span className="popup-link-arrow" aria-hidden="true">→</span>
                    </Link>
                    <Link
                        href={links.infographic}
                        target="_blank"
                        className="popup-link-item"
                    >
                        <span className="icon">🎨</span>
                        <span className="text">설교 인포그래픽 <small>주일 말씀 정리</small></span>
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
                    <Link
                        href={links.share}
                        target="_blank"
                        className="popup-link-item"
                    >
                        <span className="icon">🤝</span>
                        <span className="text">소그룹나눔 <small>삶을 나누는 시간</small></span>
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
