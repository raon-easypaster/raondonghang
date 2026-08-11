import Image from "next/image";
import Link from "next/link";

export default function LogoPage() {
    return (
        <main className="container" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
            <div className="fade-up visible" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h1 className="section-title" style={{ marginBottom: "16px" }}>라온동행교회 로고 이야기</h1>
                    <p style={{ fontSize: "1.1rem", color: "var(--gray-700)", lineHeight: "1.6" }}>
                        즐거운 삶을 함께 누리며 하나님과 성도, 세상과 동행하는 교회
                    </p>
                </div>

                <div style={{ marginBottom: "64px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}>
                    <Image
                        src="/logo-story.png"
                        alt="라온동행교회 로고 인포그래픽"
                        width={800}
                        height={1200}
                        style={{ width: "100%", height: "auto", display: "block" }}
                    />
                </div>

                <div className="logo-content" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                    <section>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px", color: "var(--accent-dark)", borderBottom: "2px solid var(--accent-soft)", paddingBottom: "8px" }}>1. 로고의 전체 의미</h2>
                        <p style={{ lineHeight: "1.7", color: "var(--text-main)" }}>
                            이 로고는 <strong>‘즐거운 삶을 함께 누리며 하나님과 성도, 세상과 동행하는 교회’</strong>라는 라온동행교회의 정체성을 표현합니다.<br/><br/>
                            <code>RAON</code>의 밝고 유쾌한 워드마크를 중심으로, 십자가와 길의 이미지를 결합하여 <strong>그리스도를 중심으로 함께 걸어가는 공동체</strong>의 의미를 담았습니다.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "24px", color: "var(--accent-dark)", borderBottom: "2px solid var(--accent-soft)", paddingBottom: "8px" }}>2. 주요 디자인 요소</h2>
                        
                        <div style={{ marginBottom: "24px" }}>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" }}>RAON 워드마크</h3>
                            <p style={{ lineHeight: "1.7", color: "var(--text-main)", marginBottom: "12px" }}>
                                굵고 현대적인 글자 형태는 누구에게나 열려 있는 친근하고 명확한 교회의 이미지를 나타냅니다.
                            </p>
                            <ul style={{ paddingLeft: "20px", lineHeight: "1.7", color: "var(--text-main)" }}>
                                <li><strong>R</strong>과 <strong>N</strong>: 안정감과 신뢰</li>
                                <li><strong>A</strong>: 새로운 시작과 상승</li>
                                <li><strong>O</strong>: 하나 됨과 공동체</li>
                                <li>전체 워드마크: 하나님과 사람과 세대를 연결하는 열린 교회</li>
                            </ul>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" }}>A 안의 미소</h3>
                            <p style={{ lineHeight: "1.7", color: "var(--text-main)" }}>
                                A 아래에 있는 곡선은 사람의 미소를 연상시킵니다.<br/>
                                이는 ‘라온’이라는 이름의 뜻인 <strong>즐거움</strong>과 함께, 하나님 안에서 누리는 기쁨과 성도 간의 따뜻한 교제를 표현합니다.
                            </p>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" }}>O 안의 십자가</h3>
                            <p style={{ lineHeight: "1.7", color: "var(--text-main)" }}>
                                O 안에 있는 십자가는 교회의 중심이 예수 그리스도이심을 나타냅니다.<br/>
                                화려한 장식이 아닌 절제된 형태로 배치하여, 세상 속에서 자연스럽게 복음을 드러내는 교회의 모습을 표현했습니다.
                            </p>
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" }}>O 안의 길</h3>
                            <p style={{ lineHeight: "1.7", color: "var(--text-main)", marginBottom: "12px" }}>
                                십자가 아래에서 이어지는 여러 갈래의 길은 교회의 핵심 가치인 <strong>동행</strong>을 의미합니다.
                            </p>
                            <ul style={{ paddingLeft: "20px", lineHeight: "1.7", color: "var(--text-main)", marginBottom: "12px" }}>
                                <li>하나님과 함께 걷는 삶</li>
                                <li>성도와 함께 걷는 공동체</li>
                                <li>세상과 함께 걸으며 섬기는 교회</li>
                            </ul>
                            <p style={{ lineHeight: "1.7", color: "var(--text-main)" }}>
                                길이 십자가를 향해 이어지는 모습은 모든 동행의 중심이 예수 그리스도임을 보여줍니다.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px" }}>무지개 색상과 상승하는 점</h3>
                            <p style={{ lineHeight: "1.7", color: "var(--text-main)", marginBottom: "12px" }}>
                                O의 다채로운 색상과 위로 올라가는 점들은 다음의 의미를 담습니다.
                            </p>
                            <ul style={{ paddingLeft: "20px", lineHeight: "1.7", color: "var(--text-main)", marginBottom: "12px" }}>
                                <li>다양한 사람들이 하나 되는 공동체</li>
                                <li>하나님 안에서 누리는 기쁨과 소망</li>
                                <li>말씀을 통해 자라나는 성도</li>
                                <li>세상으로 확장되는 복음과 섬김</li>
                            </ul>
                            <p style={{ lineHeight: "1.7", color: "var(--text-main)" }}>
                                각기 다른 색이 함께 어우러지는 모습은 서로 다른 사람들이 그리스도 안에서 하나의 가족이 되는 교회를 상징합니다.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px", color: "var(--accent-dark)", borderBottom: "2px solid var(--accent-soft)", paddingBottom: "8px" }}>3. 하단 영문 표기</h2>
                        <p style={{ lineHeight: "1.7", color: "var(--text-main)" }}>
                            <code>KEHC RAONDONGHAENG CHURCH</code>는 로고의 공식 영문 교회명입니다.<br/><br/>
                            상단의 <code>RAON</code> 로고와 같은 폭으로 배치하여, 교회명과 브랜드 심볼이 하나의 통일된 정체성으로 보이도록 구성했습니다.<br/>
                            넓은 자간은 개방감과 안정감을 주며, 현대적이고 국제적인 교회의 이미지를 강화합니다.
                        </p>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px", color: "var(--accent-dark)", borderBottom: "2px solid var(--accent-soft)", paddingBottom: "8px" }}>4. 교회 가치와의 연결</h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", lineHeight: "1.6" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "var(--bg-light)", borderBottom: "2px solid var(--gray-300)" }}>
                                        <th style={{ padding: "12px", fontWeight: "600" }}>교회의 가치</th>
                                        <th style={{ padding: "12px", fontWeight: "600" }}>로고에 표현된 요소</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: "1px solid var(--gray-200)" }}>
                                        <td style={{ padding: "12px" }}>가정에서 시작되는 교회</td>
                                        <td style={{ padding: "12px", color: "var(--gray-700)" }}>하나의 원 안에 모인 공동체의 이미지</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid var(--gray-200)" }}>
                                        <td style={{ padding: "12px" }}>즐거운 교회 공동체</td>
                                        <td style={{ padding: "12px", color: "var(--gray-700)" }}>A 아래의 미소와 밝은 색상</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid var(--gray-200)" }}>
                                        <td style={{ padding: "12px" }}>말씀 중심의 삶</td>
                                        <td style={{ padding: "12px", color: "var(--gray-700)" }}>십자가를 향해 이어지는 길</td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid var(--gray-200)" }}>
                                        <td style={{ padding: "12px" }}>아픔과 기쁨을 함께 나눔</td>
                                        <td style={{ padding: "12px", color: "var(--gray-700)" }}>서로 다른 색이 조화를 이루는 모습</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "12px" }}>세상의 소금과 빛</td>
                                        <td style={{ padding: "12px", color: "var(--gray-700)" }}>위로 올라가는 색점과 확장되는 색채</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px", color: "var(--accent-dark)", borderBottom: "2px solid var(--accent-soft)", paddingBottom: "8px" }}>5. 교회의 신앙적 방향</h2>
                        <p style={{ lineHeight: "1.7", color: "var(--text-main)", marginBottom: "16px" }}>
                            이 로고는 다음의 성경적 방향을 시각적으로 담고 있습니다.
                        </p>
                        <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--text-main)" }}>
                            <li><strong>고린도전서 3:16</strong> — 성도 한 사람 한 사람이 하나님의 성전이라는 공동체성</li>
                            <li><strong>아가 2:10</strong> — 하나님과 함께 일어나 기쁨으로 나아가는 삶</li>
                            <li><strong>디모데후서 3:14–17</strong> — 말씀을 중심으로 세워지는 신앙</li>
                            <li><strong>로마서 12:14–21</strong> — 서로의 아픔과 기쁨을 함께 나누는 공동체</li>
                            <li><strong>마태복음 5:13–16</strong> — 세상의 소금과 빛으로 살아가는 사명</li>
                        </ul>
                    </section>

                    <div style={{ marginTop: "32px", padding: "32px", backgroundColor: "#fffbeb", borderRadius: "16px", border: "1px solid #fef3c7" }}>
                        <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "16px", color: "var(--accent-dark)", textAlign: "center" }}>
                            라온동행교회 로고는 십자가를 중심으로 하나님과 성도, 세상과 함께 걸으며 기쁨과 복음을 나누는 공동체를 표현합니다.
                        </h3>
                        <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-main)", textAlign: "center", fontStyle: "italic" }}>
                            "즐거움의 미소, 십자가의 길, 그리고 세상으로 퍼져가는 빛.<br/>
                            라온동행교회는 그리스도 안에서 함께 걷는 즐거운 공동체입니다."
                        </p>
                    </div>
                    
                    <div style={{ textAlign: "center", marginTop: "24px" }}>
                        <Link href="/" className="btn btn-secondary">
                            홈으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
