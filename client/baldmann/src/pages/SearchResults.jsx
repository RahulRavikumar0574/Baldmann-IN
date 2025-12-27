import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function normalize(str) {
  return (str || '').toLowerCase();
}

function matches(entry, terms) {
  const haystack = [
    entry.title,
    entry.excerpt,
    entry.content || '', // Include full content if available
    ...(entry.keywords || [])
  ].join(' ').toLowerCase();
  // All terms must be present (AND). Change to OR by using some()
  return terms.every(t => haystack.includes(t));
}

// Calculate relevance score for better ranking
function calculateRelevance(entry, terms) {
  let score = 0;
  const title = normalize(entry.title);
  const excerpt = normalize(entry.excerpt);
  const content = normalize(entry.content || '');
  const keywords = (entry.keywords || []).map(k => normalize(k));
  
  terms.forEach(term => {
    // Exact title match gets highest score
    if (title === term) score += 100;
    else if (title.includes(term)) score += 50;
    
    // Keyword matches
    if (keywords.some(k => k === term)) score += 30;
    else if (keywords.some(k => k.includes(term))) score += 15;
    
    // Excerpt matches
    if (excerpt.includes(term)) score += 10;
    
    // Content matches (lower priority but still valuable)
    if (content.includes(term)) score += 5;
  });
  
  return score;
}

// Categorize results
function categorizeResults(results) {
  const categories = {
    team: [],
    pages: [],
    blogs: [],
    features: []
  };
  
  results.forEach(r => {
    if (r.path === '/team' && r.title.includes('-')) {
      categories.team.push(r);
    } else if (r.path.startsWith('/blog')) {
      categories.blogs.push(r);
    } else if (r.title.includes('ML Model') || r.title.includes('BaldSphere')) {
      categories.features.push(r);
    } else {
      categories.pages.push(r);
    }
  });
  
  return categories;
}

