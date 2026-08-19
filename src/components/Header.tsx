"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header style={{ boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none" }}>
            <nav className="navbar">
                <div className="container">
                    <Link href="/" className="logo" onClick={closeMenu}>
                        <Image src="/logo-new.png" alt="라온동행교회 로고" width={90} height={60} className="logo-img" style={{ objectFit: "contain" }} />
                        <h1><span>기독교 대한성결교회</span>라온동행교회</h1>
                    </Link>

                    <button
                        type="button"
                        className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                        aria-expanded={isMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                        <li><Link href="/#worship" onClick={closeMenu}>예배안내</Link></li>
                        <li><Link href="/#new-here" onClick={closeMenu}>처음 오셨나요?</Link></li>
                        <li><Link href="/#identity" onClick={closeMenu}>우리교회</Link></li>
                        <li><Link href="/#word" onClick={closeMenu}>이번 주 말씀</Link></li>
                        <li><Link href="/notice" onClick={closeMenu}>교회소식</Link></li>
                        <li><Link href="/bulletin" onClick={closeMenu}>주보</Link></li>
                        <li><Link href="/gallery" onClick={closeMenu}>사진첩</Link></li>
                        <li><Link href="/#directions" onClick={closeMenu}>오시는 길</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
