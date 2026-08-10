"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HomePopup from "@/components/HomePopup";
import { getBlogPosts, BlogPost } from "./actions";

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch blog posts
    getBlogPosts().then(setBlogPosts);
    const fadeElements = document.querySelectorAll(".fade-up");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    fadeElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <main>
      <HomePopup />
      {/* Hero Section */}
      <section
        className="hero"
        id="hero"
        style={{ backgroundImage: "url('/church-photo1.jpg')" }}
      >
        <div className="container">
          <div className="hero-content fade-up">
            <span className="hero-eyebrow">RAON DONGHANG CHURCH</span>
            <h1 className="hero-title">
              즐거운 동행,
              <br />
              삶으로 드리는 신앙
            </h1>
            <p className="hero-subtitle">
              우리는 하나님과 함께 걷고,
              <br />
              사람과 함께 자라며,
              <br />
              세상 속으로 기쁨을 들고 나아갑니다.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="section with-bg"
        id="about"
        style={{ backgroundImage: "url('/church-photo2.jpg')" }}
      >
        <div className="container">
          <div className="fade-up">
            <h2 className="section-title">우리는 이런 교회입니다</h2>
            <div className="about-text">
              <h3
                className="about-heading"
                style={{ color: "var(--accent-mid)", marginBottom: "12px" }}
              >
                라온은 ‘즐거움’입니다.
              </h3>
              <p className="section-intro">
                가볍지 않은 기쁨,
                <br />
                혼자가 아니라 함께 걷기 때문에 가능한 즐거움입니다.
              </p>
            </div>
          </div>

          <div className="about-content fade-up">
            <div className="about-declaration">
              <p>
                우리는 하나님과 동행하는 교회입니다.
                <br />
                그래서 예배가 중심이 됩니다.
              </p>
              <p>
                우리는 성도와 동행하는 교회입니다.
                <br />
                그래서 혼자가 아닌 공동체로 신앙을 배웁니다.
              </p>
              <p>
                우리는 세상과 동행하는 교회입니다.
                <br />
                그래서 교회는 건물이 아니라 삶의 자리로 향합니다.
              </p>
            </div>

            <div className="pastor-quote">
              신앙은 붙들고,
              <br />
              신학은 질문하며,
              <br />
              삶은 현장에서 살아냅니다.
            </div>
          </div>
        </div>
      </section>

      {/* Worship Section */}
      <section
        className="section"
        id="worship"
        style={{ backgroundColor: "var(--bg-light)" }}
      >
        <div className="container fade-up">
          <h2 className="section-title">예배 안내</h2>
          <p className="section-intro" style={{ marginBottom: "48px" }}>
            예배는 주일에 시작되지만,
            <br />
            삶에서 완성됩니다.
          </p>

          <div className="worship-info">
            <div className="worship-card">
              <span className="time">주일 오전 10:00</span>
              <h3>주일 예배</h3>
              <p className="location">카페 라온트리 2층 (본당)</p>
              <p
                className="about-paragraph"
                style={{ fontSize: "0.95rem", marginTop: "12px" }}
              >
                온 가족이 함께 드리는
                <br />
                따뜻한 통합 예배입니다.
              </p>
            </div>

            <div className="worship-card">
              <span className="time">매주 금요일 저녁 07:00</span>
              <h3>금요 기도회</h3>
              <p className="location">카페 라온트리</p>
              <p
                className="about-paragraph"
                style={{ fontSize: "0.95rem", marginTop: "12px" }}
              >
                한 주간의 삶을 나누고
                <br />
                기도로 고백하는 시간입니다.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Archive Section */}
      <section className="section" id="archive">
        <div className="container fade-up">
          <h2 className="section-title">아카이브 및 자료실</h2>
          <div className="archive-grid">
            <a
              href="https://raon-easypaster.github.io/infographic/"
              target="_blank"
              className="archive-card"
            >
              <h3>설교 인포그래픽 아카이브 →</h3>
              <p>말씀을 한눈에 볼 수 있도록 정리한 인포그래픽 모음입니다.</p>
            </a>
            <a
              href="https://raon-easypaster.github.io/weekly/"
              target="_blank"
              className="archive-card"
            >
              <h3>주간묵상집 아카이브 →</h3>
              <p>매주 발행되는 라온동행 주간 묵상집 아카이브입니다.</p>
            </a>
            <a
              href="https://raon-easypaster.github.io/daily/"
              target="_blank"
              className="archive-card"
            >
              <h3>매일 성경 묵상 →</h3>
              <p>하나님과 동행하는 삶을 위한 매일의 말씀 묵상입니다.</p>
            </a>
            <a
              href="https://raon-easypaster.github.io/archive/"
              target="_blank"
              className="archive-card"
            >
              <h3>교회 서식 관련 자료 →</h3>
              <p>교회 생활에 필요한 다양한 서식과 행정 자료실입니다.</p>
            </a>
            <a
              href="https://raon-easypaster.github.io/share/"
              target="_blank"
              className="archive-card"
            >
              <h3>소그룹 나눔지 →</h3>
              <p>소그룹에서 함께 삶과 말씀을 나누기 위한 자료입니다.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section" id="blog" style={{ backgroundColor: "var(--bg-light)" }}>
        <div className="container fade-up">
          <h2 className="section-title">쉬운목사의 목양칼럼</h2>
          <p className="section-intro" style={{ marginBottom: "48px" }}>
            말씀을 쉽게 가르치는 하나님이 쓰기 쉬운 이광복 목사님의 이야기입니다.
          </p>

          <div className="blog-container" style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            {/* Main Post Card */}
            {blogPosts.length > 0 && (
              <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
                <a href={blogPosts[0].link} target="_blank" rel="noopener noreferrer" className="blog-card" style={{
                  backgroundColor: "white",
                  padding: "32px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-main)" }}>
                    {blogPosts[0].title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--gray)", lineHeight: "1.6", marginBottom: "20px", flexGrow: 1 }}>
                    {blogPosts[0].description}
                  </p>
                  <span style={{ fontSize: "0.85rem", color: "var(--accent-mid)", fontWeight: "600" }}>
                    {blogPosts[0].pubDate}
                  </span>
                </a>
              </div>
            )}
            
            {/* List of other posts */}
            {blogPosts.length > 1 && (
              <div style={{ flex: "1 1 300px", minWidth: "300px", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "space-between" }}>
                {blogPosts.slice(1).map((post, index) => (
                  <a href={post.link} target="_blank" rel="noopener noreferrer" key={index} style={{
                    backgroundColor: "white",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: 1,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }} className="blog-list-item">
                    <h4 style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "6px", color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {post.title}
                    </h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--gray)" }}>
                      {post.pubDate}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="https://blog.naver.com/galeb76" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ backgroundColor: "#03c75a", color: "white", borderColor: "#03c75a" }}>
              네이버 블로그 전체 보기 →
            </a>
          </div>
        </div>
      </section>

      {/* Sermon Section */}
      <section className="section" id="sermon">
        <div className="container">
          <div className="fade-up" style={{ marginBottom: "64px" }}>
            <h2 className="section-title">신앙은 설명이 아니라, 동행입니다.</h2>
          </div>

          <div className="youtube-grid fade-up">
            <div className="youtube-item">
              <div className="youtube-video">
                <iframe
                  src="https://www.youtube.com/embed/WXMg28Sdc04"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="youtube-info">
                <h3
                  style={{
                    fontSize: "1.1rem",
                    marginTop: "12px",
                    marginBottom: "4px",
                  }}
                >
                  천킬로의 편지일꾼 뵈뵈
                </h3>
              </div>
            </div>
            <div className="youtube-item">
              <div className="youtube-video">
                <iframe
                  src="https://www.youtube.com/embed/A5mdIgC7HbY"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="youtube-info">
                <h3
                  style={{
                    fontSize: "1.1rem",
                    marginTop: "12px",
                    marginBottom: "4px",
                  }}
                >
                  보고 싶습니다 (롬 31)
                </h3>
              </div>
            </div>
            <div className="youtube-item">
              <div className="youtube-video">
                <iframe
                  src="https://www.youtube.com/embed/kclm98HrG9I"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="youtube-info">
                <h3
                  style={{
                    fontSize: "1.1rem",
                    marginTop: "12px",
                    marginBottom: "4px",
                  }}
                >
                  태초의 빛 (요한복음 1)
                </h3>
              </div>
            </div>
            <div className="youtube-item">
              <div className="youtube-video">
                <iframe
                  src="https://www.youtube.com/embed/uMOR8ZHhsNE"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="youtube-info">
                <h3
                  style={{
                    fontSize: "1.1rem",
                    marginTop: "12px",
                    marginBottom: "4px",
                  }}
                >
                  내가 꼭 갈께 (로마서 3)
                </h3>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a
              href="https://www.youtube.com/@easypaster"
              target="_blank"
              className="btn btn-primary"
            >
              유튜브 채널 바로가기 →
            </a>

            <div className="social-links-container">
              <a
                href="https://www.facebook.com/raondonghang"
                target="_blank"
                className="btn-social btn-facebook"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/raon_donghang/"
                target="_blank"
                className="btn-social btn-instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="section" id="calendar" style={{ backgroundColor: "var(--bg-light)" }}>
        <div className="container fade-up">
          <h2 className="section-title">라온 사역 일정</h2>
          <p className="section-intro" style={{ marginBottom: "40px" }}>
            성도님들과 함께 만들어가는 교회의 여러 일정들입니다.
          </p>
          <div className="calendar-container" style={{ position: "relative", paddingBottom: "75%", height: 0, overflow: "hidden", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            <iframe 
              src="https://calendar.google.com/calendar/embed?src=08tpgtnil0i5vpogtgo9f81p7g@group.calendar.google.com&ctz=Asia%2FSeoul" 
              style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} 
              frameBorder="0" 
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section
        className="section"
        id="contact"
        style={{ backgroundColor: "var(--bg-warm)" }}
      >
        <div className="container">
          <div className="fade-up">
            <h2 className="section-title">오시는 길</h2>
          </div>

          <div className="contact-content fade-up">
            <div className="contact-info">
              <div className="info-item">
                <span className="label">주소</span>
                <span className="value">
                  경기도 부천시 소사로 203 2층 (카페 라온트리)
                </span>
              </div>
              <div className="info-item">
                <span className="label">교통편</span>
                <span className="value">
                  소사역(1호선/서해선) 도보 10분, 소사초등학교 앞 하차
                </span>
              </div>
              <div className="info-item">
                <span className="label">상담 및 문의</span>
                <span className="value">010-5606-0845</span>
              </div>

              <div className="map-btns">
                <a
                  href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EB%B6%80%EC%B2%9C%EC%8B%9C%20%EC%86%8C%EC%82%AC%EB%A1%9C%20203"
                  target="_blank"
                  className="btn btn-naver"
                >
                  네이버 지도
                </a>
                <a
                  href="https://map.kakao.com/link/search/경기도 부천시 소사로 203"
                  target="_blank"
                  className="btn btn-kakao"
                >
                  카카오맵
                </a>
              </div>
            </div>

            {/* Offering Info */}
            <div className="offering-info" style={{ marginTop: "40px", padding: "30px", backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-main)" }}>온라인 헌금 안내</h3>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px", padding: "20px", backgroundColor: "var(--bg-light)", borderRadius: "12px" }}>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "1.1rem", marginBottom: "4px" }}>국민은행 <span id="account-number" style={{ color: "var(--accent-dark)" }}>238501-04-288321</span></p>
                  <p style={{ fontSize: "0.95rem", color: "var(--gray)" }}>예금주: 기독교대한성결교회라온동행교회</p>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText("238501-04-288321");
                    alert("계좌번호가 복사되었습니다.");
                  }}
                  className="btn btn-primary" 
                  style={{ padding: "10px 20px", fontSize: "0.95rem", whiteSpace: "nowrap" }}
                >
                  계좌번호 복사하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main >
  );
}
