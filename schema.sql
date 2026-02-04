-- Vercel Postgres에서 실행할 SQL 스크립트입니다.
-- Vercel Dashboard -> Storage -> Postgres -> Query 탭에서 실행하세요.

CREATE TABLE IF NOT EXISTS notices (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- (선택사항) 테스트 데이터 추가
INSERT INTO notices (title, content) 
VALUES ('홈페이지가 새롭게 단장되었습니다.', '라온동행교회 홈페이지가 Next.js와 Vercel Database 기반으로 새롭게 리뉴얼되었습니다.');
