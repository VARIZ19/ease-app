"use client";

import { useEffect, useState } from "react";
import { Users, TrendingUp, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeads() {
      const token = localStorage.getItem("ease_admin_token");
      try {
        const res = await fetch("/api/leads", {
          headers: { "x-admin-token": token || "" },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch leads");

        setLeads(data.leads || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const newLeadsCount = leads.filter(l => l.status === "new").length;

  return (
    <div>
      <h1 className="display" style={{ fontSize: "32px", marginBottom: "24px" }}>Overview</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "12px", background: "var(--purple-dim)", borderRadius: "12px", color: "var(--violet-500)" }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ color: "var(--text-2)", fontSize: "14px" }}>Total Leads</div>
            <div style={{ fontSize: "24px", fontWeight: "600", fontFamily: "var(--font-mono)" }}>{leads.length}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "12px", background: "rgba(34, 197, 94, 0.12)", borderRadius: "12px", color: "var(--green)" }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ color: "var(--text-2)", fontSize: "14px" }}>New Requests</div>
            <div style={{ fontSize: "24px", fontWeight: "600", fontFamily: "var(--font-mono)" }}>{newLeadsCount}</div>
          </div>
        </div>
      </div>

      <h2 className="display" style={{ fontSize: "24px", marginBottom: "16px" }}>Recent Leads</h2>

      <div className="glass-panel" style={{ overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-2)" }}>Loading leads...</div>
        ) : error ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <AlertCircle size={18} /> {error}
          </div>
        ) : leads.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-2)" }}>No leads found yet.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-2)", background: "rgba(0,0,0,0.2)" }}>
                <th style={{ padding: "16px", color: "var(--text-2)", fontWeight: "500", fontSize: "14px" }}>Date</th>
                <th style={{ padding: "16px", color: "var(--text-2)", fontWeight: "500", fontSize: "14px" }}>Name</th>
                <th style={{ padding: "16px", color: "var(--text-2)", fontWeight: "500", fontSize: "14px" }}>Email</th>
                <th style={{ padding: "16px", color: "var(--text-2)", fontWeight: "500", fontSize: "14px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: "1px solid var(--border-2)", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: "16px", color: "var(--text-2)", fontSize: "14px" }}>
                    {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td style={{ padding: "16px", fontWeight: "500" }}>{lead.name}</td>
                  <td style={{ padding: "16px" }}><a href={`mailto:${lead.email}`} style={{ color: "var(--text-2)" }}>{lead.email}</a></td>
                  <td style={{ padding: "16px" }}>
                    <span style={{
                      padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "600",
                      background: lead.status === 'new' ? 'rgba(74,222,128,0.1)' : 'var(--border-2)',
                      color: lead.status === 'new' ? '#4ade80' : 'var(--text-2)'
                    }}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
