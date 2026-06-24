"use client";

import { useState } from "react";
import { generatePostPrompt, generateStartupPitchPrompt, generateFullBrandPrompt } from "./promptsData";
import { Copy } from "lucide-react";

export default function Prompts() {
  const [activeTab, setActiveTab] = useState("post");
  const [output, setOutput] = useState("");
  
  // Post states
  const [postPlatform, setPostPlatform] = useState("Instagram");
  const [postTheme, setPostTheme] = useState("Pain Point");
  const [postAuto, setPostAuto] = useState("Lead Capture → CRM (saves 40 hrs/mo)");
  const [postAudience, setPostAudience] = useState("Startup Founders");
  const [postTone, setPostTone] = useState("Sharp & Minimal");

  // Startup Pitch states
  const [startupType, setStartupType] = useState("saas");
  const [startupPlatform, setStartupPlatform] = useState("LinkedIn DM");

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div>
      <h1 className="display" style={{ fontSize: "32px", marginBottom: "8px" }}>Prompt Generator</h1>
      <p style={{ color: "var(--text-2)", marginBottom: "32px" }}>Generate ready-to-use prompts for content, pitches, and design.</p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", overflowX: "auto", background: "var(--surface)", padding: "8px", borderRadius: "12px", border: "1px solid var(--border)" }}>
        {[{ id: "post", label: "📸 Posts" }, { id: "startup", label: "🚀 Startup Send" }, { id: "brand", label: "🎨 Brand Kit" }].map(t => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); setOutput(""); }}
            style={{
              padding: "10px 16px", borderRadius: "8px", whiteSpace: "nowrap",
              background: activeTab === t.id ? "var(--surface-2)" : "transparent",
              color: activeTab === t.id ? "var(--text)" : "var(--text-2)",
              border: activeTab === t.id ? "1px solid var(--border-2)" : "1px solid transparent",
              transition: "all 0.2s"
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: "32px" }}>
        {activeTab === "post" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 className="display" style={{ fontSize: "20px", color: "var(--green)" }}>Social Post Prompt</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--text-2)" }}>Platform</label>
                <select value={postPlatform} onChange={e => setPostPlatform(e.target.value)}>
                  <option>Instagram</option><option>LinkedIn</option><option>Twitter / X</option><option>All 3 platforms</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--text-2)" }}>Post Theme</label>
                <select value={postTheme} onChange={e => setPostTheme(e.target.value)}>
                  <option>Pain Point</option><option>Social Proof / Result</option><option>Automation Showcase</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--text-2)" }}>Automation to Feature</label>
              <select value={postAuto} onChange={e => setPostAuto(e.target.value)}>
                <option>Lead Capture → CRM (saves 40 hrs/mo)</option>
                <option>Cold Outreach Machine (saves 50 hrs/mo)</option>
                <option>Invoice Auto-Generator (saves 25 hrs/mo)</option>
              </select>
            </div>
            <button className="btn-primary" onClick={() => setOutput(generatePostPrompt({ platform: postPlatform, theme: postTheme, auto: postAuto, audience: postAudience, tone: postTone }))}>
              ⚡ Generate Post Prompt
            </button>
          </div>
        )}

        {activeTab === "startup" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 className="display" style={{ fontSize: "20px", color: "var(--green)" }}>Startup Pitch Prompt</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--text-2)" }}>Startup Type</label>
                <select value={startupType} onChange={e => setStartupType(e.target.value)}>
                  <option value="saas">SaaS Startup</option><option value="ecom">E-commerce Brand</option>
                  <option value="agency">Marketing Agency</option><option value="realestate">Real Estate Business</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", color: "var(--text-2)" }}>Platform</label>
                <select value={startupPlatform} onChange={e => setStartupPlatform(e.target.value)}>
                  <option>LinkedIn DM</option><option>Email</option><option>WhatsApp</option>
                </select>
              </div>
            </div>
            <button className="btn-primary" onClick={() => setOutput(generateStartupPitchPrompt({ type: startupType, platform: startupPlatform }))}>
              🚀 Generate Pitch Prompt
            </button>
          </div>
        )}

        {activeTab === "brand" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 className="display" style={{ fontSize: "20px", color: "var(--green)" }}>Brand Kit Reference</h2>
            <p style={{ color: "var(--text-2)", fontSize: "14px" }}>Generate the master brand prompt for ChatGPT/Claude.</p>
            <button className="btn-primary" onClick={() => setOutput(generateFullBrandPrompt())}>
              🎨 Copy Full Brand Prompt
            </button>
          </div>
        )}

        {output && (
          <div style={{ marginTop: "32px", padding: "20px", background: "var(--bg)", border: "1px solid var(--border-2)", borderRadius: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", color: "var(--green)", fontWeight: "600", textTransform: "uppercase" }}>📋 Prompt Ready</span>
              <button onClick={handleCopy} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-2)", padding: "6px 12px", border: "1px solid var(--border-2)", borderRadius: "6px", transition: "all 0.2s" }} onMouseOver={e => {e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--green)"}} onMouseOut={e => {e.currentTarget.style.color = "var(--text-2)"; e.currentTarget.style.borderColor = "var(--border-2)"}}>
                <Copy size={14} /> Copy
              </button>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-2)", lineHeight: "1.6", maxHeight: "400px", overflowY: "auto" }}>
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
