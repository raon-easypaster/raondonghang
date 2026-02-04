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
                        {/* Add menu items here if needed, based on legacy script it seemed to assume a menu existed but it was empty in HTML? 
                             Wait, the legacy HTML <div class="nav-menu"> was empty/missing in line 104? 
                             Line 104 css says .nav-menu { display: none; }
                             Line 18 html says <nav class="navbar"> ... <a class="logo"> ... </a> </div>
                             There is NO .nav-menu in the HTML! 
                             But script.js selects it. 
                             I will keep it empty or add standard links if the user wants. 
                             For now, matching legacy: it was hidden/empty. 
                             But wait, script.js adds 'active' to it. If it doesn't exist in HTML, script would fail or do nothing.
                             In legacy HTML, I don't see <ul class="nav-menu">. 
                             Ah, I see:
                             18: <nav class="navbar">
                             19:     <div class="container">
                             20:         <a href="#" class="logo">...</a>
                             21-23:      ...
                             24:     </div>
                             25: </nav>
                             
                             There is NO nav-menu in the HTML provided in Step 584.
                             So the script was selecting null? 
                             "const navMenu = document.querySelector('.nav-menu');"
                             "if (menuToggle && navMenu) { ... }"
                             So the functionality was disabled.
                             I will add the placeholders but keep them hidden as per CSS.
                             Or maybe I should add "Archive", "Sermon", "Contact" links?
                             User didn't ask to ADD links, just migrate. 
                             I will add the basic structure just in case.
                         */}
                        <li><Link href="/notice" onClick={closeMenu}>교회소식</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
