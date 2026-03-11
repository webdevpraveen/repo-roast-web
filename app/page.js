'use client';
import { useState, useEffect, useRef } from 'react';

const ROAST_LOADING_LINES = [
    "Scanning your commit history for crimes...",
    "Counting how many times you wrote 'fix'...",
    "Judging your variable names...",
    "Reading your 3-year-old TODO comments...",
    "Calculating your README disappointment score...",
    "Preparing brutal honesty...",
];

function FireParticle({ style }) {
    return <div className="fire-particle" style={style} />;
}

function StatCard({ emoji, value, label, delay }) {
    return (
        <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
            <span className="stat-emoji">{emoji}</span>
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
        </div>
    );
}

export default function Home() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingLine, setLoadingLine] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [particles, setParticles] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        const p = Array.from({ length: 18 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 3}s`,
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            opacity: 0.3 + Math.random() * 0.5,
        }));
        setParticles(p);
    }, []);

    useEffect(() => {
        if (loading) {
            intervalRef.current = setInterval(() => {
                setLoadingLine(prev => (prev + 1) % ROAST_LOADING_LINES.length);
            }, 1400);
        } else {
            clearInterval(intervalRef.current);
            setLoadingLine(0);
        }
        return () => clearInterval(intervalRef.current);
    }, [loading]);

    const handleRoast = async () => {
        if (!url.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('https://repo-roast-backend-copy-production.up.railway.app/api/roast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repoUrl: url })
            });
            const data = await res.json();
            if (data.success) setResult(data);
            else setError(data.error || 'Something went wrong');
        } catch {
            setError('Backend se connection nahi hua — try again!');
        } finally {
            setLoading(false);
        }
    };

    const handleShare = () => {
        const text = `🔥 My GitHub repo just got DESTROYED:\n\n"${result.roast.slice(0, 180)}..."\n\nRoast yours 👇\nhttps://repo-roast-wdp.vercel.app`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --fire: #FF4500;
          --fire-bright: #FF6B00;
          --ember: #FFB800;
          --ash: #1a1a1a;
          --smoke: #2a2a2a;
          --char: #111111;
          --text: #f0e6d3;
          --muted: #7a6a5a;
          --border: rgba(255,69,0,0.25);
        }

        html, body {
          background: var(--char);
          color: var(--text);
          font-family: 'Space Mono', monospace;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .bg-noise {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .bg-gradient {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,69,0,0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .fire-particle {
          position: fixed;
          bottom: -10px;
          border-radius: 50% 50% 20% 20%;
          background: radial-gradient(circle at 50% 80%, var(--ember), var(--fire), transparent);
          animation: floatUp linear infinite;
          pointer-events: none;
          z-index: 1;
          filter: blur(1px);
        }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1) rotate(-5deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(0.2) rotate(15deg); opacity: 0; }
        }

        .wrapper {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px 80px;
        }

        /* HEADER */
        .header { text-align: center; margin-bottom: 56px; }

        .header-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          color: var(--fire);
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0.8;
        }

        .header-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 15vw, 160px);
          line-height: 0.9;
          letter-spacing: -2px;
          background: linear-gradient(180deg, #fff 0%, var(--ember) 40%, var(--fire) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 40px rgba(255,69,0,0.4));
          animation: titlePulse 3s ease-in-out infinite;
        }

        @keyframes titlePulse {
          0%, 100% { filter: drop-shadow(0 0 40px rgba(255,69,0,0.4)); }
          50% { filter: drop-shadow(0 0 60px rgba(255,69,0,0.7)); }
        }

        .header-sub {
          font-family: 'Space Mono', monospace;
          font-size: clamp(13px, 2vw, 16px);
          color: var(--muted);
          margin-top: 20px;
          line-height: 1.6;
        }

        .header-sub strong { color: var(--fire-bright); font-style: italic; }

        /* INPUT SECTION */
        .input-section {
          width: 100%;
          max-width: 680px;
          margin-bottom: 16px;
        }

        .input-label {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--fire);
          text-transform: uppercase;
          margin-bottom: 10px;
          display: block;
        }

        .input-row {
          display: flex;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
          transition: border-color 0.2s;
          background: var(--ash);
        }

        .input-row:focus-within {
          border-color: var(--fire);
          box-shadow: 0 0 0 3px rgba(255,69,0,0.15), 0 0 30px rgba(255,69,0,0.1);
        }

        .url-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 18px 22px;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: var(--text);
          min-width: 0;
        }

        .url-input::placeholder { color: var(--muted); }

        .roast-btn {
          background: var(--fire);
          border: none;
          padding: 18px 32px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: white;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }

        .roast-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%);
        }

        .roast-btn:hover { background: var(--fire-bright); transform: none; }
        .roast-btn:active { transform: scale(0.98); }
        .roast-btn:disabled { background: #333; color: #666; cursor: not-allowed; }

        /* EXAMPLE REPOS */
        .examples {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          width: 100%;
          max-width: 680px;
        }

        .example-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--muted);
          text-transform: uppercase;
          align-self: center;
          margin-right: 4px;
        }

        .example-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 3px;
          padding: 6px 12px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.15s;
        }

        .example-btn:hover {
          border-color: var(--fire);
          color: var(--fire-bright);
        }

        /* ERROR */
        .error-box {
          width: 100%;
          max-width: 680px;
          margin-top: 20px;
          padding: 16px 20px;
          border: 1px solid rgba(255,50,50,0.3);
          border-left: 3px solid #ff3333;
          background: rgba(255,0,0,0.05);
          font-size: 13px;
          color: #ff8080;
          border-radius: 2px;
        }

        /* LOADING */
        .loading-box {
          width: 100%;
          max-width: 680px;
          margin-top: 48px;
          text-align: center;
        }

        .loading-flame {
          font-size: 64px;
          display: block;
          animation: flicker 0.8s ease-in-out infinite alternate;
          margin-bottom: 24px;
        }

        @keyframes flicker {
          0% { transform: scale(1) rotate(-2deg); filter: drop-shadow(0 0 20px rgba(255,69,0,0.6)); }
          100% { transform: scale(1.1) rotate(2deg); filter: drop-shadow(0 0 40px rgba(255,150,0,0.9)); }
        }

        .loading-line {
          font-size: 12px;
          letter-spacing: 0.15em;
          color: var(--muted);
          height: 20px;
          transition: opacity 0.3s;
        }

        .loading-bar {
          width: 200px;
          height: 2px;
          background: rgba(255,255,255,0.05);
          margin: 20px auto 0;
          border-radius: 1px;
          overflow: hidden;
        }

        .loading-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--fire), var(--ember));
          animation: loadBar 1.4s ease-in-out infinite;
          border-radius: 1px;
        }

        @keyframes loadBar {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }

        /* RESULT */
        .result-section {
          width: 100%;
          max-width: 680px;
          margin-top: 48px;
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: var(--ash);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 16px 8px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: fadeUp 0.4s ease both;
        }

        .stat-emoji { font-size: 22px; }
        .stat-value { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--ember); letter-spacing: 1px; }
        .stat-label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }

        /* ROAST CARD */
        .roast-card {
          background: var(--ash);
          border: 1px solid var(--border);
          border-top: 2px solid var(--fire);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .roast-card-header {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255,69,0,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,69,0,0.05);
        }

        .roast-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 3px;
          color: var(--fire);
        }

        .roast-card-repo {
          font-size: 11px;
          color: var(--muted);
          font-style: italic;
        }

        .roast-card-body {
          padding: 32px 28px;
          font-size: 14px;
          line-height: 1.9;
          color: var(--text);
          white-space: pre-wrap;
        }

        .divider {
          width: 40px;
          height: 2px;
          background: var(--fire);
          margin: 20px 0;
          opacity: 0.4;
        }

        /* SHARE BTN */
        .share-btn {
          width: 100%;
          background: transparent;
          border: 1px solid var(--border);
          padding: 16px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 3px;
          color: var(--text);
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
          margin-bottom: 12px;
        }

        .share-btn:hover {
          background: rgba(255,69,0,0.1);
          border-color: var(--fire);
          color: var(--fire-bright);
        }

        .retry-btn {
          width: 100%;
          background: transparent;
          border: none;
          padding: 12px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--muted);
          cursor: pointer;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .retry-btn:hover { color: var(--text); }

        /* FOOTER */
        .footer {
          margin-top: 80px;
          text-align: center;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.1);
          text-transform: uppercase;
        }

        .footer a { color: rgba(255,69,0,0.4); text-decoration: none; }
        .footer a:hover { color: var(--fire); }

        @media (max-width: 500px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .roast-btn { padding: 18px 20px; font-size: 18px; }
        }
      `}</style>

            <div className="bg-noise" />
            <div className="bg-gradient" />

            {particles.map(p => (
                <FireParticle key={p.id} style={{
                    left: p.left,
                    width: p.width,
                    height: p.height,
                    animationDuration: p.animationDuration,
                    animationDelay: p.animationDelay,
                    opacity: p.opacity,
                }} />
            ))}

            <div className="wrapper">
                {/* HEADER */}
                <header className="header">
                    <p className="header-eyebrow">⚡ AI-Powered Code Humiliation Engine</p>
                    <h1 className="header-title">REPO<br />ROAST</h1>
                    <p className="header-sub">
                        Enter your GitHub repo.<br />
                        <strong>We will destroy it. Lovingly.</strong>
                    </p>
                </header>

                {/* INPUT */}
                {!result && (
                    <>
                        <div className="input-section">
                            <label className="input-label">GitHub Repository URL</label>
                            <div className="input-row">
                                <input
                                    className="url-input"
                                    type="text"
                                    placeholder="https://github.com/username/repo"
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleRoast()}
                                />
                                <button
                                    className="roast-btn"
                                    onClick={handleRoast}
                                    disabled={loading || !url.trim()}
                                >
                                    {loading ? '🔥 ...' : '🔥 ROAST'}
                                </button>
                            </div>
                        </div>

                        <div className="examples">
                            <span className="example-label">Try:</span>
                            {['torvalds/linux', 'facebook/react', 'microsoft/vscode'].map(r => (
                                <button
                                    key={r}
                                    className="example-btn"
                                    onClick={() => setUrl(`https://github.com/${r}`)}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {/* ERROR */}
                {error && <div className="error-box">❌ {error}</div>}

                {/* LOADING */}
                {loading && (
                    <div className="loading-box">
                        <span className="loading-flame">🔥</span>
                        <p className="loading-line">{ROAST_LOADING_LINES[loadingLine]}</p>
                        <div className="loading-bar">
                            <div className="loading-bar-fill" />
                        </div>
                    </div>
                )}

                {/* RESULT */}
                {result && (
                    <div className="result-section">
                        <div className="stats-grid">
                            <StatCard emoji="⭐" value={result.stats.stars} label="Stars" delay={0} />
                            <StatCard emoji="💩" value={result.stats.badCommits} label="Bad Commits" delay={80} />
                            <StatCard emoji="😬" value={result.stats.todos} label="TODOs" delay={160} />
                            <StatCard emoji="🐛" value={result.stats.openIssues} label="Open Issues" delay={240} />
                        </div>

                        <div className="roast-card">
                            <div className="roast-card-header">
                                <span className="roast-card-title">🔥 ROAST REPORT</span>
                                <span className="roast-card-repo">{result.repo}</span>
                            </div>
                            <div className="roast-card-body">
                                {result.roast}
                            </div>
                        </div>

                        <button className="share-btn" onClick={handleShare}>
                            🐦 SHARE MY ROAST ON TWITTER / X
                        </button>

                        <button className="retry-btn" onClick={() => { setResult(null); setUrl(''); }}>
                            ← Roast another repo
                        </button>
                    </div>
                )}

                <footer className="footer">
                    <p>Built with rage & caffeine &nbsp;·&nbsp; <a href="https://github.com/webdevpraveen/repo-roast-web" target="_blank">GitHub</a></p>
                </footer>
            </div>
        </>
    );
}