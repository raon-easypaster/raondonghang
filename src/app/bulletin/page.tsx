import Image from "next/image";

export const revalidate = 60; 

const ROOT_FOLDER_ID = "18iXXvsDccWuZl0-NdKr0wxEjrlsB24Iq";

type DriveFolder = {
  id: string;
  name: string;
};

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  thumbnailLink?: string;
};

async function getFolders(): Promise<DriveFolder[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return [];

  // Fetch folders inside the root bulletin folder
  const query = `'${ROOT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&fields=files(id,name)&orderBy=name desc&pageSize=50`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.files || [];
}

async function getImages(folderId: string): Promise<DriveFile[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return [];

  // Fetch images inside the selected folder
  const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&fields=files(id,name,mimeType,thumbnailLink,webContentLink)&orderBy=name asc&pageSize=20`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.files || [];
}

export default async function BulletinPage({
  searchParams,
}: {
  searchParams: { folder?: string };
}) {
  const folders = await getFolders();
  
  // URL 쿼리에 folder가 있으면 그 폴더를, 없으면 가장 첫 번째(최신) 폴더를 선택
  const activeFolderId = searchParams.folder || (folders.length > 0 ? folders[0].id : null);
  const activeFolderName = folders.find(f => f.id === activeFolderId)?.name || "";

  let images: DriveFile[] = [];
  if (activeFolderId) {
    images = await getImages(activeFolderId);
  }

  return (
    <main className="bulletin-page">
      <section className="section" style={{ backgroundColor: "var(--bg-light)", padding: "120px 0 60px 0", minHeight: "80vh" }}>
        <div className="container">
          <div className="title-block" style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 className="section-title">온라인 주보</h2>
            <p className="section-intro">
              매주 발행되는 라온동행교회의 주보입니다.
            </p>
          </div>

          {!process.env.GOOGLE_API_KEY && (
            <div className="error-message" style={{ background: "#fee2e2", color: "#991b1b", padding: "20px", borderRadius: "8px", textAlign: "center", marginBottom: "30px" }}>
              <p><strong>관리자님, 구글 클라우드 API 키를 환경 변수(GOOGLE_API_KEY)에 등록해 주세요.</strong></p>
            </div>
          )}

          {folders.length === 0 && process.env.GOOGLE_API_KEY && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
              <p>등록된 주보 폴더가 없습니다.</p>
            </div>
          )}

          {folders.length > 0 && (
            <div className="bulletin-content" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              
              {/* 이미지 뷰어 영역 */}
              <div className="bulletin-viewer" style={{ backgroundColor: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h3 style={{ textAlign: "center", marginBottom: "20px", color: "var(--accent-dark)", fontSize: "1.3rem" }}>
                  {activeFolderName} 주보
                </h3>
                
                {images.length === 0 ? (
                  <p style={{ textAlign: "center", padding: "40px 0", color: "var(--gray)" }}>이 폴더에 이미지 파일이 없습니다.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                    {images.map((img) => {
                      const highResUrl = img.thumbnailLink ? img.thumbnailLink.replace(/=s\d+/, "=s2000") : "";
                      return (
                        <img 
                          key={img.id}
                          src={highResUrl} 
                          alt={img.name}
                          style={{ maxWidth: "100%", maxHeight: "85vh", width: "auto", objectFit: "contain", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
                          referrerPolicy="no-referrer"
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 이전 주보 목록 (2번째 폴더부터) */}
              {folders.length > 1 && (
                <div className="past-bulletins">
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "16px", borderBottom: "2px solid var(--accent-light)", paddingBottom: "8px" }}>지난 주보 보기</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    {folders.map((folder) => (
                      <a 
                        key={folder.id}
                        href={`/bulletin?folder=${folder.id}`}
                        style={{
                          padding: "10px 16px",
                          backgroundColor: folder.id === activeFolderId ? "var(--accent-mid)" : "white",
                          color: folder.id === activeFolderId ? "white" : "var(--text-main)",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          border: "1px solid",
                          borderColor: folder.id === activeFolderId ? "var(--accent-mid)" : "#e2e8f0",
                          transition: "all 0.2s ease"
                        }}
                      >
                        {folder.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </section>
    </main>
  );
}
