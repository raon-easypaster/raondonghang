"use server";

import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: ["description"],
  },
});

export type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const feed = await parser.parseURL("https://rss.blog.naver.com/galeb76.xml");
    
    // 네이버 블로그 RSS는 description에 너무 많은 내용이 들어갈 수 있으므로 정제
    return feed.items.slice(0, 6).map((item) => {
      // description에서 html 태그나 이미지 태그 등을 제거하고 순수 텍스트만 추출
      let plainText = item.description || "";
      plainText = plainText.replace(/<[^>]+>/g, ""); // HTML 태그 제거
      plainText = plainText.replace(/&nbsp;/g, " "); // 공백 처리
      
      // 글자수 제한 (100자)
      if (plainText.length > 100) {
        plainText = plainText.substring(0, 100) + "...";
      }

      return {
        title: item.title || "제목 없음",
        link: item.link || "https://blog.naver.com/galeb76",
        pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" }) : "",
        description: plainText,
      };
    });
  } catch (error) {
    console.error("Failed to fetch Naver Blog RSS:", error);
    return [];
  }
}

export async function getNoticePosts(): Promise<BlogPost[]> {
  try {
    const feed = await parser.parseURL("https://rss.blog.naver.com/galeb76.xml");
    
    // 교회소식 카테고리만 필터링 (Naver RSS는 categories 배열을 제공)
    const noticeItems = feed.items.filter(item => {
      const cats = item.categories || [];
      return cats.some(c => c.includes("교회소식") || c.includes("교회 소식"));
    });

    return noticeItems.map((item) => {
      let plainText = item.description || "";
      plainText = plainText.replace(/<[^>]+>/g, ""); // HTML 태그 제거
      plainText = plainText.replace(/&nbsp;/g, " "); // 공백 처리
      
      if (plainText.length > 200) {
        plainText = plainText.substring(0, 200) + "...";
      }

      return {
        title: item.title || "제목 없음",
        link: item.link || "https://blog.naver.com/galeb76",
        pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" }) : "",
        description: plainText,
      };
    });
  } catch (error) {
    console.error("Failed to fetch Naver Blog RSS for notices:", error);
    return [];
  }
}
