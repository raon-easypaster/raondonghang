import Image from "next/image";

// Revalidate this page every 60 seconds so new photos show up without rebuilding
export const revalidate = 60; 

const FOLDER_ID = "1gralGNz2JmXHXVEt-1r7-SMlF5ZAJxMb";

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
};

async function getPhotos(): Promise<DriveFile[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not defined.");
  }

  // Fetch all files from the specific Google Drive folder and filter locally
  const query = `'${FOLDER_ID}' in parents and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)&orderBy=createdTime desc&pageSize=100`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(`Failed to fetch photos from Google Drive: ${errorData.error?.message || res.statusText}`);
  }

  const data = await res.json();
  const files: DriveFile[] = data.files || [];
  return files.filter(f => f.mimeType?.startsWith('image/') || f.mimeType?.startsWith('video/'));
}

export default async function GalleryPage() {
  let photos: DriveFile[] = [];
  let errorMsg = "";

  try {
    photos = await getPhotos();
  } catch (error: any) {
    errorMsg = error.message;
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
              <p><strong>사진을 불러오는 중 오류가 발생했습니다.</strong></p>
              <p style={{ fontSize: "0.9rem", marginTop: "8px" }}>{errorMsg}</p>
              {errorMsg.includes("GOOGLE_API_KEY") && (
                <p style={{ fontSize: "0.9rem", marginTop: "8px", fontWeight: "bold" }}>관리자님, 구글 클라우드 API 키를 환경 변수(GOOGLE_API_KEY)에 등록해 주세요.</p>
              )}
            </div>
          )}

          {!errorMsg && photos.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray)" }}>
              <p>등록된 사진이 없습니다.</p>
            </div>
          )}

          <div className="gallery-grid">
            {photos.map((photo) => {
              // Use the new Google Drive direct download URL format to avoid 403 errors
              const highResUrl = `https://lh3.googleusercontent.com/d/${photo.id}=s1000`;
              const isVideo = photo.mimeType.startsWith("video/");
              const targetUrl = isVideo && photo.webViewLink ? photo.webViewLink : highResUrl;
              
              // Remove file extension (e.g. .jpg, .mp4) for a cleaner display
              const displayName = photo.name.replace(/\.[^/.]+$/, "");
              
              return (
                <div key={photo.id} className="gallery-item">
                  {highResUrl ? (
                    <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                      <img
                        src={highResUrl}
                        alt={photo.name}
                        className="gallery-image"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {isVideo && (
                        <div className="video-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" />
                          </svg>
                        </div>
                      )}
                      <div className="gallery-caption" style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '24px 16px 12px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                        color: 'white',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        pointerEvents: 'none'
                      }}>
                        {displayName}
                      </div>
                    </a>
                  ) : (
                    <div className="gallery-placeholder">미리보기 없음</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
