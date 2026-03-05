import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, TrendingUp, TrendingDown, ArrowRight, Zap, BarChart3, Shield, Webhook } from "lucide-react";
import { Link } from "react-router-dom";
import heroCoin from "@/assets/hero-coin.png";

// ─── Google Fonts injected inline ───────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

// ─── Inline styles ────────────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById("ts-styles")) return;
  const s = document.createElement("style");
  s.id = "ts-styles";
  s.textContent = `
    :root {
      --ts-bg: #070b0f;
      --ts-panel: #0d1520;
      --ts-border: #162030;
      --ts-accent: #00e5a0;
      --ts-blue: #00b4ff;
      --ts-red: #ff4d6a;
      --ts-gold: #f5c518;
      --ts-text: #b8cce0;
      --ts-muted: #3d5570;
    }
    .ts-root { font-family: 'DM Sans', sans-serif; background: var(--ts-bg); min-height: 100vh; color: var(--ts-text); position: relative; overflow-x: hidden; }
    .ts-root * { box-sizing: border-box; }

    /* Grid bg */
    .ts-root::before {
      content: '';
      position: fixed; inset: 0;
      background-image: linear-gradient(rgba(0,229,160,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.025) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none; z-index: 0;
    }

    /* Orbs */
    .ts-orb { position: fixed; border-radius: 50%; filter: blur(130px); pointer-events: none; z-index: 0; }
    .ts-orb1 { width: 550px; height: 550px; background: var(--ts-accent); opacity: 0.1; top: -180px; left: -180px; }
    .ts-orb2 { width: 420px; height: 420px; background: var(--ts-blue); opacity: 0.08; bottom: -120px; right: -120px; }

    /* Nav */
    .ts-nav { position: fixed; top: 0; left: 0; right: 0; height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; background: rgba(7,11,15,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--ts-border); z-index: 199; }
    .ts-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .ts-logo-icon { width: 40px; height: 40px; border-radius: 7px; display: flex; align-items: center; justify-content: center; }
    .ts-logo-icon img { width: 100%; height: 100%; object-fit: contain; }
    .ts-logo-text { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; color: #fff; }
    .ts-logo-text span { color: var(--ts-accent); }
    .ts-nav-pills { display: flex; align-items: center; gap: 6px; }
    .ts-pill { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; padding: 5px 12px; border-radius: 3px; border: 1px solid var(--ts-border); color: var(--ts-muted); cursor: pointer; background: transparent; transition: all 0.2s; text-decoration: none; display: flex; align-items: center; gap: 5px; }
    .ts-pill:hover { border-color: var(--ts-accent); color: var(--ts-accent); background: rgba(0,229,160,0.06); }

    /* Main */
    .ts-main { padding-top: 56px; position: relative; z-index: 1; }

    /* Hero */
    .ts-hero { max-width: 1200px; margin: 0 auto; padding: 52px 24px 0; text-align: left; }
    .ts-badge { display: inline-flex; align-items: center; gap: 8px; font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ts-accent); border: 1px solid rgba(0,229,160,0.25); padding: 5px 14px; border-radius: 2px; margin-bottom: 24px; background: rgba(0,229,160,0.04); }
    .ts-dot { width: 5px; height: 5px; background: var(--ts-accent); border-radius: 50%; animation: tsPulse 2s ease infinite; box-shadow: 0 0 6px var(--ts-accent); }
    @keyframes tsPulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
    .ts-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 8vw, 72px); line-height: 0.9; letter-spacing: 4px; color: #fff; margin-bottom: 18px; }
    .ts-title .accent { color: var(--ts-accent); }
    .ts-title .dim { color: var(--ts-muted); }
    .ts-sub { font-size: 14px; color: var(--ts-muted); line-height: 1.7; max-width: 420px; margin: 0 0 36px 0; font-weight: 300; }

    /* Search */
    .ts-search-wrap { max-width: 640px; margin: 0 auto; }
    .ts-search-box { display: flex; background: var(--ts-panel); border: 1px solid var(--ts-border); border-radius: 3px; overflow: hidden; transition: border-color 0.25s, box-shadow 0.25s; }
    .ts-search-box:focus-within { border-color: var(--ts-accent); box-shadow: 0 0 0 1px var(--ts-accent), 0 0 36px rgba(0,229,160,0.08); }
    .ts-search-pre { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--ts-accent); padding: 0 14px; display: flex; align-items: center; border-right: 1px solid var(--ts-border); background: rgba(0,229,160,0.04); white-space: nowrap; letter-spacing: 0.05em; }
    .ts-search-input { flex: 1; background: transparent; border: none; outline: none; font-family: 'Space Mono', monospace; font-size: 13px; color: #fff; padding: 16px 18px; letter-spacing: 0.08em; }
    .ts-search-input::placeholder { color: var(--ts-muted); font-size: 11px; }
    .ts-analyze-btn { background: var(--ts-accent); color: #070b0f; border: none; padding: 0 24px; font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 7px; white-space: nowrap; }
    .ts-analyze-btn:hover { background: #00cc90; }
    .ts-analyze-btn:disabled { opacity: 0.35; cursor: not-allowed; }

    /* Quick chips */
    .ts-quick { display: flex; align-items: center; justify-content: center; gap: 7px; margin-top: 14px; flex-wrap: wrap; }
    .ts-quick-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 0.1em; color: var(--ts-muted); text-transform: uppercase; }
    .ts-chip { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 0.1em; padding: 5px 12px; border: 1px solid var(--ts-border); border-radius: 2px; color: var(--ts-text); cursor: pointer; background: rgba(13,21,32,0.8); text-transform: uppercase; transition: all 0.18s; }
    .ts-chip:hover { border-color: var(--ts-accent); color: var(--ts-accent); background: rgba(0,229,160,0.05); transform: translateY(-1px); }

    /* Error */
    .ts-error { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--ts-red); letter-spacing: 0.05em; text-align: center; margin-top: 10px; }

    /* Loader */
    .ts-loader { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px 24px; text-align: center; }
    .ts-terminal { font-family: 'Space Mono', monospace; font-size: 10px; color: var(--ts-accent); line-height: 2.2; background: var(--ts-panel); border: 1px solid rgba(0,229,160,0.18); padding: 22px 26px; border-radius: 3px; text-align: left; max-width: 380px; margin-bottom: 16px; }
    .ts-terminal-line { color: var(--ts-text); }
    .ts-terminal-line .cmd { color: var(--ts-accent); }
    .ts-cursor { display: inline-block; width: 7px; height: 13px; background: var(--ts-accent); animation: tsBlink 1s step-end infinite; vertical-align: middle; margin-left: 2px; }
    @keyframes tsBlink { 50%{opacity:0} }
    .ts-spin { width: 28px; height: 28px; border: 2px solid rgba(0,229,160,0.2); border-top-color: var(--ts-accent); border-radius: 50%; animation: tsSpin 0.8s linear infinite; margin-bottom: 12px; }
    @keyframes tsSpin { to { transform: rotate(360deg); } }

    /* Results */
    .ts-results { max-width: 860px; margin: 0 auto; padding: 0 24px 80px; }
    .ts-result-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--ts-border); }
    .ts-pair-title { font-family: 'Bebas Neue', sans-serif; font-size: 40px; letter-spacing: 3px; color: #fff; }
    .ts-pair-title span { color: var(--ts-accent); }
    .ts-timestamp { font-family: 'Space Mono', monospace; font-size: 9px; color: var(--ts-muted); letter-spacing: 0.08em; }

    /* Cards */
    .ts-card { background: var(--ts-panel); border: 1px solid var(--ts-border); border-radius: 3px; padding: 20px; position: relative; overflow: hidden; transition: border-color 0.2s; margin-bottom: 14px; }
    .ts-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--ts-accent); opacity: 0; transition: opacity 0.2s; }
    .ts-card:hover { border-color: rgba(0,229,160,0.25); }
    .ts-card:hover::before { opacity: 1; }
    .ts-card.blue::before { background: var(--ts-blue); }
    .ts-card.red::before { background: var(--ts-red); }
    .ts-card-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ts-muted); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
    .ts-card-label::after { content: ''; flex: 1; height: 1px; background: var(--ts-border); }

    /* Action badge */
    .ts-action { display: inline-flex; align-items: center; gap: 5px; font-family: 'Space Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 12px; border-radius: 2px; margin-bottom: 14px; }
    .ts-action.buy { background: rgba(0,229,160,0.1); color: var(--ts-accent); border: 1px solid rgba(0,229,160,0.28); }
    .ts-action.sell { background: rgba(255,77,106,0.1); color: var(--ts-red); border: 1px solid rgba(255,77,106,0.28); }
    .ts-action.hold { background: rgba(245,197,24,0.1); color: var(--ts-gold); border: 1px solid rgba(245,197,24,0.28); }
    .ts-action.long { background: rgba(0,229,160,0.1); color: var(--ts-accent); border: 1px solid rgba(0,229,160,0.28); }
    .ts-action.short { background: rgba(255,77,106,0.1); color: var(--ts-red); border: 1px solid rgba(255,77,106,0.28); }

    /* Price grid */
    .ts-price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
    .ts-price-item {}
    .ts-price-lbl { font-family: 'Space Mono', monospace; font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ts-muted); margin-bottom: 4px; }
    .ts-price-val { font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: #fff; }
    .ts-price-val.entry { color: var(--ts-blue); }
    .ts-price-val.sl { color: var(--ts-red); }
    .ts-price-val.tp { color: var(--ts-accent); }

    /* Leverage badge */
    .ts-lev-badge { font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; border-radius: 2px; background: rgba(0,180,255,0.08); color: var(--ts-blue); border: 1px solid rgba(0,180,255,0.25); margin-left: 8px; }

    /* Rationale */
    .ts-rationale { font-family: 'Space Mono', monospace; font-size: 10px; line-height: 1.8; color: var(--ts-muted); border-top: 1px solid var(--ts-border); padding-top: 12px; }
    .ts-rationale-section { margin-top: 10px; }
    .ts-rationale-section strong { color: var(--ts-text); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; display: block; margin-bottom: 4px; }

    /* Summary grid top */
    .ts-summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid var(--ts-border); border-radius: 3px; overflow: hidden; margin-bottom: 14px; }
    .ts-summary-item { padding: 14px 16px; text-align: center; border-right: 1px solid var(--ts-border); background: var(--ts-panel); }
    .ts-summary-item:last-child { border-right: none; }
    .ts-summary-val { font-family: 'Space Mono', monospace; font-size: 20px; font-weight: 700; display: block; }
    .ts-summary-lbl { font-family: 'Space Mono', monospace; font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ts-muted); display: block; margin-top: 3px; }

    /* Two-col grid */
    .ts-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    @media (max-width: 640px) { .ts-grid2 { grid-template-columns: 1fr; } .ts-price-grid { grid-template-columns: 1fr 1fr; } .ts-summary-grid { grid-template-columns: 1fr; } .ts-title { font-size: 58px; } }

    /* Sentiment bar */
    .ts-sent-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .ts-sent-lbl { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ts-muted); width: 76px; flex-shrink: 0; }
    .ts-sent-bar { flex: 1; height: 3px; background: var(--ts-border); border-radius: 2px; overflow: hidden; }
    .ts-sent-fill { height: 100%; border-radius: 2px; transition: width 1s ease; }
    .ts-sent-val { font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700; width: 38px; text-align: right; }
    .ts-sent-cat { font-family: 'Space Mono', monospace; font-size: 9px; color: var(--ts-muted); width: 56px; }

    /* Disclaimer */
    .ts-disclaimer { font-family: 'Space Mono', monospace; font-size: 8px; letter-spacing: 0.08em; color: var(--ts-muted); text-align: center; margin-top: 24px; border-top: 1px solid var(--ts-border); padding-top: 14px; line-height: 2; }
  `;
  document.head.appendChild(s);
};

