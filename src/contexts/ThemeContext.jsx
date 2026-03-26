import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const themes = {
  dark: {
    name: 'Dark Mode',
    icon: '🌙',
    vars: {
      '--bg-primary': '#0a0e1a',
      '--bg-secondary': '#0f1525',
      '--bg-card': 'rgba(15, 23, 42, 0.7)',
      '--bg-glass': 'rgba(15, 23, 42, 0.5)',
      '--bg-hover': 'rgba(30, 41, 70, 0.6)',
      '--border-glass': 'rgba(99, 102, 241, 0.15)',
      '--border-glow': 'rgba(99, 102, 241, 0.4)',
      '--accent-primary': '#6366f1',
      '--accent-secondary': '#a855f7',
      '--accent-tertiary': '#06b6d4',
      '--text-primary': '#f1f5f9',
      '--text-secondary': '#94a3b8',
      '--text-muted': '#64748b',
      '--text-accent': '#a5b4fc',
      '--gradient-primary': 'linear-gradient(135deg, #6366f1, #a855f7)',
      '--gradient-secondary': 'linear-gradient(135deg, #06b6d4, #6366f1)',
      '--shadow-card': '0 4px 24px rgba(0, 0, 0, 0.3)',
      '--shadow-glow': '0 0 20px rgba(99, 102, 241, 0.15)',
      '--shadow-neon': '0 0 10px rgba(99, 102, 241, 0.5), 0 0 30px rgba(99, 102, 241, 0.2)',
      '--particle-hue-1': '239',
      '--particle-hue-2': '270',
      '--particle-accent': 'rgba(99, 102, 241,',
      '--gradient-mesh': 'radial-gradient(at 0% 0%, rgba(99,102,241,0.1) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(168,85,247,0.1) 0, transparent 50%)',
    }
  },
  light: {
    name: 'Light Mode',
    icon: '☀️',
    vars: {
      '--bg-primary': '#f0f4f8',
      '--bg-secondary': '#ffffff',
      '--bg-card': 'rgba(255, 255, 255, 0.9)',
      '--bg-glass': 'rgba(255, 255, 255, 0.7)',
      '--bg-hover': 'rgba(99, 102, 241, 0.06)',
      '--border-glass': 'rgba(99, 102, 241, 0.12)',
      '--border-glow': 'rgba(99, 102, 241, 0.3)',
      '--accent-primary': '#4f46e5',
      '--accent-secondary': '#7c3aed',
      '--accent-tertiary': '#0891b2',
      '--text-primary': '#1e293b',
      '--text-secondary': '#475569',
      '--text-muted': '#94a3b8',
      '--text-accent': '#4338ca',
      '--gradient-primary': 'linear-gradient(135deg, #4f46e5, #7c3aed)',
      '--gradient-secondary': 'linear-gradient(135deg, #0891b2, #4f46e5)',
      '--shadow-card': '0 4px 24px rgba(0, 0, 0, 0.06)',
      '--shadow-glow': '0 0 20px rgba(79, 70, 229, 0.1)',
      '--shadow-neon': '0 0 10px rgba(79, 70, 229, 0.2), 0 0 30px rgba(79, 70, 229, 0.1)',
      '--particle-hue-1': '240',
      '--particle-hue-2': '260',
      '--particle-accent': 'rgba(79, 70, 229,',
      '--gradient-mesh': 'radial-gradient(at 0% 0%, rgba(79,70,229,0.05) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(124,58,237,0.05) 0, transparent 50%)',
    }
  },
  neon: {
    name: 'Neon Mode',
    icon: '⚡',
    vars: {
      '--bg-primary': '#080012',
      '--bg-secondary': '#0d0020',
      '--bg-card': 'rgba(13, 0, 32, 0.8)',
      '--bg-glass': 'rgba(13, 0, 32, 0.6)',
      '--bg-hover': 'rgba(139, 92, 246, 0.12)',
      '--border-glass': 'rgba(139, 92, 246, 0.25)',
      '--border-glow': 'rgba(6, 182, 212, 0.5)',
      '--accent-primary': '#8b5cf6',
      '--accent-secondary': '#06b6d4',
      '--accent-tertiary': '#d946ef',
      '--text-primary': '#e0e7ff',
      '--text-secondary': '#a78bfa',
      '--text-muted': '#7c3aed',
      '--text-accent': '#67e8f9',
      '--gradient-primary': 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
      '--gradient-secondary': 'linear-gradient(135deg, #d946ef, #8b5cf6)',
      '--shadow-card': '0 4px 24px rgba(0, 0, 0, 0.5)',
      '--shadow-glow': '0 0 25px rgba(139, 92, 246, 0.3)',
      '--shadow-neon': '0 0 15px rgba(6, 182, 212, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)',
      '--particle-hue-1': '260',
      '--particle-hue-2': '190',
      '--particle-accent': 'rgba(139, 92, 246,',
      '--gradient-mesh': 'radial-gradient(at 0% 0%, rgba(139,92,246,0.15) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(6,182,212,0.15) 0, transparent 50%)',
    }
  },
  pastel: {
    name: 'Soft Pastel',
    icon: '🌸',
    vars: {
      '--bg-primary': '#faf5ff',
      '--bg-secondary': '#fef7ff',
      '--bg-card': 'rgba(254, 247, 255, 0.9)',
      '--bg-glass': 'rgba(254, 247, 255, 0.7)',
      '--bg-hover': 'rgba(196, 181, 253, 0.12)',
      '--border-glass': 'rgba(196, 181, 253, 0.25)',
      '--border-glow': 'rgba(196, 181, 253, 0.4)',
      '--accent-primary': '#8b5cf6',
      '--accent-secondary': '#f472b6',
      '--accent-tertiary': '#67e8f9',
      '--text-primary': '#3b0764',
      '--text-secondary': '#6b21a8',
      '--text-muted': '#a855f7',
      '--text-accent': '#7c3aed',
      '--gradient-primary': 'linear-gradient(135deg, #c084fc, #f9a8d4)',
      '--gradient-secondary': 'linear-gradient(135deg, #a5f3fc, #c084fc)',
      '--shadow-card': '0 4px 24px rgba(139, 92, 246, 0.08)',
      '--shadow-glow': '0 0 20px rgba(139, 92, 246, 0.1)',
      '--shadow-neon': '0 0 10px rgba(196, 181, 253, 0.3), 0 0 30px rgba(139, 92, 246, 0.1)',
      '--particle-hue-1': '280',
      '--particle-hue-2': '330',
      '--particle-accent': 'rgba(244, 114, 182,',
      '--gradient-mesh': 'radial-gradient(at 0% 0%, rgba(244,114,182,0.08) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(192,132,252,0.08) 0, transparent 50%)',
    }
  },
  premium: {
    name: 'Premium',
    icon: '👑',
    vars: {
      '--bg-primary': '#09090b',
      '--bg-secondary': '#18181b',
      '--bg-card': 'rgba(24, 24, 27, 0.9)',
      '--bg-glass': 'rgba(24, 24, 27, 0.7)',
      '--bg-hover': 'rgba(202, 138, 4, 0.08)',
      '--border-glass': 'rgba(202, 138, 4, 0.15)',
      '--border-glow': 'rgba(234, 179, 8, 0.4)',
      '--accent-primary': '#eab308',
      '--accent-secondary': '#f59e0b',
      '--accent-tertiary': '#d97706',
      '--text-primary': '#fafafa',
      '--text-secondary': '#a1a1aa',
      '--text-muted': '#71717a',
      '--text-accent': '#fde68a',
      '--gradient-primary': 'linear-gradient(135deg, #eab308, #f59e0b)',
      '--gradient-secondary': 'linear-gradient(135deg, #d97706, #eab308)',
      '--shadow-card': '0 4px 24px rgba(0, 0, 0, 0.5)',
      '--shadow-glow': '0 0 20px rgba(234, 179, 8, 0.15)',
      '--shadow-neon': '0 0 10px rgba(234, 179, 8, 0.4), 0 0 30px rgba(234, 179, 8, 0.15)',
      '--particle-hue-1': '45',
      '--particle-hue-2': '35',
      '--particle-accent': 'rgba(234, 179, 8,',
      '--gradient-mesh': 'radial-gradient(at 0% 0%, rgba(234,179,8,0.08) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(245,158,11,0.08) 0, transparent 50%)',
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    icon: '🦾',
    vars: {
      '--bg-primary': '#0d1117',
      '--bg-secondary': '#161b22',
      '--bg-card': 'rgba(22, 27, 34, 0.8)',
      '--bg-glass': 'rgba(13, 17, 23, 0.8)',
      '--bg-hover': 'rgba(250, 204, 21, 0.1)',
      '--border-glass': 'rgba(56, 189, 248, 0.3)',
      '--border-glow': 'rgba(250, 204, 21, 0.6)',
      '--accent-primary': '#facc15',
      '--accent-secondary': '#38bdf8',
      '--accent-tertiary': '#f43f5e',
      '--text-primary': '#f8fafc',
      '--text-secondary': '#94a3b8',
      '--text-muted': '#64748b',
      '--text-accent': '#38bdf8',
      '--gradient-primary': 'linear-gradient(135deg, #facc15, #38bdf8)',
      '--gradient-secondary': 'linear-gradient(135deg, #f43f5e, #facc15)',
      '--shadow-card': '0 4px 24px rgba(0, 0, 0, 0.6)',
      '--shadow-glow': '0 0 20px rgba(250, 204, 21, 0.3)',
      '--shadow-neon': '0 0 10px rgba(56, 189, 248, 0.5), 0 0 30px rgba(250, 204, 21, 0.3)',
      '--particle-hue-1': '50',
      '--particle-hue-2': '200',
      '--particle-accent': 'rgba(250, 204, 21,',
      '--gradient-mesh': 'radial-gradient(at 0% 0%, rgba(250,204,21,0.1) 0, transparent 60%), radial-gradient(at 100% 100%, rgba(56,189,248,0.1) 0, transparent 60%)',
    }
  },
  ocean: {
    name: 'Deep Ocean',
    icon: '🌊',
    vars: {
      '--bg-primary': '#001a2c',
      '--bg-secondary': '#002845',
      '--bg-card': 'rgba(0, 40, 69, 0.7)',
      '--bg-glass': 'rgba(0, 40, 69, 0.5)',
      '--bg-hover': 'rgba(14, 165, 233, 0.15)',
      '--border-glass': 'rgba(14, 165, 233, 0.25)',
      '--border-glow': 'rgba(56, 189, 248, 0.4)',
      '--accent-primary': '#0ea5e9',
      '--accent-secondary': '#2dd4bf',
      '--accent-tertiary': '#818cf8',
      '--text-primary': '#f0f9ff',
      '--text-secondary': '#bae6fd',
      '--text-muted': '#7dd3fc',
      '--text-accent': '#38bdf8',
      '--gradient-primary': 'linear-gradient(135deg, #0ea5e9, #2dd4bf)',
      '--gradient-secondary': 'linear-gradient(135deg, #2dd4bf, #818cf8)',
      '--shadow-card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      '--shadow-glow': '0 0 25px rgba(14, 165, 233, 0.25)',
      '--shadow-neon': '0 0 15px rgba(45, 212, 191, 0.4), 0 0 30px rgba(14, 165, 233, 0.2)',
      '--particle-hue-1': '195',
      '--particle-hue-2': '170',
      '--particle-accent': 'rgba(14, 165, 233,',
      '--gradient-mesh': 'radial-gradient(at 20% 0%, rgba(14,165,233,0.15) 0, transparent 50%), radial-gradient(at 80% 100%, rgba(45,212,191,0.1) 0, transparent 50%)',
    }
  },
  forest: {
    name: 'Enchanted Forest',
    icon: '🌲',
    vars: {
      '--bg-primary': '#062015',
      '--bg-secondary': '#0a2e1f',
      '--bg-card': 'rgba(10, 46, 31, 0.7)',
      '--bg-glass': 'rgba(10, 46, 31, 0.5)',
      '--bg-hover': 'rgba(16, 185, 129, 0.12)',
      '--border-glass': 'rgba(16, 185, 129, 0.25)',
      '--border-glow': 'rgba(52, 211, 153, 0.4)',
      '--accent-primary': '#10b981',
      '--accent-secondary': '#84cc16',
      '--accent-tertiary': '#0ea5e9',
      '--text-primary': '#f0fdf4',
      '--text-secondary': '#a7f3d0',
      '--text-muted': '#6ee7b7',
      '--text-accent': '#34d399',
      '--gradient-primary': 'linear-gradient(135deg, #10b981, #84cc16)',
      '--gradient-secondary': 'linear-gradient(135deg, #84cc16, #0ea5e9)',
      '--shadow-card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      '--shadow-glow': '0 0 20px rgba(16, 185, 129, 0.2)',
      '--shadow-neon': '0 0 10px rgba(132, 204, 22, 0.3), 0 0 30px rgba(16, 185, 129, 0.15)',
      '--particle-hue-1': '160',
      '--particle-hue-2': '80',
      '--particle-accent': 'rgba(16, 185, 129,',
      '--gradient-mesh': 'radial-gradient(at 0% 0%, rgba(16,185,129,0.1) 0, transparent 60%), radial-gradient(at 100% 100%, rgba(132,204,22,0.1) 0, transparent 60%)',
    }
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('stulytics_theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    const themeVars = themes[theme]?.vars || themes.dark.vars;

    // Add smooth transition
    root.style.transition = 'background-color 0.5s ease, color 0.5s ease';

    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Update body background
    document.body.style.transition = 'background-color 0.5s ease';
    document.body.style.backgroundColor = themeVars['--bg-primary'];

    localStorage.setItem('stulytics_theme', theme);
  }, [theme]);

  const switchTheme = (newTheme) => {
    if (themes[newTheme]) setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
