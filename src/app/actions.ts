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

export type YouTubeShort = {
  id: string;
  title: string;
  link: string;
  embedUrl: string;
};

const YOUTUBE_SHORTS_URL = "https://www.youtube.com/@easypaster/shorts";

export async function getLatestShorts(): Promise<YouTubeShort[]> {
  try {
    const response = await fetch(YOUTUBE_SHORTS_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];

    const html = await response.text();
    const matches = html.matchAll(/"entityId":"shorts-shelf-item-([A-Za-z0-9_-]{11})"/g);
    const ids = Array.from(new Set(Array.from(matches, (match) => match[1]))).slice(0, 4);

    return Promise.all(
      ids.map(async (id, index) => {
        let title = `라온동행 말씀 쇼츠 ${index + 1}`;

        try {
          const metadataResponse = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/shorts/${id}&format=json`,
            { next: { revalidate: 300 } }
          );
          if (metadataResponse.ok) {
            const metadata = (await metadataResponse.json()) as { title?: string };
            if (metadata.title) title = metadata.title;
          }
        } catch {
          // Keep the fallback title when YouTube metadata is temporarily unavailable.
        }

        return {
          id,
          title,
          link: `https://www.youtube.com/shorts/${id}`,
          embedUrl: `https://www.youtube.com/embed/${id}`,
        };
      })
    );
  } catch (error) {
    console.error("Failed to fetch YouTube Shorts:", error);
    return [];
  }
}

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
      
      // 네이버 RSS 글 줄바꿈 복원 휴리스틱 (문장 끝 맺음말 뒤에 줄바꿈 추가)
      plainText = plainText.replace(/([다요까죠시오][\.!\?])\s+/g, "$1\n\n");
      
      plainText = plainText.replace(/\n\s*\n/g, "\n\n").trim();
      
      // 글자수 제한 (800자) - 메인 화면 카드를 꽉 채우기 위해 넉넉하게 설정
      if (plainText.length > 800) {
        plainText = plainText.substring(0, 800) + "...";
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
      // <br>, </p>, </div> 태그를 줄바꿈(\n)으로 변환 (혹시나 HTML이 들어올 경우를 대비)
      plainText = plainText.replace(/<br\s*\/?>/gi, "\n");
      plainText = plainText.replace(/<\/p>/gi, "\n");
      plainText = plainText.replace(/<\/div>/gi, "\n");
      // 나머지 모든 HTML 태그 제거
      plainText = plainText.replace(/<[^>]+>/g, ""); 
      plainText = plainText.replace(/&nbsp;/g, " "); 
      
      // 네이버 블로그 RSS는 기본적으로 모든 줄바꿈을 없애버리고 한 줄로 만듭니다.
      // 따라서 숫자(예: "2. ", "3. ")가 시작되는 부분에서 강제로 줄바꿈을 추가하여 보기 좋게 만듭니다.
      plainText = plainText.replace(/(\d+\.\s)/g, "\n\n$1");
      
      // 여러 개의 연속된 줄바꿈을 최대 2개로 압축하고 앞뒤 공백 제거
      plainText = plainText.replace(/\n\s*\n/g, "\n\n").trim();

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
