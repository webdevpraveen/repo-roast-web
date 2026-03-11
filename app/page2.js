'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleRoast = async () => {
    if (!url) return;
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
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error);
      }
    } catch (e) {
      setError('Server se baat nahi ho rahi — check karo backend chal raha hai?');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const text = `🔥 My GitHub repo just got ROASTED:\n\n${result.roast.slice(0, 200)}...\n\nRoast yours: repo-roast.vercel.app`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black mb-4">🔥 repo-roast</h1>
        <p className="text-gray-400 text-xl">
          Enter your GitHub repo. <span className="text-orange-400">We will hurt your feelings.</span>
        </p>
      </div>

      <div className="w-full max-w-2xl flex gap-3 mb-8">
        <input
          type="text"
          placeholder="https://github.com/yourname/your-repo"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleRoast()}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-lg"
        />
        <button
          onClick={handleRoast}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 px-8 py-4 rounded-xl font-bold text-lg transition-all"
        >
          {loading ? '🔥 Roasting...' : 'Roast Me'}
        </button>
      </div>

      {error && (
        <div className="w-full max-w-2xl bg-red-900/30 border border-red-700 rounded-xl p-5 mb-6 text-red-300">
          ❌ {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4 animate-bounce">🔥</div>
          <p className="text-gray-400 text-lg">Analyzing your crimes against clean code...</p>
        </div>
      )}

      {result && (
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Stars', value: result.stats.stars, emoji: '⭐' },
              { label: 'Bad Commits', value: result.stats.badCommits, emoji: '💩' },
              { label: 'TODOs', value: result.stats.todos, emoji: '😬' },
              { label: 'Open Issues', value: result.stats.openIssues, emoji: '🐛' },
            ].map(stat => (
              <div key={stat.label} className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 border border-orange-500/30 rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🔥</span>
              <div>
                <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest">ROAST REPORT</p>
                <h2 className="text-xl font-bold">{result.repo}</h2>
              </div>
            </div>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-lg">
              {result.roast}
            </p>
          </div>

          <button
            onClick={handleShare}
            className="w-full bg-sky-500 hover:bg-sky-600 py-4 rounded-xl font-bold text-lg transition-all"
          >
            🐦 Share My Roast on Twitter
          </button>
        </div>
      )}

      {!result && !loading && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Try these famous repos:</p>
          <div className="flex gap-3 flex-wrap justify-center">
            {[
              'https://github.com/torvalds/linux',
              'https://github.com/facebook/react',
            ].map(r => (
              <button
                key={r}
                onClick={() => setUrl(r)}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-400 transition-all"
              >
                {r.replace('https://github.com/', '')}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}