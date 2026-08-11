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
    
    // "즐거운 묵상나눔" 카테고리만 필터링
    const blogItems = feed.items.filter(item => {
      const cats = item.categories || [];
      return cats.some(c => c.includes("즐거운 묵상나눔") || c.includes("즐거운묵상나눔") || c.includes("묵상나눔"));
    });
    
    return blogItems.slice(0, 6).map((item) => {
      // description에서 html 태그나 이미지 태그 등을 제거하고 순수 텍스트만 추출
      let plainText = item.description || "";
      // <br>, </p>, </div> 태그를 줄바꿈(\n)으로 변환
      plainText = plainText.replace(/<br\s*\/?>/gi, "\n");
      plainText = plainText.replace(/<\/p>/gi, "\n");
      plainText = plainText.replace(/<\/div>/gi, "\n");
      // 나머지 HTML 태그 제거
      plainText = plainText.replace(/<[^>]+>/g, ""); 
      plainText = plainText.replace(/&nbsp;/g, " ");
      plainText = plainText.replace(/\n\s*\n/g, "\n").trim();
      
      // 글자수 제한 (500자) - 메인 화면 카드를 꽉 채우기 위해 넉넉하게 설정
      if (plainText.length > 500) {
        plainText = plainText.substring(0, 500) + "...";
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
    
    // "라온동행(교회) 교회소식" 카테고리만 필터링 (Naver RSS는 categories 배열을 제공)
    const noticeItems = feed.items.filter(item => {
      const cats = item.categories || [];
      return cats.some(c => c.includes("라온동행교회 교회소식") || c.includes("라온동행 교회소식") || c.includes("교회소식"));
    });

    return noticeItems.map((item) => {
      let plainText = item.description || "";
      // <br>, </p>, </div> 태그를 줄바꿈(\n)으로 변환
      plainText = plainText.replace(/<br\s*\/?>/gi, "\n");
      plainText = plainText.replace(/<\/p>/gi, "\n");
      plainText = plainText.replace(/<\/div>/gi, "\n");
      // 나머지 모든 HTML 태그 제거
      plainText = plainText.replace(/<[^>]+>/g, ""); 
      plainText = plainText.replace(/&nbsp;/g, " "); 
      
      // 여러 개의 연속된 줄바꿈을 최대 2개로 압축하고 앞뒤 공백 제거
      plainText = plainText.replace(/\n\s*\n/g, "\n").trim();

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
