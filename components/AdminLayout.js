"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, TerminalSquare, Settings, LogOut, Loader2 } from "lucide-react";

export default function AdminLayout({ children }) {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("ease_admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const inputToken = e.target.elements.token.value;
    if (inputToken) {
      // In a real app, verify token with backend first. For now, we trust the input and verify later.
      localStorage.setItem("ease_admin_token", inputToken);
      setToken(inputToken);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ease_admin_token");
    setToken("");
    setIsAuthenticated(false);
    router.push("/");
  };

  if (isChecking) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" size={32} color="var(--violet-500)" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 className="display" style={{ marginBottom: '8px', fontSize: '24px' }}>Admin Login</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '24px', fontSize: '14px' }}>Enter your admin token</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input name="token" type="password" placeholder="Admin Token" required />
            <button type="submit" className="btn-primary">Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Prompt Generator", path: "/prompts", icon: TerminalSquare },
    { name: "Integrations", path: "/settings", icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', borderRight: '1px solid var(--border)', background: 'var(--bg-2)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" className="display" style={{ fontSize: '24px', fontWeight: '700' }}>
            ease<span style={{ color: 'var(--violet-500)' }}>∞</span>
          </Link>
          <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '4px' }}>Admin Portal</div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
                borderRadius: '8px', color: isActive ? '#fff' : 'var(--text-2)',
                background: isActive ? 'var(--purple-dim)' : 'transparent',
                transition: 'all 0.2s', fontWeight: isActive ? '600' : '400'
              }}>
                <Icon size={18} color={isActive ? 'var(--violet-500)' : 'currentColor'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
          borderRadius: '8px', color: 'var(--text-2)', transition: 'all 0.2s'
        }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--red)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-2)'}>
          <LogOut size={18} />
          Log out
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
