"use client";

import { useState } from "react";
import { Share2, Check, Loader2, Image as ImageIcon } from "lucide-react";

export default function Socials() {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileId, setFileId] = useState("");
  const [fileType, setFileType] = useState("image");
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async () => {
    if (!text.trim()) return;
    
    setIsUploading(true);
    setUploadStatus(null);
    setResults(null);
    
    try {
      let finalImageUrl = "";
      
      if (selectedFile) {
        const ext = selectedFile.name.split('.').pop();
        const fileName = `${fileId}.${ext}`;

        // 1. Get signed upload URL
        const signRes = await fetch('/api/upload-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-token': 'ease_admin_2025' },
          body: JSON.stringify({ fileName })
        });
        const signData = await signRes.json();
        
        if (!signRes.ok) throw new Error(signData.error || 'Failed to get upload URL');

        // 2. Upload file directly to Supabase storage bypassing Vercel API limits
        const uploadRes = await fetch(signData.signedUrl, {
          method: 'PUT',
          body: selectedFile,
          headers: { 'Content-Type': selectedFile.type }
        });

        if (!uploadRes.ok) {
          const errText = await uploadRes.text().catch(() => 'No text body');
          throw new Error('Supabase Storage Error: ' + uploadRes.status + ' - ' + errText);
        }

        // 3. Construct public URL
        finalImageUrl = `https://mipoynuzgurcsannbvmf.supabase.co/storage/v1/object/public/social_media/${fileName}`;
      }

      const res = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': 'ease_admin_2025'
        },
        body: JSON.stringify({ text, imageUrl: finalImageUrl, fileId, fileType, title })
      });
      const data = await res.json();
      
      if (res.ok) {
        setUploadStatus('success');
        setResults(data.results);
      } else {
        setUploadStatus('error');
        setErrorMessage(data.error || 'Unknown API Error (Possibly payload too large or missing Env Vars on Vercel)');
      }
    } catch (e) {
      setUploadStatus('error');
      setErrorMessage(e.message);
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "var(--text)", fontWeight: "600" }}>Title</label>
            <input 
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="My Post"
              style={{ 
                width: "100%", padding: "12px 16px", borderRadius: "8px", 
                background: "var(--bg)", border: "1px solid var(--border-2)", 
                color: "var(--text)", fontSize: "14px"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "var(--text)", fontWeight: "600" }}>File ID</label>
            <input 
              type="text"
              value={fileId}
              readOnly
              placeholder="Auto-generated on upload"
              style={{ 
                width: "100%", padding: "12px 16px", borderRadius: "8px", 
                background: "var(--surface-2)", border: "1px solid var(--border-2)", 
                color: "var(--text-2)", fontSize: "14px", cursor: "not-allowed"
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "var(--text)", fontWeight: "600" }}>File Type</label>
          <select
            value={fileType}
            onChange={e => setFileType(e.target.value)}
            style={{ 
              width: "100%", padding: "12px 16px", borderRadius: "8px", 
              background: "var(--bg)", border: "1px solid var(--border-2)", 
              color: "var(--text)", fontSize: "14px"
            }}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "14px", color: "var(--text)", fontWeight: "600" }}>
            <ImageIcon size={16} /> Upload Media
          </label>
          <input 
            type="file"
            accept="image/*,video/*"
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                // Auto-generate a file ID based on type
                const prefix = file.type.startsWith('video') ? 'vid' : 'img';
                const generatedId = `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
                setFileId(generatedId);
                setSelectedFile(file);
                // Also auto-select the file type dropdown
                if (file.type.startsWith('video')) setFileType('video');
                else if (file.type.startsWith('image')) setFileType('image');
              } else {
                setSelectedFile(null);
              }
            }}
            style={{ 
              width: "100%", padding: "12px 16px", borderRadius: "8px", 
              background: "var(--bg)", border: "1px solid var(--border-2)", 
              color: "var(--text)", fontSize: "14px"
            }}
          />
          <p style={{ fontSize: "12px", color: "var(--text-2)", marginTop: "8px" }}>Upload a photo or video. It will securely upload to Supabase and pass the public URL to your webhook.</p>
        </div>

        <div style={{ marginTop: "16px", paddingTop: "24px", borderTop: "1px solid var(--border-2)", display: "flex", justifyContent: "flex-end" }}>
          <button 
            className="btn-primary"
            onClick={handleUpload} 
            disabled={isUploading || !text.trim()}
            style={{ display: "flex", alignItems: "center", gap: "8px", opacity: (!text.trim() || isUploading) ? 0.5 : 1 }}
          >
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : uploadStatus === 'success' ? <Check size={16} /> : <Share2 size={16} />} 
            {isUploading ? 'Publishing...' : 'Publish'}
          </button>
        </div>

        {uploadStatus && (
          <div style={{ padding: "16px", background: "var(--surface-2)", borderRadius: "8px", marginTop: "16px" }}>
            <h4 style={{ marginBottom: "12px", fontSize: "14px", color: uploadStatus === 'success' ? 'var(--green)' : 'var(--red, red)' }}>
              {uploadStatus === 'success' ? 'n8n Workflow Triggered Successfully!' : 'Failed to reach n8n Webhook'}
            </h4>
            {uploadStatus === 'success' && (
              <p style={{ fontSize: "13px", color: "var(--text-2)", lineHeight: "1.5" }}>
                The prompt caption and parameters have been sent to your n8n webhook. 
                n8n will now process the data.
              </p>
            )}
            {uploadStatus === 'error' && (
              <p style={{ fontSize: "13px", color: "var(--red, red)", lineHeight: "1.5" }}>
                Error details: {errorMessage}
                <br /><br />
                <b>Tip:</b> If you are on Vercel, make sure you added <code>N8N_WEBHOOK_URL</code> and <code>ADMIN_TOKEN</code> in your Vercel project environment variables! Also, very large photos might be rejected by Vercel payload limits (use a compressed image under 3MB).
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
