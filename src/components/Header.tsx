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
                        <Image src="/logo.png" alt="라온동행교회 로고" width={48} height={48} className="logo-img" />
                        <h1><span>기독교 대한성결교회</span>라온동행교회</h1>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <div className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {/* Mobile Menu Content (if you need one, currently hidden in desktop styles but visible in mobile if 'active') */}
                    <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                        <li><Link href="/#about" onClick={closeMenu}>우리교회</Link></li>
                        <li><Link href="/#worship" onClick={closeMenu}>예배안내</Link></li>
                        <li><Link href="/#archive" onClick={closeMenu}>자료실</Link></li>
                        <li><Link href="/#contact" onClick={closeMenu}>오시는길</Link></li>
                        <li><Link href="/notice" onClick={closeMenu}>교회소식</Link></li>
                        <li><Link href="/bulletin" onClick={closeMenu}>주보</Link></li>
                        <li><Link href="/gallery" onClick={closeMenu}>사진첩</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
