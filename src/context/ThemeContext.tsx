import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { database } from '../data/database';
import { ThemePalette, ThemePreset } from '../types/database.types';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  activePresetId: string;
  setPresetId: (id: string) => void;
  currentPreset: ThemePreset;
  currentPalette: ThemePalette;
  availablePresets: ThemePreset[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config = database.theme_config;

  const [mode, setModeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('applet_theme_mode');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return config.defaultMode || 'light';
  });

  const [activePresetId, setPresetIdState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('applet_theme_preset');
      if (saved && config.presets[saved]) return saved;
    }
    return config.defaultPreset || Object.keys(config.presets)[0];
  });

  const currentPreset = useMemo(() => {
    return config.presets[activePresetId] || config.presets[config.defaultPreset];
  }, [config, activePresetId]);

  const currentPalette = useMemo(() => {
    return currentPreset[mode];
  }, [currentPreset, mode]);

  const availablePresets = useMemo(() => {
    return Object.values(config.presets);
  }, [config]);

  // Inject CSS Variables dynamically into document.documentElement (:root)
  useEffect(() => {
    const root = document.documentElement;
    const palette = currentPalette;

    root.style.setProperty('--color-primary', palette.primary);
    root.style.setProperty('--color-primary-hover', palette.primaryHover);
    root.style.setProperty('--color-primary-light', palette.primaryLight);
    root.style.setProperty('--color-primary-soft', palette.primarySoft);
    root.style.setProperty('--color-secondary', palette.secondary);
    root.style.setProperty('--color-secondary-hover', palette.secondaryHover);
    root.style.setProperty('--color-accent', palette.accent);
    root.style.setProperty('--color-bg', palette.bg);
    root.style.setProperty('--color-bg-alt', palette.bgAlt);
    root.style.setProperty('--color-surface', palette.surface);
    root.style.setProperty('--color-surface-card', palette.surfaceCard);
    root.style.setProperty('--color-surface-muted', palette.surfaceMuted);
    root.style.setProperty('--color-text', palette.text);
    root.style.setProperty('--color-text-secondary', palette.textSecondary);
    root.style.setProperty('--color-text-muted', palette.textMuted);
    root.style.setProperty('--color-border', palette.border);
    root.style.setProperty('--color-border-light', palette.borderLight);
    root.style.setProperty('--color-badge-bg', palette.badgeBg);
    root.style.setProperty('--color-badge-text', palette.badgeText);
    root.style.setProperty('--color-success', palette.success);
    root.style.setProperty('--color-warning', palette.warning);
    root.style.setProperty('--color-danger', palette.danger);

    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [currentPalette, mode]);

  const toggleMode = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    setModeState(nextMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('applet_theme_mode', nextMode);
    }
  };

  const setMode = (newMode: 'light' | 'dark') => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('applet_theme_mode', newMode);
    }
  };

  const setPresetId = (id: string) => {
    if (config.presets[id]) {
      setPresetIdState(id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('applet_theme_preset', id);
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        setMode,
        activePresetId,
        setPresetId,
        currentPreset,
        currentPalette,
        availablePresets,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
