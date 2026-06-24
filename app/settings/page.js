"use client";

import { GitBranch, Cloud, Code } from "lucide-react";

export default function Settings() {
  return (
    <div>
      <h1 className="display" style={{ fontSize: "32px", marginBottom: "8px" }}>Integrations & Settings</h1>
      <p style={{ color: "var(--text-2)", marginBottom: "32px" }}>Manage connected services for Ease Automation.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", maxWidth: "800px" }}>
        
        {/* GitHub Integration */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "flex-start", gap: "20px" }}>
          <div style={{ padding: "12px", background: "var(--surface-2)", borderRadius: "12px", color: "var(--text)" }}>
            <GitBranch size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>GitHub Repository</h3>
            <p style={{ color: "var(--text-2)", fontSize: "14px", marginBottom: "16px" }}>Connect to github.com/variz/web to manage code deployments and view recent commits directly from the dashboard.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn-primary" style={{ background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border-2)" }}>Configure Connection</button>
              <a href="https://github.com/variz" target="_blank" rel="noreferrer" style={{ padding: "12px 24px", borderRadius: "8px", fontWeight: "600", color: "var(--violet-400)", display: "inline-flex", alignItems: "center" }}>View on GitHub →</a>
            </div>
          </div>
        </div>

        {/* Vercel Integration */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "flex-start", gap: "20px" }}>
          <div style={{ padding: "12px", background: "var(--surface-2)", borderRadius: "12px", color: "var(--text)" }}>
            <Cloud size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>Vercel Deployments</h3>
            <p style={{ color: "var(--text-2)", fontSize: "14px", marginBottom: "16px" }}>Manage production and preview deployments for easeautomation.vercel.app.</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn-primary" style={{ background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border-2)" }}>Connect Vercel Account</button>
              <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" style={{ padding: "12px 24px", borderRadius: "8px", fontWeight: "600", color: "var(--violet-400)", display: "inline-flex", alignItems: "center" }}>Open Vercel →</a>
            </div>
          </div>
        </div>

        {/* Development & API */}
        <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "flex-start", gap: "20px" }}>
          <div style={{ padding: "12px", background: "var(--surface-2)", borderRadius: "12px", color: "var(--text)" }}>
            <Code size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>API & Supabase Keys</h3>
            <p style={{ color: "var(--text-2)", fontSize: "14px", marginBottom: "16px" }}>Your current application is using the environment variables defined in <code style={{ background: "var(--bg)", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>.env.local</code>.</p>
            <div style={{ background: "var(--bg)", padding: "16px", borderRadius: "8px", border: "1px solid var(--border-2)", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-2)", textTransform: "uppercase", marginBottom: "4px" }}>Supabase URL</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--green)" }}>Connected</div>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "var(--text-2)", textTransform: "uppercase", marginBottom: "4px" }}>Admin Token Auth</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--green)" }}>Active</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
