"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, TerminalSquare, Settings, LogOut, Loader2, Share2 } from "lucide-react";

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
    { name: "Social Publisher", path: "/socials", icon: Share2 },
    { name: "Integrations", path: "/settings", icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Desktop Sidebar */}
        <aside className="desktop-only" style={{ width: '260px', borderRight: '1px solid var(--border)', background: 'var(--bg-2)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
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
        <main style={{ flex: 1, overflowY: 'auto', paddingTop: 'var(--safe-top)', paddingBottom: 'calc(var(--safe-bottom) + 80px)' }}>
          {/* Mobile Header */}
          <div className="mobile-only glass-panel" style={{ position: 'sticky', top: 0, zIndex: 10, padding: '16px', borderLeft: 'none', borderRight: 'none', borderTop: 'none', borderRadius: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'calc(16px + var(--safe-top))' }}>
            <div className="display" style={{ fontSize: '20px', fontWeight: '700' }}>
              ease<span style={{ color: 'var(--violet-500)' }}>∞</span>
            </div>
            <button onClick={handleLogout} style={{ color: 'var(--text-2)' }}>
              <LogOut size={20} />
            </button>
          </div>

          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <nav className="mobile-only glass-panel" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '12px 16px', paddingBottom: 'calc(12px + var(--safe-bottom))',
        borderLeft: 'none', borderRight: 'none', borderBottom: 'none', borderRadius: 0
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              color: isActive ? 'var(--violet-500)' : 'var(--text-3)',
              transition: 'color 0.2s'
            }}>
              <Icon size={24} color={isActive ? 'var(--violet-500)' : 'currentColor'} />
              <span style={{ fontSize: '10px', fontWeight: isActive ? '600' : '500' }}>{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
