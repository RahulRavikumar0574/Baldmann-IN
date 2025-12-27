import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from "./SearchIcon";
import './ProjectSearch.css';

const ProjectSearch = ({ onResult }) => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [matches, setMatches] = useState([]); // array of span elements
  const [activeIndex, setActiveIndex] = useState(-1);
  const [routeList, setRouteList] = useState([]); // array of paths for cross-page navigation
  const navigate = useNavigate();
  const location = useLocation();

  const isHighlightingRef = useRef(false);
  const debounceRef = useRef(null);
  const activeIndexRef = useRef(-1);
  const suppressObserverRef = useRef(false);
  const lastNavTimeRef = useRef(0);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    const q = query.trim();
    
    // First, try to find the text on the current page
    const currentPageMatches = document.body.innerText.toLowerCase().includes(q.toLowerCase());
    
    if (currentPageMatches) {
      // Text exists on current page, just highlight it
      highlightAll(q, false);
      setSearching(false);
      return;
    }
    
    // Text not on current page, check search index for other pages
    try {
      const res = await fetch('/searchIndex.json');
      if (res.ok) {
        const idx = await res.json();
        // Find pages that might contain this text
        const matchingPages = idx.filter(entry => {
          const searchText = [
            entry.title,
            entry.excerpt,
            entry.content || '', // Include full content if available
            ...(entry.keywords || [])
          ].join(' ').toLowerCase();
          return searchText.includes(q.toLowerCase());
        });
        
        if (matchingPages.length === 1) {
          // Single match - navigate directly with query parameter
          const page = matchingPages[0];
          if (page.path.startsWith('http')) {
            window.open(page.path, '_blank');
          } else {
            navigate(`${page.path}?q=${encodeURIComponent(q)}`);
          }
        } else {
          // Multiple or no matches - show search results page
          navigate(`/search?q=${encodeURIComponent(q)}`);
        }
      } else {
        // Fallback to search results page
        navigate(`/search?q=${encodeURIComponent(q)}`);
      }
    } catch (err) {
      // Error loading index, fallback to search results page
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
    
    setSearching(false);
  };

  // Highlighting utilities
  const HCLASS = 'search-highlighted-text-copilot';
  const ACTIVE_CLASS = 'search-highlighted-active-copilot';
  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function removeHighlights(preserveState = false) {
    // remove active class decorations first
    document.querySelectorAll('.' + ACTIVE_CLASS).forEach(el => {
      el.classList.remove(ACTIVE_CLASS);
      el.style.outline = '';
      el.style.boxShadow = '';
    });
    // unwrap highlight spans
    document.querySelectorAll('.' + HCLASS).forEach(span => {
      const parent = span.parentNode;
      if (!parent) return;
      // replace span with its text node
      const textNode = document.createTextNode(span.textContent);
      parent.replaceChild(textNode, span);
      parent.normalize();
    });
    if (!preserveState) {
      setMatches([]);
      setActiveIndex(-1);
    }
  }

  function highlightAll(q, preserveActive = false) {
    isHighlightingRef.current = true;
    removeHighlights(preserveActive);
    if (!q) return;
    const terms = q.split(/\s+/).filter(Boolean);
    if (terms.length === 0) return;
    const rx = new RegExp(`(${terms.map(escapeRegex).join('|')})`, 'gi');

    const root = document.getElementById('app-content') || document.body;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let current;
    while ((current = walker.nextNode())) {
      textNodes.push(current);
    }
    const newMatches = [];
    for (const node of textNodes) {
      const parent = node.parentNode;
      if (!parent) continue;
      // Skip our own highlights to avoid nesting
      if (parent.classList && (parent.classList.contains(HCLASS) || parent.classList.contains(ACTIVE_CLASS))) continue;
      const value = node.nodeValue;
      if (!value || !value.trim()) continue;

      const frag = document.createDocumentFragment();
      let changed = false;
      let lastIndex = 0;
      const all = Array.from(value.matchAll(rx));
      if (all.length === 0) continue;
      for (const m of all) {
        const match = m[0];
        const offset = m.index ?? 0;
        if (offset > lastIndex) {
          frag.appendChild(document.createTextNode(value.slice(lastIndex, offset)));
        }
        const span = document.createElement('span');
        span.className = HCLASS;
        span.textContent = match;
        span.style.background = '#ffe066';
        span.style.color = '#222';
        span.style.borderRadius = '4px';
        span.style.padding = '0 2px';
        frag.appendChild(span);
        newMatches.push(span);
        changed = true;
        lastIndex = offset + match.length;
      }
      if (lastIndex < value.length) {
        frag.appendChild(document.createTextNode(value.slice(lastIndex)));
      }

      if (changed) {
        parent.replaceChild(frag, node);
        parent.normalize();
      }
    }
    setMatches(newMatches);
    if (newMatches.length > 0) {
      const prevIdx = activeIndexRef.current;
      const idx = preserveActive && prevIdx >= 0 ? Math.min(prevIdx, newMatches.length - 1) : 0;
      setActiveIndex(idx);
      activeIndexRef.current = idx;
      // only scroll when this is a fresh search; on preserveActive re-apply, keep view
      focusMatch(newMatches[idx], !preserveActive);
    }
    if (typeof onResult === 'function') onResult(newMatches.length);
    isHighlightingRef.current = false;
  }

  function focusMatch(el, doScroll = true) {
    if (!el) return;
    // clear any previous active
    document.querySelectorAll('.' + ACTIVE_CLASS).forEach(s => {
      s.classList.remove(ACTIVE_CLASS);
      s.style.outline = '';
      s.style.boxShadow = '';
    });
    el.classList.add(ACTIVE_CLASS);
    el.style.outline = '2px solid #f7c948';
    el.style.boxShadow = '0 0 0 3px rgba(247,201,72,0.35)';
    if (doScroll) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  }

  const gotoNext = () => {
    if (matches.length === 0) return;
    const next = (activeIndex + 1) % matches.length;
    setActiveIndex(next);
    activeIndexRef.current = next;
    // briefly suppress observer-triggered re-highlights while scrolling to next
    suppressObserverRef.current = true;
    lastNavTimeRef.current = Date.now();
    setTimeout(() => { suppressObserverRef.current = false; }, 1000);
    focusMatch(matches[next]);
  };

  const gotoPrev = () => {
    if (matches.length === 0) return;
    const prev = (activeIndex - 1 + matches.length) % matches.length;
    setActiveIndex(prev);
    activeIndexRef.current = prev;
    suppressObserverRef.current = true;
    lastNavTimeRef.current = Date.now();
    setTimeout(() => { suppressObserverRef.current = false; }, 1000);
    focusMatch(matches[prev]);
  };

  // When wrapping next beyond last, navigate to next page in routeList (site-wide)
  const gotoNextPageIfNeeded = () => {
    if (!query.trim() || routeList.length === 0) return false;
    if (activeIndex === matches.length - 1 || matches.length === 0) {
      const stored = sessionStorage.getItem('bm_search_routes');
      let list = routeList;
      let q = query.trim();
      if (stored) {
        try { const parsed = JSON.parse(stored); if (parsed.q) q = parsed.q; if (Array.isArray(parsed.list)) list = parsed.list; } catch {}
      }
      const curPath = location.pathname + location.hash;
      const i = list.indexOf(curPath);
      const nextIdx = (i + 1) % list.length;
      const nextPath = list[nextIdx];
      if (nextPath && nextPath !== curPath) {
        navigate({ pathname: nextPath.split('#')[0], hash: nextPath.includes('#') ? `#${nextPath.split('#')[1]}` : undefined, search: `?q=${encodeURIComponent(q)}` });
        return true;
      }
    }
    return false;
  };

  const gotoPrevPageIfNeeded = () => {
    if (!query.trim() || routeList.length === 0) return false;
    if (activeIndex === 0 || matches.length === 0) {
      const stored = sessionStorage.getItem('bm_search_routes');
      let list = routeList;
      let q = query.trim();
      if (stored) {
        try { const parsed = JSON.parse(stored); if (parsed.q) q = parsed.q; if (Array.isArray(parsed.list)) list = parsed.list; } catch {}
      }
      const curPath = location.pathname + location.hash;
      const i = list.indexOf(curPath);
      const prevIdx = (i - 1 + list.length) % list.length;
      const prevPath = list[prevIdx];
      if (prevPath && prevPath !== curPath) {
        navigate({ pathname: prevPath.split('#')[0], hash: prevPath.includes('#') ? `#${prevPath.split('#')[1]}` : undefined, search: `?q=${encodeURIComponent(q)}` });
        return true;
      }
    }
    return false;
  };

  // Bind cross-page nav to the buttons as well
  const onNextClick = () => {
    if (!gotoNextPageIfNeeded()) gotoNext();
  };
  const onPrevClick = () => {
    if (!gotoPrevPageIfNeeded()) gotoPrev();
  };

  // Cleanup highlights on unmount or when query becomes empty
  useEffect(() => {
    if (!query) removeHighlights();
    return () => removeHighlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Reapply highlighting when the route or ?q changes (e.g., after next/prev page nav)
  useEffect(() => {
    const params = new URLSearchParams(location.search || '');
    const q = params.get('q') || '';
    if (q) {
      if (q !== query) setQuery(q);
      // Wait a tick to ensure the new page content is rendered
      setTimeout(() => highlightAll(q, true), 50);
    } else {
      removeHighlights();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  // Observe DOM changes to re-apply highlights (handles async content rendering)
  useEffect(() => {
    const target = document.getElementById('app-content') || document.body;
    if (!target) return;
    const observer = new MutationObserver(() => {
      if (!query || isHighlightingRef.current || suppressObserverRef.current) return;
      // ignore bursts right after user navigation
      if (Date.now() - lastNavTimeRef.current < 800) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        highlightAll(query, true);
      }, 250);
    });
    observer.observe(target, { childList: true, subtree: true });
    return () => {
      if (observer) observer.disconnect();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const inputRef = useRef(null);
  return (
    <form
      className="project-search-bar responsive-search-bar"
      onSubmit={handleSearch}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        maxWidth: 1000,
        marginTop: 40,
        marginBottom: 40,
        zIndex: 10,
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search items..."
        value={query}
        onChange={handleInput}
        className="responsive-search-input"
        style={{
          padding: '16px 56px 16px 24px',
          borderRadius: 32,
          border: '1.5px solid #ccc',
          minWidth: 500,
          fontSize: 20,
          width: '100%',
          boxSizing: 'border-box',
          background: '#fff',
          outline: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}
        disabled={searching}
      />
      <button
        type="submit"
        disabled={searching}
        aria-label="Search"
        style={{
          position: 'absolute',
          right: 18,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        tabIndex={-1}
      >
        <SearchIcon size={32} color={searching ? '#ccc' : '#888'} />
      </button>

      {/* Prev/Next controls - only show when there are matches */}
      {matches.length > 0 && (
        <div
          style={{
            position: 'absolute',
            right: 58,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            gap: 6,
            alignItems: 'center'
          }}
        >
          <button
            type="button"
            onClick={onPrevClick}
            title="Previous match"
            aria-label="Previous match"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            ‹
          </button>
          <span style={{ fontSize: 12, color: '#666', minWidth: 46, textAlign: 'center' }}>
            {`${activeIndex + 1}/${matches.length}`}
          </span>
          <button
            type="button"
            onClick={onNextClick}
            title="Next match"
            aria-label="Next match"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            ›
          </button>
        </div>
      )}
    </form>
  );
};

export default ProjectSearch;
