import { useState, useEffect } from "react";

const ADMIN_USER = "admin";
const ADMIN_PASS = "rts2026";
const PAGES = ["Home", "About Us", "History", "Regatta", "Projects", "Tablers"];

// ── Supabase config ──────────────────────────────────────────────────────────
// Replace these two values with your Supabase project URL and anon key.
// In Vercel: add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY as environment variables.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

async function supabaseGet(table) {
  if (!SUPABASE_URL) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=id.asc&limit=1`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0]?.data || null;
}

async function supabaseUpsert(table, id, data) {
  if (!SUPABASE_URL) return;
  await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({ id, data }),
  });
}
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_DATA = {
  Home: {
    heroBanner: { headline: "Adopt. Adapt. Improve.", subtext: "Round Table Seychelles — serving our community since 1973.", bannerImage: "rts-group-outdoor.jpg" },
    intro: { heading: "What is Round Table Seychelles?", text: "Round Table Seychelles is a vibrant branch of the international service organization known for its commitment to community service, fellowship, and the development of young men." },
    sections: [
      { title: "Why Join Round Table", text: "Be part of a brotherhood committed to service, friendship, and making a real difference in the Seychelles community." },
      { title: "Meet the Tablers", text: "Our members come from all walks of life, united by a shared commitment to community service and fellowship." },
      { title: "Upcoming Activities", text: "Stay tuned for our next events, meetings, and community initiatives." },
    ],
    cta: "Join Round Table Seychelles",
  },
  "About Us": {
    heroBanner: { headline: "About Round Table Seychelles", subtext: "Our story, our mission, our people.", bannerImage: "rts-group-outdoor.jpg" },
    overview: "Round Table Seychelles is a vibrant branch of the international Round Table service organization, chartered under ARTIO and ARTEA, becoming autonomous in 2006.",
    vision: "A world where every young man serves, leads, and makes a lasting difference.",
    mission: "To unite young men in fellowship and service for the benefit of the Seychellois community.",
    values: "Friendship, Service, Leadership, Fellowship, Integrity.",
    leadershipHeading: "Our Leadership",
  },
  History: {
    heroBanner: { headline: "Our Legacy", subtext: "Over 50 years of service, fellowship, and community impact.", bannerImage: "rts-group-outdoor.jpg" },
    intro: "Round Table Seychelles has a rich history deeply rooted in community service and international fellowship, beginning in 1973.",
    milestones: [
      { year: "1973", text: "Chartered as a member of the Association of Round Tables of Eastern Africa (ARTEA)." },
      { year: "1974", text: "Became a member of WOCO. RT 22 Seychelles was formed." },
      { year: "1978", text: "Hosted one of the pre-Tours of the WOCO meeting." },
      { year: "1985", text: "Left ARTEA with Mauritius and founded the Association of Round Tables of the Indian Ocean (ARTIO)." },
      { year: "2006", text: "Mauritius left ARTIO, leaving RT Seychelles as the sole member." },
      { year: "2008", text: "RT Seychelles altered the colors on the emblem." },
      { year: "2011", text: "Changed the emblem to the Coco de Mer shell and adopted a new logo." },
      { year: "2013", text: "Hosted the Africa Region Meeting in Seychelles." },
    ],
  },
  Regatta: {
    heroBanner: { headline: "The RTS Regatta", subtext: "Seychelles' biggest annual fundraising festival.", bannerImage: "rts-regatta-hero.jpg" },
    intro: "The Round Table Seychelles Regatta is the organisation's flagship annual fundraising event, held over a long weekend at Beau Vallon Beach on Mahé.",
    body: "The Regatta features sports competitions, the Miss Regatta pageant, a Greasy Pole Contest, live performances, a lottery draw, food stalls, and water sports. It brings together sports, youth, culture, and tourism in one spectacular celebration.",
    missRegattaWinners: [
      { year: "2025", name: "Gaelle Morel", note: "Miss Regatta Kreolite 2025 — First Princess: Nathalia Larue, Second Princess: Trisha Mondon" },
      { year: "2023", name: "Emmaline Contoret", note: "Regatta50 — First Princess: Zelka Bistoquet, Second Princess: Sylvie Rose" },
      { year: "2019", name: "Emilie Esparon", note: "First Princess: Beverly Brioche, Second Princess: Velma Sinon" },
      { year: "2018", name: "Gabriella Gonthier", note: "Later won Miss University Africa Tourism 2021" },
    ],
  },
  Projects: {
    heroBanner: { headline: "Our Projects", subtext: "Making a real difference in Seychelles communities.", bannerImage: "rts-group-outdoor.jpg" },
    intro: "RTS funds and runs community service projects primarily through Regatta proceeds and other fundraising activities.",
    projects: [
      { title: "Prostate Diagnostic Cancer Equipment", description: "Equipment donated to the Ministry of Health to support prostate cancer diagnosis.", status: "Completed" },
      { title: "School Water Fountains Initiative", description: "In partnership with Air Seychelles, donated over 100 water fountains to schools across the islands.", status: "Completed" },
      { title: "School for the Exceptional Child", description: "Funded a newly constructed block using Regatta proceeds.", status: "Completed" },
      { title: "Pneumonia Vaccination Programme", description: "Contributed to a five-year vaccination programme against pneumonia.", status: "Completed" },
      { title: "Shop 4 Hope", description: "A second-hand shop opened by RTS as an ongoing fundraising venture.", status: "Ongoing" },
      { title: "SSPCA Support", description: "Ongoing support for the Seychelles Society for the Prevention of Cruelty to Animals.", status: "Ongoing" },
      { title: "Ladies Circle Seychelles Partnership", description: "Supporting menstrual health education initiatives.", status: "Completed" },
      { title: "Beau Vallon Community Centre IT Room", description: "Funded the setup of an IT room at the Beau Vallon community centre.", status: "Completed" },
      { title: "Sports Facility Renovations", description: "Contributed to local sports facility renovations and donated medical equipment.", status: "Completed" },
    ],
  },
  Tablers: {
    heroBanner: { headline: "Meet the Tablers", subtext: "The people behind the mission.", bannerImage: "rts-group-outdoor.jpg" },
    intro: "Our members come from all walks of life, united by a shared commitment to community service and fellowship.",
    members: [
      { name: "Alex Henderson", role: "RTS President", photo: "rts-team-alexhenderson.jpg" },
      { name: "Miguel Nolin", role: "Chairman RTS 2", photo: "" },
      { name: "Darren Low Hong", role: "Vice Chairman", photo: "rts-team-darrenlhong.jpg" },
      { name: "Christopher Nicette", role: "Honorary Secretary", photo: "rts-team-christophernicette.jpg" },
      { name: "Sebastian Melanie", role: "Honorary Treasurer", photo: "rts-team-sebastianmelanie.jpg" },
      { name: "Christophe Gabriel", role: "Community Councillor", photo: "rts-team-christophegabriel.jpg" },
      { name: "Alex Freminot", role: "Entertainment & Fund Raising Officer", photo: "rts-team-alexfreminot.jpg" },
      { name: "Andrew Palmyre", role: "International Relationship Officer", photo: "rts-team-andrewpalmyre.jpg" },
      { name: "Arnold Loizeau", role: "RTS 2 Tabler", photo: "rts-team-arnoldloizeau.jpg" },
      { name: "Allesandre Fontaine", role: "RTS 2 Tabler", photo: "rts-team-allesandrefontaine.jpg" },
      { name: "Luigi Marguerite", role: "RTS Tabler", photo: "rts-team-luigimarguerite.jpg" },
      { name: "Laurent Pool", role: "RTS 2 Tabler", photo: "" },
      { name: "Christian Pillay", role: "RTS 2 Tabler", photo: "" },
      { name: "James Hoareau", role: "RTS Tabler", photo: "" },
    ],
  },
};

const RTS_ORANGE = "#F88C24";
const RTS_DARK = "#08142C";

// RTS Logo SVG (inline, matches official wheel emblem style)
function RTSLogo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill={RTS_ORANGE} />
      <circle cx="50" cy="50" r="42" fill="#111" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 14 * Math.cos(rad);
        const y1 = 50 + 14 * Math.sin(rad);
        const x2 = 50 + 40 * Math.cos(rad);
        const y2 = 50 + 40 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 2 === 0 ? "#fff" : "#111"} strokeWidth="5" />;
      })}
      <circle cx="50" cy="50" r="14" fill="#111" stroke="#fff" strokeWidth="2" />
      <circle cx="50" cy="50" r="9" fill="#fff" />
      <circle cx="50" cy="50" r="5" fill="#111" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={RTS_ORANGE} strokeWidth="2" />
    </svg>
  );
}

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activePage, setActivePage] = useState("Home");
  const [activeSection, setActiveSection] = useState("Banner");
  const [data, setData] = useState(DEFAULT_DATA);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dbStatus, setDbStatus] = useState(SUPABASE_URL ? "connected" : "local");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("rts_admin_session");
    if (session === "active") setLoggedIn(true);
    async function loadData() {
      const remote = await supabaseGet("rts_site_content");
      if (remote) {
        setData(remote);
        setDbStatus("connected");
      } else {
        const local = localStorage.getItem("rts_admin_data");
        if (local) try { setData(JSON.parse(local)); } catch {}
        if (SUPABASE_URL) setDbStatus("error");
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setLoggedIn(true);
      localStorage.setItem("rts_admin_session", "active");
      setLoginError("");
    } else {
      setLoginError("Incorrect username or password.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("rts_admin_session");
  };

  const saveData = async (newData) => {
    setData(newData);
    setSaving(true);
    localStorage.setItem("rts_admin_data", JSON.stringify(newData));
    await supabaseUpsert("rts_site_content", 1, newData);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const updateField = (page, section, field, value) => {
    const newData = { ...data, [page]: { ...data[page], [section]: { ...data[page][section], [field]: value } } };
    saveData(newData);
  };

  const updateTopField = (page, field, value) => {
    const newData = { ...data, [page]: { ...data[page], [field]: value } };
    saveData(newData);
  };

  const updateArrayItem = (page, arrayKey, index, newItem) => {
    const arr = [...data[page][arrayKey]];
    arr[index] = newItem;
    saveData({ ...data, [page]: { ...data[page], [arrayKey]: arr } });
  };

  const addArrayItem = (page, arrayKey, template) => {
    const arr = [...(data[page][arrayKey] || []), template];
    saveData({ ...data, [page]: { ...data[page], [arrayKey]: arr } });
  };

  const removeArrayItem = (page, arrayKey, index) => {
    const arr = data[page][arrayKey].filter((_, i) => i !== index);
    saveData({ ...data, [page]: { ...data[page], [arrayKey]: arr } });
  };

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: RTS_DARK, padding: "2rem" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "2.5rem", width: "100%", maxWidth: 400, boxShadow: "0 12px 60px rgba(0,0,0,0.4)" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            {/* RTS Logo */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <RTSLogo size={72} />
            </div>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: RTS_ORANGE, margin: "0 0 4px" }}>Round Table Seychelles</p>
            <h1 style={{ fontSize: 20, fontWeight: 500, color: RTS_DARK, margin: 0 }}>Admin Panel</h1>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0.25rem 0 0" }}>Sign in to manage your website content</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="admin" style={{ width: "100%", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="••••••••" style={{ width: "100%", boxSizing: "border-box" }} />
            </div>
            {loginError && <p style={{ color: "var(--text-danger)", fontSize: 13, margin: 0 }}>{loginError}</p>}
            <button onClick={handleLogin} style={{ background: RTS_ORANGE, color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 15, fontWeight: 500, cursor: "pointer", marginTop: 4 }}>
              Sign in
            </button>
          </div>

          {/* Deployment stack badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: "1.75rem" }}>
            {["Vercel", "GitHub", "Supabase"].map(s => (
              <span key={s} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: s === "Supabase" ? "#3ECF8E22" : s === "Vercel" ? "#00000011" : "#f0f0f0", color: s === "Supabase" ? "#107340" : "#444", border: "0.5px solid #ddd" }}>{s}</span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginTop: "0.75rem", marginBottom: 0 }}>Access restricted to authorized administrators only.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: RTS_DARK }}>
        <div style={{ textAlign: "center" }}>
          <RTSLogo size={56} />
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 16, fontSize: 14 }}>Loading content…</p>
        </div>
      </div>
    );
  }

  const pd = data[activePage];
  const sections = {
    Home: ["Banner", "Intro", "Sections", "CTA"],
    "About Us": ["Banner", "Overview", "Vision & Mission", "Leadership"],
    History: ["Banner", "Intro", "Timeline"],
    Regatta: ["Banner", "Content", "Miss Regatta Winners"],
    Projects: ["Banner", "Intro", "Projects List"],
    Tablers: ["Banner", "Intro", "Members"],
  };

  const statusColor = dbStatus === "connected" ? "#3ECF8E" : dbStatus === "error" ? "#f87171" : "#aaa";
  const statusLabel = dbStatus === "connected" ? "Supabase connected" : dbStatus === "error" ? "Supabase error — saving locally" : "Local storage only";

  // ── Main panel ────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "var(--font-sans)", background: "var(--surface-0)" }}>

      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? 230 : 0, minWidth: sidebarOpen ? 230 : 0, overflow: "hidden", background: RTS_DARK, transition: "all 0.2s", flexShrink: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.25rem 1rem 0" }}>
          {/* Logo + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
            <RTSLogo size={38} />
            <div>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: 0 }}>RTS Admin</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, margin: 0 }}>Website Manager</p>
            </div>
          </div>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.5rem" }}>Pages</p>
          {PAGES.map(page => (
            <button key={page} onClick={() => { setActivePage(page); setActiveSection(sections[page][0]); }}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: activePage === page ? 500 : 400, background: activePage === page ? "rgba(249,140,36,0.18)" : "transparent", color: activePage === page ? RTS_ORANGE : "rgba(255,255,255,0.72)", marginBottom: 2 }}>
              <i className="ti ti-layout-dashboard" style={{ fontSize: 14 }} aria-hidden="true"></i>
              {page}
            </button>
          ))}
        </div>

        {/* DB status + logout */}
        <div style={{ marginTop: "auto", padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: statusColor, flexShrink: 0 }}></span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{statusLabel}</span>
          </div>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 13, cursor: "pointer", padding: 0 }}>
            <i className="ti ti-logout" style={{ fontSize: 14 }} aria-hidden="true"></i> Sign out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Top bar */}
        <header style={{ background: "var(--surface-2)", borderBottom: "0.5px solid var(--border)", padding: "0 1.25rem", height: 52, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }} aria-label="Toggle sidebar">
            <i className="ti ti-menu-2" style={{ fontSize: 18, color: "var(--text-secondary)" }} aria-hidden="true"></i>
          </button>
          <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{activePage}</span>
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>/ {activeSection}</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            {saving && <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Saving…</span>}
            {saved && !saving && (
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "var(--text-success)" }}>
                <i className="ti ti-check" style={{ fontSize: 14 }} aria-hidden="true"></i> Saved
              </span>
            )}
          </div>
        </header>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Section nav */}
          <nav style={{ width: 164, borderRight: "0.5px solid var(--border)", background: "var(--surface-1)", padding: "1rem 0.75rem", flexShrink: 0 }}>
            <p style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, marginTop: 0 }}>Sections</p>
            {(sections[activePage] || []).map(sec => (
              <button key={sec} onClick={() => setActiveSection(sec)}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 8px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, background: activeSection === sec ? "var(--bg-accent)" : "transparent", color: activeSection === sec ? "var(--text-accent)" : "var(--text-secondary)", marginBottom: 2, fontWeight: activeSection === sec ? 500 : 400 }}>
                {sec}
              </button>
            ))}
          </nav>

          {/* Editor pane */}
          <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>
            <h2 style={{ fontSize: 16, fontWeight: 500, margin: "0 0 1.25rem", color: "var(--text-primary)" }}>
              {activeSection}
              <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 400, marginLeft: 8 }}>— {activePage} page</span>
            </h2>

            {/* ── Banner ── */}
            {activeSection === "Banner" && pd?.heroBanner && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <FieldCard label="Headline">
                  <input value={pd.heroBanner.headline} onChange={e => updateField(activePage, "heroBanner", "headline", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                </FieldCard>
                <FieldCard label="Sub-text">
                  <input value={pd.heroBanner.subtext} onChange={e => updateField(activePage, "heroBanner", "subtext", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                </FieldCard>
                <FieldCard label="Banner image filename">
                  <input value={pd.heroBanner.bannerImage} onChange={e => updateField(activePage, "heroBanner", "bannerImage", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                  <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "4px 0 0" }}>Enter the renamed image filename, e.g. rts-group-outdoor.jpg</p>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "0.5px solid var(--border)" }}>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Preview</p>
                    <div style={{ background: RTS_DARK, borderRadius: 8, padding: "2rem 1.5rem" }}>
                      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, margin: "0 0 4px" }}>Image: {pd.heroBanner.bannerImage}</p>
                      <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 500, margin: "0 0 6px" }}>{pd.heroBanner.headline}</h3>
                      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: 0 }}>{pd.heroBanner.subtext}</p>
                    </div>
                  </div>
                </FieldCard>
              </div>
            )}

            {/* ── Home: Intro ── */}
            {activePage === "Home" && activeSection === "Intro" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <FieldCard label="Section heading">
                  <input value={pd.intro.heading} onChange={e => updateField("Home", "intro", "heading", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                </FieldCard>
                <FieldCard label="Intro text">
                  <textarea value={pd.intro.text} onChange={e => updateField("Home", "intro", "text", e.target.value)} rows={4} style={{ width: "100%", boxSizing: "border-box" }} />
                </FieldCard>
              </div>
            )}

            {/* ── Home: Sections ── */}
            {activePage === "Home" && activeSection === "Sections" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {pd.sections.map((sec, i) => (
                  <div key={i} style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>Section {i + 1}</span>
                      <button onClick={() => removeArrayItem("Home", "sections", i)} style={{ background: "transparent", border: "none", color: "var(--text-danger)", cursor: "pointer" }}>
                        <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true"></i>
                      </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <input placeholder="Title" value={sec.title} onChange={e => updateArrayItem("Home", "sections", i, { ...sec, title: e.target.value })} style={{ width: "100%", boxSizing: "border-box" }} />
                      <textarea placeholder="Text" value={sec.text} onChange={e => updateArrayItem("Home", "sections", i, { ...sec, text: e.target.value })} rows={3} style={{ width: "100%", boxSizing: "border-box" }} />
                    </div>
                  </div>
                ))}
                <AddBtn onClick={() => addArrayItem("Home", "sections", { title: "New Section", text: "" })}>+ Add section</AddBtn>
              </div>
            )}

            {/* ── Home: CTA ── */}
            {activePage === "Home" && activeSection === "CTA" && (
              <FieldCard label="Call-to-action button text">
                <input value={pd.cta} onChange={e => updateTopField("Home", "cta", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "0.5px solid var(--border)" }}>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Preview</p>
                  <button style={{ background: RTS_ORANGE, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 500, cursor: "default" }}>{pd.cta}</button>
                </div>
              </FieldCard>
            )}

            {/* ── About Us ── */}
            {activePage === "About Us" && activeSection === "Overview" && (
              <FieldCard label="Organization overview"><textarea value={pd.overview} onChange={e => updateTopField("About Us", "overview", e.target.value)} rows={5} style={{ width: "100%", boxSizing: "border-box" }} /></FieldCard>
            )}
            {activePage === "About Us" && activeSection === "Vision & Mission" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <FieldCard label="Vision"><textarea value={pd.vision} onChange={e => updateTopField("About Us", "vision", e.target.value)} rows={3} style={{ width: "100%", boxSizing: "border-box" }} /></FieldCard>
                <FieldCard label="Mission"><textarea value={pd.mission} onChange={e => updateTopField("About Us", "mission", e.target.value)} rows={3} style={{ width: "100%", boxSizing: "border-box" }} /></FieldCard>
                <FieldCard label="Core values"><textarea value={pd.values} onChange={e => updateTopField("About Us", "values", e.target.value)} rows={3} style={{ width: "100%", boxSizing: "border-box" }} /></FieldCard>
              </div>
            )}
            {activePage === "About Us" && activeSection === "Leadership" && (
              <FieldCard label="Leadership section heading">
                <input value={pd.leadershipHeading} onChange={e => updateTopField("About Us", "leadershipHeading", e.target.value)} style={{ width: "100%", boxSizing: "border-box" }} />
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "8px 0 0" }}>To edit individual Tabler profiles, go to the Tablers page.</p>
              </FieldCard>
            )}

            {/* ── History ── */}
            {activePage === "History" && activeSection === "Intro" && (
              <FieldCard label="History intro text"><textarea value={pd.intro} onChange={e => updateTopField("History", "intro", e.target.value)} rows={5} style={{ width: "100%", boxSizing: "border-box" }} /></FieldCard>
            )}
            {activePage === "History" && activeSection === "Timeline" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {pd.milestones.map((m, i) => (
                  <div key={i} style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 18, fontWeight: 500, color: RTS_ORANGE }}>{m.year}</span>
                      <button onClick={() => removeArrayItem("History", "milestones", i)} style={{ background: "transparent", border: "none", color: "var(--text-danger)", cursor: "pointer" }}>
                        <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true"></i>
                      </button>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input placeholder="Year" value={m.year} onChange={e => updateArrayItem("History", "milestones", i, { ...m, year: e.target.value })} style={{ width: 80 }} />
                      <textarea placeholder="Description" value={m.text} onChange={e => updateArrayItem("History", "milestones", i, { ...m, text: e.target.value })} rows={2} style={{ flex: 1, boxSizing: "border-box" }} />
                    </div>
                  </div>
                ))}
                <AddBtn onClick={() => addArrayItem("History", "milestones", { year: "YYYY", text: "" })}>+ Add milestone</AddBtn>
              </div>
            )}

            {/* ── Regatta ── */}
            {activePage === "Regatta" && activeSection === "Content" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <FieldCard label="Intro paragraph"><textarea value={pd.intro} onChange={e => updateTopField("Regatta", "intro", e.target.value)} rows={4} style={{ width: "100%", boxSizing: "border-box" }} /></FieldCard>
                <FieldCard label="Main body text"><textarea value={pd.body} onChange={e => updateTopField("Regatta", "body", e.target.value)} rows={6} style={{ width: "100%", boxSizing: "border-box" }} /></FieldCard>
              </div>
            )}
            {activePage === "Regatta" && activeSection === "Miss Regatta Winners" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {pd.missRegattaWinners.map((w, i) => (
                  <div key={i} style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: RTS_ORANGE }}>{w.year} — {w.name}</span>
                      <button onClick={() => removeArrayItem("Regatta", "missRegattaWinners", i)} style={{ background: "transparent", border: "none", color: "var(--text-danger)", cursor: "pointer" }}>
                        <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true"></i>
                      </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input placeholder="Year" value={w.year} onChange={e => updateArrayItem("Regatta", "missRegattaWinners", i, { ...w, year: e.target.value })} style={{ width: 80 }} />
                        <input placeholder="Winner name" value={w.name} onChange={e => updateArrayItem("Regatta", "missRegattaWinners", i, { ...w, name: e.target.value })} style={{ flex: 1, boxSizing: "border-box" }} />
                      </div>
                      <input placeholder="Notes (e.g. princesses)" value={w.note} onChange={e => updateArrayItem("Regatta", "missRegattaWinners", i, { ...w, note: e.target.value })} style={{ width: "100%", boxSizing: "border-box" }} />
                    </div>
                  </div>
                ))}
                <AddBtn onClick={() => addArrayItem("Regatta", "missRegattaWinners", { year: "", name: "", note: "" })}>+ Add winner</AddBtn>
              </div>
            )}

            {/* ── Projects ── */}
            {activePage === "Projects" && activeSection === "Intro" && (
              <FieldCard label="Projects intro text"><textarea value={pd.intro} onChange={e => updateTopField("Projects", "intro", e.target.value)} rows={4} style={{ width: "100%", boxSizing: "border-box" }} /></FieldCard>
            )}
            {activePage === "Projects" && activeSection === "Projects List" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {pd.projects.map((p, i) => (
                  <div key={i} style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{p.title}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: p.status === "Ongoing" ? "#3ECF8E22" : p.status === "Upcoming" ? "#F88C2422" : "#88888822", color: p.status === "Ongoing" ? "#107340" : p.status === "Upcoming" ? "#a05000" : "#555" }}>{p.status}</span>
                        <button onClick={() => removeArrayItem("Projects", "projects", i)} style={{ background: "transparent", border: "none", color: "var(--text-danger)", cursor: "pointer" }}>
                          <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <input placeholder="Project title" value={p.title} onChange={e => updateArrayItem("Projects", "projects", i, { ...p, title: e.target.value })} style={{ width: "100%", boxSizing: "border-box" }} />
                      <textarea placeholder="Description" value={p.description} onChange={e => updateArrayItem("Projects", "projects", i, { ...p, description: e.target.value })} rows={2} style={{ width: "100%", boxSizing: "border-box" }} />
                      <select value={p.status} onChange={e => updateArrayItem("Projects", "projects", i, { ...p, status: e.target.value })} style={{ width: 160 }}>
                        <option>Ongoing</option>
                        <option>Completed</option>
                        <option>Upcoming</option>
                      </select>
                    </div>
                  </div>
                ))}
                <AddBtn onClick={() => addArrayItem("Projects", "projects", { title: "New Project", description: "", status: "Upcoming" })}>+ Add project</AddBtn>
              </div>
            )}

            {/* ── Tablers ── */}
            {activePage === "Tablers" && activeSection === "Intro" && (
              <FieldCard label="Tablers page intro text"><textarea value={pd.intro} onChange={e => updateTopField("Tablers", "intro", e.target.value)} rows={4} style={{ width: "100%", boxSizing: "border-box" }} /></FieldCard>
            )}
            {activePage === "Tablers" && activeSection === "Members" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 4px" }}>Edit names, roles, and profile photo filenames below.</p>
                {pd.members.map((m, i) => (
                  <div key={i} style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: RTS_ORANGE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}>{m.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}</span>
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{m.name || "—"}</p>
                          <p style={{ margin: 0, fontSize: 12, color: "var(--text-secondary)" }}>{m.role || "No role set"}</p>
                        </div>
                      </div>
                      <button onClick={() => removeArrayItem("Tablers", "members", i)} style={{ background: "transparent", border: "none", color: "var(--text-danger)", cursor: "pointer" }}>
                        <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true"></i>
                      </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input placeholder="Full name" value={m.name} onChange={e => updateArrayItem("Tablers", "members", i, { ...m, name: e.target.value })} style={{ flex: 1, boxSizing: "border-box" }} />
                        <input placeholder="Role / title" value={m.role} onChange={e => updateArrayItem("Tablers", "members", i, { ...m, role: e.target.value })} style={{ flex: 1, boxSizing: "border-box" }} />
                      </div>
                      <input placeholder="Photo filename (e.g. rts-team-name.jpg)" value={m.photo} onChange={e => updateArrayItem("Tablers", "members", i, { ...m, photo: e.target.value })} style={{ width: "100%", boxSizing: "border-box" }} />
                      {!m.photo && <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0 }}>No photo set — placeholder avatar will show.</p>}
                    </div>
                  </div>
                ))}
                <AddBtn onClick={() => addArrayItem("Tablers", "members", { name: "", role: "", photo: "" })}>+ Add member</AddBtn>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function FieldCard({ label, children }) {
  return (
    <div style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>
      <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 8, fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

function AddBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ background: "transparent", border: `1px dashed #F88C24`, color: "#F88C24", borderRadius: 8, padding: "9px 0", cursor: "pointer", fontSize: 13, width: "100%" }}>
      {children}
    </button>
  );
}
