import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "라온동행교회 - 즐거운 동행, 삶으로 드리는 신앙",
  description: "건물보다 사람을 소중히 여기며 일상의 공간에서 하나님과 이웃, 세상과 동행하는 라온동행교회입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