export default function SearchResults() {
  const q = useQuery().get('q') || '';
  const [index, setIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const terms = useMemo(() => normalize(q).split(/\s+/).filter(Boolean), [q]);

  useEffect(() => {
    let cancelled = false;
    async function loadIndex() {
      setLoading(true);
      try {
        const res = await fetch('/searchIndex.json');
        if (!res.ok) throw new Error('Failed to load search index');
        const data = await res.json();
        if (!cancelled) setIndex(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadIndex();
    return () => { cancelled = true; };
  }, []);

  const results = useMemo(() => {
    if (!terms.length) return [];
    return index
      .filter(e => matches(e, terms))
      .map(e => ({ ...e, relevance: calculateRelevance(e, terms) }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 50); // cap results
  }, [index, terms]);

  // Auto-redirect if exactly 1 result
  useEffect(() => {
    if (!loading && results.length === 1) {
      const result = results[0];
      // Wait a brief moment to show the result, then redirect
      const timer = setTimeout(() => {
        if (result.path.startsWith('http')) {
          window.open(result.path, '_blank');
          navigate(-1); // Go back after opening external link
        } else {
          navigate(result.path);
        }
      }, 800); // 800ms delay to show the user what was found
      return () => clearTimeout(timer);
    }
  }, [loading, results, navigate]);

  const categorized = useMemo(() => categorizeResults(results), [results]);
  const hasResults = results.length > 0;

  const handleResultClick = (path) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  const ResultCard = ({ result, showCategory = false }) => (
    <div
      onClick={() => handleResultClick(result.path)}
      style={{
        marginBottom: 16,
        background: 'linear-gradient(135deg, #3b2e3a77 0%, #2a1f2977 100%)',
        padding: 16,
        borderRadius: 12,
        cursor: 'pointer',
        border: '1px solid #ffffff11',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(247,201,72,0.2)';
        e.currentTarget.style.borderColor = '#f7c94844';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        e.currentTarget.style.borderColor = '#ffffff11';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, color: '#f7c948', fontSize: 18, fontWeight: 700 }}>
            {result.title}
          </h3>
          <p style={{ margin: '8px 0 0', color: '#ddd', fontSize: 14, lineHeight: 1.5 }}>
            {result.excerpt}
          </p>
          {Array.isArray(result.keywords) && result.keywords.length > 0 && (
            <div style={{ marginTop: 10, fontSize: 11, color: '#aaa', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {result.keywords.slice(0, 6).map((k, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#ffffff15',
                    padding: '3px 8px',
                    borderRadius: 12,
                    border: '1px solid #ffffff22'
                  }}
                >
                  #{k}
                </span>
              ))}
            </div>
          )}
        </div>
        <div style={{ marginLeft: 12, color: '#f7c948', fontSize: 20 }}>→</div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 120, paddingBottom: 60, minHeight: '100vh', background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)' }}>
      <div style={{ width: '90%', maxWidth: 1200, margin: '0 auto', color: '#fff' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: '#f7c948' }}>
            Search Results
          </h1>
          <p style={{ fontSize: 16, color: '#aaa' }}>
            Showing results for <span style={{ color: '#fff', fontWeight: 600 }}>" {q}"</span>
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 18, color: '#aaa' }}>🔍 Searching...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ background: '#ff444422', border: '1px solid #ff4444', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <p style={{ color: '#ff6666', margin: 0 }}>⚠️ Error: {error}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && !hasResults && (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h2 style={{ fontSize: 24, marginBottom: 12, color: '#fff' }}>No results found</h2>
            <p style={{ color: '#aaa', marginBottom: 24 }}>Try different keywords or browse our pages:</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Home', 'Team', 'Services', 'BaldSphere', 'Learn'].map(page => (
                <button
                  key={page}
                  onClick={() => navigate(page === 'Home' ? '/' : `/${page.toLowerCase()}`)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 8,
                    border: '1px solid #f7c948',
                    background: 'transparent',
                    color: '#f7c948',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f7c948';
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#f7c948';
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && hasResults && (
          <div>
            <div style={{ marginBottom: 20, padding: 12, background: '#ffffff11', borderRadius: 8 }}>
              <span style={{ color: '#f7c948', fontWeight: 600 }}>{results.length}</span>
              <span style={{ color: '#aaa' }}> result{results.length !== 1 ? 's' : ''} found</span>
            </div>

            {/* Team Members */}
            {categorized.team.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f7c948', borderBottom: '2px solid #f7c94844', paddingBottom: 8 }}>
                  👥 Team Members ({categorized.team.length})
                </h2>
                {categorized.team.map((r, i) => <ResultCard key={`team-${i}`} result={r} />)}
              </div>
            )}

            {/* Blog Posts */}
            {categorized.blogs.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f7c948', borderBottom: '2px solid #f7c94844', paddingBottom: 8 }}>
                  📝 Blog Posts ({categorized.blogs.length})
                </h2>
                {categorized.blogs.map((r, i) => <ResultCard key={`blog-${i}`} result={r} />)}
              </div>
            )}

            {/* Features */}
            {categorized.features.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f7c948', borderBottom: '2px solid #f7c94844', paddingBottom: 8 }}>
                  ⭐ Features ({categorized.features.length})
                </h2>
                {categorized.features.map((r, i) => <ResultCard key={`feature-${i}`} result={r} />)}
              </div>
            )}

            {/* Pages */}
            {categorized.pages.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f7c948', borderBottom: '2px solid #f7c94844', paddingBottom: 8 }}>
                  📄 Pages ({categorized.pages.length})
                </h2>
                {categorized.pages.map((r, i) => <ResultCard key={`page-${i}`} result={r} />)}
              </div>
            )}
          </div>
        )}

        {/* Back Button */}
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '12px 32px',
              borderRadius: 8,
              border: 'none',
              background: '#f7c948',
              color: '#000',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 16,
              boxShadow: '0 4px 12px rgba(247,201,72,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(247,201,72,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(247,201,72,0.3)';
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
