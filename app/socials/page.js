"use client";

import { useState } from "react";
import { Share2, Check, Loader2, Image as ImageIcon } from "lucide-react";

export default function Socials() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [results, setResults] = useState(null);

  const handleUpload = async () => {
    if (!text.trim()) return;
    
    setIsUploading(true);
    setUploadStatus(null);
    setResults(null);
    
    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'ease_admin_2025'
        },
        body: JSON.stringify({ text, imageUrl })
      });
      const data = await res.json();
      
      if (res.ok) {
        setUploadStatus('success');
        setResults(data.results);
      } else {
        setUploadStatus('error');
      }
    } catch (e) {
      setUploadStatus('error');
    }
    setIsUploading(false);
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <h1 className="display" style={{ fontSize: "32px", marginBottom: "8px" }}>Social Publisher</h1>
      <p style={{ color: "var(--text-2)", marginBottom: "32px" }}>Post your generated prompts directly to WhatsApp, Instagram, and Twitter from one place.</p>

      <div className="glass-panel" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "var(--text)", fontWeight: "600" }}>Post Content</label>
          <textarea 
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your generated prompt or write a new post here..."
            style={{ 
              width: "100%", height: "200px", padding: "16px", borderRadius: "8px", 
              background: "var(--bg)", border: "1px solid var(--border-2)", 
              color: "var(--text)", fontFamily: "var(--font-mono)", fontSize: "14px",
              resize: "vertical"
            }}
          />
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "14px", color: "var(--text)", fontWeight: "600" }}>
            <ImageIcon size={16} /> Optional Media URL (Required for Instagram)
          </label>
          <input 
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            style={{ 
              width: "100%", padding: "12px 16px", borderRadius: "8px", 
              background: "var(--bg)", border: "1px solid var(--border-2)", 
              color: "var(--text)", fontSize: "14px"
            }}
          />
          <p style={{ fontSize: "12px", color: "var(--text-2)", marginTop: "8px" }}>Instagram graph API requires a valid public image URL to create a post. If left blank, a default placeholder will be used.</p>
        </div>

        <div style={{ marginTop: "16px", paddingTop: "24px", borderTop: "1px solid var(--border-2)", display: "flex", justifyContent: "flex-end" }}>
          <button 
            className="btn-primary"
            onClick={handleUpload} 
            disabled={isUploading || !text.trim()}
            style={{ display: "flex", alignItems: "center", gap: "8px", opacity: (!text.trim() || isUploading) ? 0.5 : 1 }}
          >
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : uploadStatus === 'success' ? <Check size={16} /> : <Share2 size={16} />} 
            {isUploading ? 'Triggering...' : 'Trigger n8n Automation'}
          </button>
        </div>

        {uploadStatus && results && (
          <div style={{ padding: "16px", background: "var(--surface-2)", borderRadius: "8px", marginTop: "16px" }}>
            <h4 style={{ marginBottom: "12px", fontSize: "14px", color: uploadStatus === 'success' ? 'var(--green)' : 'red' }}>
              {uploadStatus === 'success' ? 'n8n Workflow Triggered Successfully!' : 'Failed to reach n8n Webhook'}
            </h4>
            {uploadStatus === 'success' && (
              <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: "1.5" }}>
                The prompt caption and parameters have been sent to your n8n webhook. 
                n8n will now download the media from Google Drive and automatically post it to Instagram, Facebook, and Twitter.
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