injectStyles();

// ─── Types ────────────────────────────────────────────────────────────────────
interface TradeSuggestion {
  action: "BUY" | "SELL" | "HOLD";
  confidence: number;
  reason: string;
  entry: string;
  target: string;
  stopLoss: string;
  timeframe: string;
}

const mockSuggestions: Record<string, TradeSuggestion[]> = {
  bitcoin: [
    { action: "BUY", confidence: 78, reason: "Strong support at current level with increasing volume. RSI showing oversold conditions.", entry: "$67,240", target: "$72,500", stopLoss: "$64,800", timeframe: "1-2 weeks" },
    { action: "HOLD", confidence: 65, reason: "Consolidation phase. Wait for breakout above $69,000 resistance for confirmation.", entry: "—", target: "$74,000", stopLoss: "$63,500", timeframe: "2-4 weeks" },
  ],
  ethereum: [
    { action: "BUY", confidence: 82, reason: "ETH/BTC ratio recovering. Layer 2 activity surging with bullish divergence on daily.", entry: "$3,450", target: "$4,100", stopLoss: "$3,200", timeframe: "1-3 weeks" },
    { action: "SELL", confidence: 55, reason: "Short-term resistance at $3,600. Consider taking partial profits if already in position.", entry: "$3,580", target: "$3,200", stopLoss: "$3,700", timeframe: "3-5 days" },
  ],
  solana: [
    { action: "BUY", confidence: 85, reason: "Ecosystem growth accelerating. DEX volumes at ATH. Strong momentum with institutional interest.", entry: "$178", target: "$220", stopLoss: "$162", timeframe: "1-2 weeks" },
  ],
};

