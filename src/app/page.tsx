"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HomePopup from "@/components/HomePopup";
import { BlogPost, getBlogPosts, getLatestShorts, getNoticePosts, YouTubeShort } from "./actions";

const wordLinks = [
  { eyebrow: "한눈에 읽기", title: "설교 인포그래픽", description: "주일 말씀의 흐름과 핵심을 짧게 살펴봅니다.", href: "https://raon-easypaster.github.io/infographic/" },
  { eyebrow: "한 주간 살아보기", title: "주간 묵상하기", description: "말씀을 일상의 질문과 기도로 이어갑니다.", href: "https://raon-easypaster.github.io/weekly/" },
  { eyebrow: "매일 함께 걷기", title: "매일 성경 묵상", description: "오늘의 말씀을 천천히 읽고 삶에 머물게 합니다.", href: "https://raon-easypaster.github.io/daily/" },
];

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [noticePosts, setNoticePosts] = useState<BlogPost[]>([]);
  const [shorts, setShorts] = useState<YouTubeShort[]>([]);
  const [shortsLoaded, setShortsLoaded] = useState(false);

  useEffect(() => {
    Promise.all([getBlogPosts(), getNoticePosts(), getLatestShorts()]).then(([blogs, notices, latestShorts]) => {
      setBlogPosts(blogs);
      setNoticePosts(notices);
      setShorts(latestShorts);
      setShortsLoaded(true);
    });

    const elements = document.querySelectorAll(".reveal");
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observerRef.current?.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -40px" }
    );
    elements.forEach((element) => observerRef.current?.observe(element));
    return () => observerRef.current?.disconnect();
  }, []);

  const news = noticePosts.length > 0 ? noticePosts.slice(0, 3) : blogPosts.slice(0, 3);

  return (
    <main>
      <HomePopup />
      <section className="hero" id="hero">
        <Image src="/church-photo2.jpg" alt="아이와 어른이 함께한 라온동행교회 공동체" fill priority className="hero-image" sizes="100vw" />
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <div className="hero-content reveal is-visible">
            <span className="eyebrow light">라온동행교회에 오신 것을 환영합니다</span>
            <h1>즐거운 동행,<br />삶으로 드리는 신앙</h1>
            <p className="hero-lead">하나님과 함께 걷고, 사람과 함께 자라며,<br className="desktop-only" /> 세상 속에서 믿음을 살아내는 공동체입니다.</p>
            <div className="hero-actions">
              <a href="#worship" className="button button-sun">이번 주 예배 안내</a>
              <a href="#new-here" className="button button-glass">처음 오셨나요?</a>
            </div>
            <p className="hero-note">건물을 위한 교회보다 사람을 위한 교회가 되고 싶습니다.</p>
          </div>
        </div>
      </section>

      <section className="quick-worship" id="worship">
        <div className="container quick-worship-grid reveal">
          <div><span className="eyebrow">이번 주, 함께 예배드려요</span><h2>주일 오전 10:00</h2><p>카페 라온트리 2층 · 온 가족 통합예배</p></div>
          <div className="quick-actions"><a href="#directions" className="text-link">오시는 길 <span>→</span></a><a href="tel:010-5606-0845" className="button button-dark">방문 전 문의하기</a></div>
        </div>
      </section>

      <section className="section newcomer" id="new-here">
        <div className="container">
          <div className="section-heading narrow reveal"><span className="eyebrow">처음 오셨나요?</span><h2>처음이라도,<br />편안히 오셔도 괜찮습니다.</h2><p>어디로 가야 할지, 어떻게 예배드려야 할지 걱정하지 않도록 미리 알려드릴게요.</p></div>
          <div className="welcome-layout reveal">
            <div className="welcome-steps">
              <article><span className="step-number">01</span><div><h3>라온트리 2층으로 오세요</h3><p>카페 라온트리 입구로 들어오신 뒤 2층으로 올라오시면 예배 공간이 있습니다.</p></div></article>
              <article><span className="step-number">02</span><div><h3>그대로 함께 앉으시면 됩니다</h3><p>등록 여부와 상관없이 누구나 참여할 수 있습니다. 복장도, 준비물도 부담 갖지 않으셔도 됩니다.</p></div></article>
              <article><span className="step-number">03</span><div><h3>아이와 함께 예배드려요</h3><p>아이와 어른을 나누기보다 온 가족이 한자리에서 예배드리는 통합예배를 소중히 여깁니다.</p></div></article>
            </div>
            <aside className="welcome-card">
              <span className="card-kicker">처음 방문 체크</span>
              <dl><div><dt>주일예배</dt><dd>오전 10:00</dd></div><div><dt>장소</dt><dd>카페 라온트리 2층</dd></div><div><dt>주소</dt><dd>부천시 소삼로36번길 6</dd></div><div><dt>주차</dt><dd>방문 전 연락 주시면 가장 편한 방법을 안내해드립니다.</dd></div></dl>
              <a href="tel:010-5606-0845" className="button button-dark full">010-5606-0845 문의하기</a>
              <p className="small-note">낯선 공간에서 망설이지 않도록 기쁘게 맞이하겠습니다.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section identity" id="identity">
        <div className="container identity-grid">
          <div className="identity-photo reveal"><Image src="/church-photo1.jpg" alt="야외에서 함께한 라온동행교회 성도들" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
          <div className="identity-copy reveal">
            <span className="eyebrow">우리는 이런 교회입니다</span><h2>교회는 건물보다<br />함께 걷는 사람입니다.</h2>
            <p>라온은 ‘즐거움’입니다. 가볍지 않은 기쁨, 혼자가 아니라 함께 걷기 때문에 가능한 즐거움입니다.</p>
            <ul className="identity-list"><li><strong>하나님과 동행합니다.</strong><span>그래서 예배가 중심이 됩니다.</span></li><li><strong>성도와 동행합니다.</strong><span>그래서 공동체로 신앙을 배웁니다.</span></li><li><strong>세상과 동행합니다.</strong><span>그래서 삶의 자리로 향합니다.</span></li></ul>
            <Link href="/logo" className="logo-story-card">
              <span className="logo-story-mark"><Image src="/logo-new.png" alt="라온동행교회 로고" width={132} height={88} /></span>
              <span className="logo-story-copy"><small>라온동행교회의 정체성</small><strong>교회 로고에 담긴 이야기</strong><em>미소, 십자가의 길, 세상으로 퍼져가는 빛을 만나보세요. <b>→</b></em></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section word" id="word">
        <div className="container">
          <div className="section-heading split reveal"><div><span className="eyebrow">이번 주 말씀</span><h2>짧은 말씀을<br />쇼츠로 만나보세요.</h2></div><p>가장 최근에 올라온 말씀 쇼츠부터 최대 4개까지 자동으로 보여드립니다. 짧게 만난 말씀을 묵상으로 이어가 보세요.</p></div>
          {shorts.length > 0 ? (
            <div className={`shorts-grid shorts-count-${shorts.length} reveal is-visible`}>
              {shorts.map((short, index) => (
                <article className="shorts-card" key={short.id}>
                  <div className="shorts-player">
                    {index === 0 && <span className="latest-badge">가장 최근</span>}
                    <iframe src={short.embedUrl} title={short.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                  </div>
                  <div className="shorts-info"><span>말씀 쇼츠 {String(index + 1).padStart(2, "0")}</span><h3>{short.title}</h3><a href={short.link} target="_blank" rel="noopener noreferrer">YouTube에서 보기 ↗</a></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="shorts-empty reveal is-visible"><p>{shortsLoaded ? "현재 공개된 말씀 쇼츠를 불러오지 못했습니다." : "최신 말씀 쇼츠를 불러오는 중입니다."}</p><a href="https://www.youtube.com/@easypaster/shorts" target="_blank" rel="noopener noreferrer" className="button button-dark">쇼츠 채널 바로가기</a></div>
          )}
          <div className="shorts-footer reveal"><p>새 쇼츠가 올라오면 최대 5분 안에 가장 최근 영상이 맨 앞으로 자동 반영됩니다.</p><a href="https://www.youtube.com/@easypaster/shorts" target="_blank" rel="noopener noreferrer" className="text-link">쇼츠 전체 보기 <span>↗</span></a></div>
          <div className="word-grid reveal">{wordLinks.map((item) => <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="word-card"><span className="card-kicker">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.description}</p><span className="card-arrow">바로가기 →</span></a>)}</div>
          <div className="archive-row reveal"><div><h3>더 깊이 이어가고 싶다면</h3><p>설교부터 소그룹 나눔까지, 기존 자료를 한곳에서 찾을 수 있습니다.</p></div><div className="archive-links"><a href="https://www.youtube.com/@easypaster" target="_blank" rel="noopener noreferrer">전체 설교</a><a href="https://raon-easypaster.github.io/share/" target="_blank" rel="noopener noreferrer">소그룹 나눔지</a><a href="https://raon-easypaster.github.io/archive/" target="_blank" rel="noopener noreferrer">교회 자료실</a></div></div>
        </div>
      </section>

      <section className="section people" id="people">
        <div className="container">
          <div className="section-heading narrow reveal"><span className="eyebrow">라온동행 사람들</span><h2>예배만 함께하는 사이를 넘어,<br />삶을 함께 살아갑니다.</h2></div>
          <div className="people-story reveal"><div className="people-image"><Image src="/church-photo2.jpg" alt="카페 공간에 함께 모인 라온동행교회 공동체" fill sizes="(max-width: 800px) 100vw, 60vw" /></div><blockquote>“처음에는 예배만 드리러 왔는데<br />어느새 함께 살아가는 사람들이 되었습니다.”</blockquote></div>
          <div className="people-footer reveal"><p>함께 예배하고, 식탁을 나누고, 아이와 어른이 어울리고, 지역사회를 섬기는 평범한 순간들이 우리의 교회입니다.</p><div><Link href="/gallery" className="text-link">공동체 사진 더 보기 <span>→</span></Link><a href="https://www.instagram.com/raon_donghang/" target="_blank" rel="noopener noreferrer" className="text-link">Instagram <span>↗</span></a><a href="https://www.facebook.com/raondonghang" target="_blank" rel="noopener noreferrer" className="text-link">Facebook <span>↗</span></a></div></div>
        </div>
      </section>

      <section className="section why-space" id="why-space">
        <div className="container">
          <div className="why-intro reveal"><span className="eyebrow light">우리의 목회적 선택</span><h2>왜 우리는 카페에서<br />예배드릴까요?</h2><p>카페는 교회의 정체성이 아니라 지역사회를 만나고 섬기고 소통하기 위한 도구입니다. 우리는 교회 건물을 소유하는 대신, 일상의 공간에서 예배드리기로 선택했습니다.</p></div>
          <div className="why-values reveal"><article><span>01</span><h3>교회의 정체성은<br />분명하게</h3><p>예수 그리스도와 예배, 함께 살아가는 신앙공동체가 우리의 중심입니다.</p></article><article><span>02</span><h3>교회의 문턱은<br />낮게</h3><p>일상과 동떨어진 공간이 아니라 누구에게나 익숙한 삶의 자리에서 만납니다.</p></article><article><span>03</span><h3>지역사회와의 거리는<br />가깝게</h3><p>공간 사용의 불편함을 감수하면서도 이웃 곁에 머물고 섬기기를 선택합니다.</p></article></div>
          <div className="journey reveal" aria-label="라온동행교회의 공간 선택이 이어지는 흐름"><span>교회</span><i>→</i><span>일상의 공간</span><i>→</i><span>지역사회와 만남</span><i>→</i><span>섬김과 소통</span><i>→</i><span>예배</span><i>→</i><span>세상으로</span></div>
          <p className="why-closing reveal">카페는 카페이고, 교회는 교회입니다.<br />우리는 카페라는 공간에서 예배드리는 교회입니다.</p>
        </div>
      </section>

      <section className="section news" id="news">
        <div className="container">
          <div className="section-heading split reveal"><div><span className="eyebrow">최근 교회소식</span><h2>이번 주,<br />우리의 이야기</h2></div><div className="news-actions"><Link href="/notice" className="text-link">교회소식 전체 보기 <span>→</span></Link><Link href="/bulletin" className="text-link">온라인 주보 <span>→</span></Link></div></div>
          {news.length > 0 ? <div className="news-grid reveal">{news.map((post) => <a href={post.link} target="_blank" rel="noopener noreferrer" key={post.link} className="news-card"><span>{post.pubDate}</span><h3>{post.title}</h3><p>{post.description}</p><b>읽어보기 →</b></a>)}</div> : <div className="news-empty reveal"><p>최근 소식을 불러오는 중입니다.</p><Link href="/notice">교회소식 페이지 바로가기 →</Link></div>}

          <div className="blog-preview reveal">
            <div className="blog-preview-heading">
              <div><span className="eyebrow">즐거운 묵상나눔</span><h3>블로그 글을 먼저 읽어보세요.</h3><p>말씀을 쉽게 가르치는 이광복 목사님의 묵상과 일상 이야기입니다.</p></div>
              <a href="https://blog.naver.com/galeb76" target="_blank" rel="noopener noreferrer" className="text-link">블로그 전체 보기 <span>↗</span></a>
            </div>
            {blogPosts.length > 0 ? (
              <div className="blog-preview-window">
                <a href={blogPosts[0].link} target="_blank" rel="noopener noreferrer" className="blog-featured">
                  <span className="blog-date">{blogPosts[0].pubDate}</span>
                  <h4>{blogPosts[0].title}</h4>
                  <p>{blogPosts[0].description}</p>
                  <b>이어서 읽기 →</b>
                </a>
                <div className="blog-recent" aria-label="최근 묵상 글">
                  <span className="blog-recent-label">최근 글</span>
                  {blogPosts.slice(1, 6).map((post) => (
                    <a href={post.link} target="_blank" rel="noopener noreferrer" key={post.link}>
                      <span>{post.title}</span><small>{post.pubDate}</small>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="blog-preview-loading"><p>묵상 글을 불러오는 중입니다.</p><a href="https://blog.naver.com/galeb76" target="_blank" rel="noopener noreferrer">블로그에서 바로 보기 →</a></div>
            )}
          </div>

          <details className="calendar-panel reveal"><summary>라온 사역 일정 펼쳐보기</summary><div className="calendar-frame"><iframe src="https://calendar.google.com/calendar/embed?src=08tpgtnil0i5vpogtgo9f81p7g@group.calendar.google.com&ctz=Asia%2FSeoul" title="라온동행교회 사역 일정" /></div></details>
        </div>
      </section>

      <section className="section directions" id="directions">
        <div className="container directions-grid">
          <div className="directions-copy reveal"><span className="eyebrow">오시는 길</span><h2>이번 주일,<br />함께 예배드려요.</h2><dl><div><dt>주소</dt><dd>경기도 부천시 소삼로36번길 6 2층<br />(카페 라온트리)</dd></div><div><dt>대중교통</dt><dd>소사역(1호선·서해선) 도보 5분<br />소사종합시장 정류장 하차</dd></div><div><dt>상담 및 문의</dt><dd><a href="tel:010-5606-0845">010-5606-0845</a></dd></div></dl><div className="map-buttons"><a href="https://map.naver.com/v5/search/경기도 부천시 소삼로36번길 6" target="_blank" rel="noopener noreferrer" className="button map-naver">네이버 지도</a><a href="https://map.kakao.com/link/search/경기도 부천시 소삼로36번길 6" target="_blank" rel="noopener noreferrer" className="button map-kakao">카카오맵</a></div></div>
          <div className="directions-card reveal"><p className="directions-message">길을 찾기 어렵거나<br />주차가 걱정되시나요?</p><p>미리 연락 주시면 처음 오시는 길이 어렵지 않도록 안내해드리겠습니다.</p><a href="tel:010-5606-0845" className="button button-sun full">전화로 문의하기</a><div className="offering-mini"><span>온라인 헌금 안내</span><strong>국민은행 238501-04-288321</strong><small>기독교대한성결교회라온동행교회</small><button onClick={() => navigator.clipboard.writeText("238501-04-288321")}>계좌번호 복사</button></div></div>
        </div>
      </section>
    </main>
  );
}
