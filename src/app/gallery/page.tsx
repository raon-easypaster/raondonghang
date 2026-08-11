import Image from "next/image";

// Revalidate this page every 60 seconds so new photos show up without rebuilding
export const revalidate = 60; 

const ROOT_FOLDER_ID = "1gralGNz2JmXHXVEt-1r7-SMlF5ZAJxMb";

type DriveFolder = {
  id: string;
  name: string;
};

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
};

async function getFolders(): Promise<DriveFolder[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not defined.");
  }

  // Fetch folders inside the root gallery folder
  const query = `'${ROOT_FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&fields=files(id,name)&orderBy=name desc&pageSize=50`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(`Failed to fetch folders: ${errorData.error?.message || res.statusText}`);
  }

  const data = await res.json();
  return data.files || [];
}

async function getPhotos(folderId: string): Promise<DriveFile[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return [];

  // Fetch images and videos from the specific folder
  const query = `'${folderId}' in parents and (mimeType contains 'image/' or mimeType contains 'video/') and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)&orderBy=createdTime desc&pageSize=100`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) return [];
  const data = await res.json();
  return data.files || [];
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: { folder?: string };
}) {
  let folders: DriveFolder[] = [];
  let photos: DriveFile[] = [];
  let errorMsg = "";

  try {
    folders = await getFolders();
  } catch (error: any) {
    errorMsg = error.message;
  }

  // URL 쿼리에 folder가 있으면 그 폴더를, 없으면 가장 첫 번째(최신) 폴더를 선택
  const activeFolderId = searchParams.folder || (folders.length > 0 ? folders[0].id : null);
  const activeFolderName = folders.find(f => f.id === activeFolderId)?.name || "";

  if (activeFolderId && !errorMsg) {
    photos = await getPhotos(activeFolderId);
  }

  return (
    <main className="gallery-page">
      <section className="section" style={{ backgroundColor: "var(--bg-light)", padding: "120px 0 60px 0", minHeight: "80vh" }}>
        <div className="container">
          <div className="title-block" style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 className="section-title">라온 사진첩</h2>
            <p className="section-intro">
              즐거운 동행, 라온동행교회의 아름다운 순간들입니다.
            </p>
          </div>

          {errorMsg && (
            <div className="error-message" style={{ background: "#fee2e2", color: "#991b1b", padding: "20px", borderRadius: "8px", textAlign: "center", marginBottom: "30px" }}>
              <p><strong>사진첩 데이터를 불러오는 중 오류가 발생했습니다.</strong></p>
              <p style={{ fontSize: "0.9rem", marginTop: "8px" }}>{errorMsg}</p>
              {errorMsg.includes("GOOGLE_API_KEY") && (
                <p style={{ fontSize: "0.9rem", marginTop: "8px", fontWeight: "bold" }}>관리자님, 구글 클라우드 API 키를 환경 변수(GOOGLE_API_KEY)에 등록해 주세요.</p>
              )}
            </div>
          )}

          {!errorMsg && folders.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
              <p>구글 드라이브 사진첩 폴더 안에 행사별 새 폴더를 만들어 사진을 올려주세요.</p>
            </div>
          )}

          {folders.length > 0 && (
            <div className="gallery-content" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              
              {/* 이미지 뷰어 영역 */}
              <div className="gallery-viewer" style={{ backgroundColor: "white", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h3 style={{ textAlign: "center", marginBottom: "32px", color: "var(--accent-dark)", fontSize: "1.4rem", fontWeight: "700" }}>
                  {activeFolderName}
                </h3>
                
                {photos.length === 0 ? (
                  <p style={{ textAlign: "center", padding: "40px 0", color: "var(--gray)" }}>이 앨범에 등록된 사진이나 영상이 없습니다.</p>
                ) : (
                  <div className="gallery-grid">
                    {photos.map((photo) => {
                      const highResUrl = photo.thumbnailLink ? photo.thumbnailLink.replace(/=s\d+/, "=s1000") : "";
                      const isVideo = photo.mimeType.startsWith("video/");
                      const targetUrl = isVideo && photo.webViewLink ? photo.webViewLink : highResUrl;
                      const displayName = photo.name.replace(/\.[^/.]+$/, "");
                      
                      return (
                        <div key={photo.id} className="gallery-item" style={{ breakInside: "avoid", marginBottom: "16px" }}>
                          {highResUrl ? (
                            <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                              <img
                                src={highResUrl}
                                alt={photo.name}
                                className="gallery-image"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }}
                              />
                              {isVideo && (
                                <div className="video-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: "8px" }}>
                                  <svg width="48" height="48" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5V19L19 12L8 5Z" />
                                  </svg>
                                </div>
                              )}
                            </a>
                          ) : (
                            <div className="gallery-placeholder">이미지 없음</div>
                          )}
                          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--gray-700)", marginTop: "8px", fontWeight: "500" }}>{displayName}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 다른 앨범 목록 */}
              {folders.length > 1 && (
                <div className="past-albums">
                  <h4 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "16px", borderBottom: "2px solid var(--accent-light)", paddingBottom: "8px" }}>다른 앨범 보기</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    {folders.map((folder) => (
                      <a 
                        key={folder.id}
                        href={`/gallery?folder=${folder.id}`}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: folder.id === activeFolderId ? "var(--accent-mid)" : "white",
                          color: folder.id === activeFolderId ? "white" : "var(--text-main)",
                          borderRadius: "40px",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          fontWeight: folder.id === activeFolderId ? "600" : "400",
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