const getDefaultSuggestions = (coin: string): TradeSuggestion[] => [
  { action: "HOLD", confidence: 60, reason: `${coin.toUpperCase()} is showing mixed signals. Monitor for clearer directional bias before entering.`, entry: "—", target: "—", stopLoss: "—", timeframe: "Wait for setup" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const Index = () => {
  const [query, setQuery] = useState("");
  const [activeCoin, setActiveCoin] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<TradeSuggestion[]>([]);
  const [n8nResponse, setN8nResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const pair = query.trim().toUpperCase();
    if (!pair) return;

    if (!pair.endsWith("USDT")) {
      setError("⚠ Pair must end with USDT  —  e.g. BTCUSDT, ETHUSDT");
      return;
    }

    setError("");
    setIsLoading(true);
    setActiveCoin(null);
    setSuggestions([]);
    setN8nResponse(null);

    try {
      const response = await fetch("http://localhost:5678/webhook-test/fcd93b16-a5f3-4531-b6c6-24b5aab4eeee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pair }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      // Save to localStorage
      const webhookPayload = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        pair,
        request: { pair },
        response: data,
        status: "success",
      };
      const existing = localStorage.getItem("webhookData");
      const history = existing ? JSON.parse(existing) : [];
      history.unshift(webhookPayload);
      localStorage.setItem("webhookData", JSON.stringify(history.slice(0, 50)));

      setActiveCoin(pair);

      let parsedSuggestions: TradeSuggestion[] = [];
      let actualData = data;
      if (Array.isArray(data) && data.length > 0) actualData = data[0];
      if (actualData.output) actualData = actualData.output;

      setN8nResponse(actualData);

      if (actualData.short_term || actualData.long_term) {
        if (actualData.short_term) {
          const st = actualData.short_term;
          parsedSuggestions.push({ action: (st.action?.toUpperCase() || "HOLD") as "BUY"|"SELL"|"HOLD", confidence: 75, reason: st.rationale || "Short-term analysis from n8n", entry: st.entry_price ? `$${parseFloat(st.entry_price).toFixed(2)}` : "—", target: st.take_profit ? `$${parseFloat(st.take_profit).toFixed(2)}` : "—", stopLoss: st.stop_loss ? `$${parseFloat(st.stop_loss).toFixed(2)}` : "—", timeframe: "Short-term" });
        }
        if (actualData.long_term) {
          const lt = actualData.long_term;
          parsedSuggestions.push({ action: (lt.action?.toUpperCase() || "HOLD") as "BUY"|"SELL"|"HOLD", confidence: 70, reason: lt.rationale || "Long-term analysis from n8n", entry: lt.entry_price ? `$${parseFloat(lt.entry_price).toFixed(2)}` : "—", target: lt.take_profit ? `$${parseFloat(lt.take_profit).toFixed(2)}` : "—", stopLoss: lt.stop_loss ? `$${parseFloat(lt.stop_loss).toFixed(2)}` : "—", timeframe: "Long-term" });
        }
      } else if (actualData.suggestions && Array.isArray(actualData.suggestions)) {
        parsedSuggestions = actualData.suggestions;
      } else if (actualData.data && Array.isArray(actualData.data)) {
        parsedSuggestions = actualData.data;
      } else if (typeof actualData === "object" && actualData.action) {
        parsedSuggestions = [actualData];
      }

      if (parsedSuggestions.length === 0) parsedSuggestions = getDefaultSuggestions(pair);
      setSuggestions(parsedSuggestions);

    } catch (err) {
      console.error(err);
      setError("⚠ Failed to fetch. Make sure your n8n webhook is running.");
      const errorPayload = { id: Date.now().toString(), timestamp: new Date().toISOString(), pair, request: { pair }, response: { error: "Failed to fetch from n8n webhook" }, status: "error" };
      const existing = localStorage.getItem("webhookData");
      const history = existing ? JSON.parse(existing) : [];
      history.unshift(errorPayload);
      localStorage.setItem("webhookData", JSON.stringify(history.slice(0, 50)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter") handleSearch(); };

  return (
    <div className="ts-root">
      {/* Orbs */}
      <div className="ts-orb ts-orb1" />
      <div className="ts-orb ts-orb2" />

      {/* Nav */}
      <nav className="ts-nav">
        <a className="ts-logo" href="#">
          <div className="ts-logo-icon">
            <img src="/logo.png" alt="TradeSignal Logo" />
          </div>
          <div className="ts-logo-text">TRADE<span>SIGNAL</span></div>
        </a>
        <div className="ts-nav-pills">
          <span className="ts-pill" style={{ color: "var(--ts-muted)" }}>
            <Shield style={{ width: 10, height: 10 }} /> AI-Powered
          </span>
          <span className="ts-pill" style={{ color: "var(--ts-muted)" }}>
            <BarChart3 style={{ width: 10, height: 10 }} /> Real-time
          </span>
          <Link to="/webhook-data" className="ts-pill" style={{ color: "var(--ts-accent)", borderColor: "rgba(0,229,160,0.3)" }}>
            <Webhook style={{ width: 10, height: 10 }} /> Webhook Data
          </Link>
        </div>
      </nav>

      <main className="ts-main">
        {/* Hero */}
        <AnimatePresence mode="wait">
          {!activeCoin && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="ts-hero"
            >
              <div className="ts-badge">
                <span className="ts-dot" />
                AI-Powered Trading Intelligence
              </div>
              <h1 className="ts-title">
                <span className="dim">GET</span> <span className="accent">SMART</span><br />
                <span className="dim">TRADING</span> <span className="accent">SIGNALS</span>
              </h1>
              <p className="ts-sub">
                Real-time market analysis powered by AI<br />
                Enter any trading pair to get instant signals
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <motion.div
          layout
          style={{ maxWidth: 640, margin: "0 auto", padding: activeCoin ? "24px 24px 0" : "0 24px" }}
        >
          <div className="ts-search-box">
            <div className="ts-search-pre">PAIR://</div>
            <input
              className="ts-search-input"
              type="text"
              placeholder="BTCUSDT, ETHUSDT, SOLUSDT..."
              value={query}
              onChange={e => { setQuery(e.target.value.toUpperCase()); setError(""); }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              className="ts-analyze-btn"
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
            >
              <Sparkles style={{ width: 12, height: 12 }} />
              Analyze
            </button>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="ts-error">
              {error}
            </motion.p>
          )}
          
          {!activeCoin && !isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="ts-quick">
              <span className="ts-quick-label">Quick:</span>
              {["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","XRPUSDT"].map(c => (
                <button key={c} className="ts-chip" onClick={() => setQuery(c)}>{c}</button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Loading */}
        <AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ts-loader">
              <div className="ts-terminal">
                {[
                  `$ connecting to Binance API...`,
                  `$ fetching 15m · 1h · 1d · 1M candles...`,
                  `$ scraping news sentiment (3d window)...`,
                  `$ running LLM sentiment analysis...`,
                  `$ computing RSI · MACD · OBV...`,
                ].map((line, i) => (
                  <div key={i} className="ts-terminal-line">
                    <span className="cmd">$</span> {line.replace("$ ","")}
                  </div>
                ))}
                <div style={{ color: "var(--ts-accent)" }}>
                  ⚡ generating signals for {query}<span className="ts-cursor" />
                </div>
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "var(--ts-muted)", letterSpacing: "0.1em" }}>
                PROCESSING — DO NOT CLOSE
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {activeCoin && !isLoading && n8nResponse && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="ts-results"
              style={{ marginTop: 32 }}
            >
              <N8nResponseDisplay data={n8nResponse} pair={activeCoin} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// ─── N8n Response Display ─────────────────────────────────────────────────────
const N8nResponseDisplay = ({ data, pair }: { data: any; pair: string }) => {
  const getAction = (d: any) => d?.action?.toUpperCase() || "HOLD";
  const actionClass = (a: string) => {
    const m: Record<string,string> = { BUY: "buy", SELL: "sell", HOLD: "hold", LONG: "long", SHORT: "short" };
    return m[a] || "hold";
  };

  const stAction = getAction(data.short_term);
  const ltAction = getAction(data.long_term);
  const levStPos = (data.leveraged_recommendations?.short_term?.position || "long").toUpperCase();
  const levLtPos = (data.leveraged_recommendations?.long_term?.position || "long").toUpperCase();

  const sym = pair.replace("USDT","");
  const now = new Date().toUTCString().split(" ").slice(1,5).join(" ") + " UTC";

  // Sentiment (you can wire real data here)
  const stSentScore = 0.65;
  const ltSentScore = 0.1;

  return (
    <>
      {/* Header */}
      <div className="ts-result-header">
        <div className="ts-pair-title">{sym}<span>USDT</span></div>
        <div className="ts-timestamp">ANALYZED · {now}</div>
      </div>

      {/* Summary row */}
      <div className="ts-summary-grid">
        <div className="ts-summary-item">
          <span className="ts-summary-val" style={{ color: stAction === "BUY" ? "var(--ts-accent)" : stAction === "SELL" ? "var(--ts-red)" : "var(--ts-gold)" }}>{stAction}</span>
          <span className="ts-summary-lbl">Short-Term Action</span>
        </div>
        <div className="ts-summary-item">
          <span className="ts-summary-val" style={{ color: "var(--ts-blue)" }}>{data.short_term?.entry_price || "—"}</span>
          <span className="ts-summary-lbl">Entry Price</span>
        </div>
        <div className="ts-summary-item">
          <span className="ts-summary-val" style={{ color: stSentScore > 0 ? "var(--ts-accent)" : "var(--ts-red)" }}>{stSentScore > 0 ? "+" : ""}{stSentScore.toFixed(2)}</span>
          <span className="ts-summary-lbl">Sentiment Score</span>
        </div>
      </div>

      {/* Sentiment card */}
      <div className="ts-card">
        <div className="ts-card-label">News Sentiment Analysis</div>
        <SentimentBar label="Short-Term" score={stSentScore} />
        <SentimentBar label="Long-Term" score={ltSentScore} />
        {data.short_term?.sentiment_analysis && (
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "var(--ts-muted)", marginTop: 10, lineHeight: 1.8 }}>
            {data.short_term.sentiment_analysis}
          </div>
        )}
      </div>

      {/* Spot signals */}
      <div className="ts-grid2">
        {/* Short term */}
        <div className="ts-card">
          <div className="ts-card-label">Short-Term · Spot</div>
          <div className={`ts-action ${actionClass(stAction)}`}>
            {stAction === "BUY" ? <TrendingUp style={{width:10,height:10}} /> : stAction === "SELL" ? <TrendingDown style={{width:10,height:10}} /> : <ArrowRight style={{width:10,height:10}} />}
            {stAction}
          </div>
          <div className="ts-price-grid">
            <div className="ts-price-item"><div className="ts-price-lbl">Entry</div><div className="ts-price-val entry">{data.short_term?.entry_price || "—"}</div></div>
            <div className="ts-price-item"><div className="ts-price-lbl">Stop Loss</div><div className="ts-price-val sl">{data.short_term?.stop_loss || "—"}</div></div>
            <div className="ts-price-item"><div className="ts-price-lbl">Take Profit</div><div className="ts-price-val tp">{data.short_term?.take_profit || "—"}</div></div>
          </div>
          {(data.short_term?.rationale || data.short_term?.primary_signals || data.short_term?.lagging_indicators) && (
            <div className="ts-rationale">
              {data.short_term?.rationale && <div className="ts-rationale-section"><strong>Rationale</strong>{data.short_term.rationale}</div>}
              {data.short_term?.primary_signals && <div className="ts-rationale-section"><strong>Primary Signals</strong>{data.short_term.primary_signals}</div>}
              {data.short_term?.lagging_indicators && <div className="ts-rationale-section"><strong>Indicators</strong>{data.short_term.lagging_indicators}</div>}
            </div>
          )}
        </div>

        {/* Long term */}
        <div className="ts-card">
          <div className="ts-card-label">Long-Term · Spot</div>
          <div className={`ts-action ${actionClass(ltAction)}`}>
            {ltAction === "BUY" ? <TrendingUp style={{width:10,height:10}} /> : ltAction === "SELL" ? <TrendingDown style={{width:10,height:10}} /> : <ArrowRight style={{width:10,height:10}} />}
            {ltAction}
          </div>
          <div className="ts-price-grid">
            <div className="ts-price-item"><div className="ts-price-lbl">Entry</div><div className="ts-price-val entry">{data.long_term?.entry_price || "—"}</div></div>
            <div className="ts-price-item"><div className="ts-price-lbl">Stop Loss</div><div className="ts-price-val sl">{data.long_term?.stop_loss || "—"}</div></div>
            <div className="ts-price-item"><div className="ts-price-lbl">Take Profit</div><div className="ts-price-val tp">{data.long_term?.take_profit || "—"}</div></div>
          </div>
          {(data.long_term?.rationale || data.long_term?.primary_signals || data.long_term?.lagging_indicators) && (
            <div className="ts-rationale">
              {data.long_term?.rationale && <div className="ts-rationale-section"><strong>Rationale</strong>{data.long_term.rationale}</div>}
              {data.long_term?.primary_signals && <div className="ts-rationale-section"><strong>Primary Signals</strong>{data.long_term.primary_signals}</div>}
              {data.long_term?.lagging_indicators && <div className="ts-rationale-section"><strong>Indicators</strong>{data.long_term.lagging_indicators}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Leveraged signals */}
      {data.leveraged_recommendations && (
        <div className="ts-grid2" style={{ marginTop: 14 }}>
          {/* Lev ST */}
          {data.leveraged_recommendations.short_term && (
            <div className="ts-card blue">
              <div className="ts-card-label">Short-Term · Leveraged</div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                <div className={`ts-action ${actionClass(levStPos)}`} style={{ marginBottom: 0 }}>
                  {levStPos === "LONG" ? <TrendingUp style={{width:10,height:10}} /> : <TrendingDown style={{width:10,height:10}} />}
                  {levStPos}
                </div>
                <span className="ts-lev-badge">{data.leveraged_recommendations.short_term.leverage || "—"}</span>
              </div>
              <div className="ts-price-grid">
                <div className="ts-price-item"><div className="ts-price-lbl">Entry</div><div className="ts-price-val entry">{data.leveraged_recommendations.short_term.entry_price || "—"}</div></div>
                <div className="ts-price-item"><div className="ts-price-lbl">Stop Loss</div><div className="ts-price-val sl">{data.leveraged_recommendations.short_term.stop_loss || "—"}</div></div>
                <div className="ts-price-item"><div className="ts-price-lbl">Take Profit</div><div className="ts-price-val tp">{data.leveraged_recommendations.short_term.take_profit || "—"}</div></div>
              </div>
              {data.leveraged_recommendations.short_term.rationale && (
                <div className="ts-rationale">
                  <div className="ts-rationale-section"><strong>Rationale</strong>{data.leveraged_recommendations.short_term.rationale}</div>
                  {data.leveraged_recommendations.short_term.primary_price_action_signals && <div className="ts-rationale-section"><strong>Price Action</strong>{data.leveraged_recommendations.short_term.primary_price_action_signals}</div>}
                  {data.leveraged_recommendations.short_term.lagging_indicator_confirmation && <div className="ts-rationale-section"><strong>Indicator Confirmation</strong>{data.leveraged_recommendations.short_term.lagging_indicator_confirmation}</div>}
                </div>
              )}
            </div>
          )}

          {/* Lev LT */}
          {data.leveraged_recommendations.long_term && (
            <div className="ts-card blue">
              <div className="ts-card-label">Long-Term · Leveraged</div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                <div className={`ts-action ${actionClass(levLtPos)}`} style={{ marginBottom: 0 }}>
                  {levLtPos === "LONG" ? <TrendingUp style={{width:10,height:10}} /> : <TrendingDown style={{width:10,height:10}} />}
                  {levLtPos}
                </div>
                <span className="ts-lev-badge">{data.leveraged_recommendations.long_term.leverage || "—"}</span>
              </div>
              <div className="ts-price-grid">
                <div className="ts-price-item"><div className="ts-price-lbl">Entry</div><div className="ts-price-val entry">{data.leveraged_recommendations.long_term.entry_price || "—"}</div></div>
                <div className="ts-price-item"><div className="ts-price-lbl">Stop Loss</div><div className="ts-price-val sl">{data.leveraged_recommendations.long_term.stop_loss || "—"}</div></div>
                <div className="ts-price-item"><div className="ts-price-lbl">Take Profit</div><div className="ts-price-val tp">{data.leveraged_recommendations.long_term.take_profit || "—"}</div></div>
              </div>
              {data.leveraged_recommendations.long_term.rationale && (
                <div className="ts-rationale">
                  <div className="ts-rationale-section"><strong>Rationale</strong>{data.leveraged_recommendations.long_term.rationale}</div>
                  {data.leveraged_recommendations.long_term.primary_price_action_signals && <div className="ts-rationale-section"><strong>Price Action</strong>{data.leveraged_recommendations.long_term.primary_price_action_signals}</div>}
                  {data.leveraged_recommendations.long_term.sentiment_macro_analysis && <div className="ts-rationale-section"><strong>Macro Analysis</strong>{data.leveraged_recommendations.long_term.sentiment_macro_analysis}</div>}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="ts-disclaimer">
        ⚠ TRADESIGNAL IS FOR INFORMATIONAL PURPOSES ONLY · NOT FINANCIAL ADVICE<br />
        CRYPTO TRADING INVOLVES SUBSTANTIAL RISK · NEVER INVEST MORE THAN YOU CAN AFFORD TO LOSE
      </div>
    </>
  );
};

// ─── Sentiment Bar ────────────────────────────────────────────────────────────
const SentimentBar = ({ label, score }: { label: string; score: number }) => {
  const pct = Math.round(Math.abs(score) * 100);
  const color = score > 0 ? "var(--ts-accent)" : score < 0 ? "var(--ts-red)" : "var(--ts-gold)";
  const cat = score > 0.3 ? "Positive" : score < -0.3 ? "Negative" : "Neutral";
  return (
    <div className="ts-sent-row">
      <div className="ts-sent-lbl">{label}</div>
      <div className="ts-sent-bar">
        <div className="ts-sent-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="ts-sent-val" style={{ color }}>{score > 0 ? "+" : ""}{score.toFixed(2)}</div>
      <div className="ts-sent-cat">{cat}</div>
    </div>
  );
};

export default Index;