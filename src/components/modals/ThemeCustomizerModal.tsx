import React from 'react';
import { database } from '../../data/database';
import { useTheme } from '../../context/ThemeContext';
import { renderIcon } from '../../utils/iconResolver';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { mode, setMode, activePresetId, setPresetId, availablePresets, currentPalette } =
    useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--color-surface)] border-l border-[var(--color-border)] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[var(--color-border-light)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]">
                {renderIcon('Palette', { size: 20 })}
              </span>
              <div>
                <h3 className="font-heading font-bold text-lg text-[var(--color-text)]">
                  Engine de Temas White-Label
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Injeção dinâmica via CSS Variables no :root
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] cursor-pointer"
              aria-label="Fechar painel"
            >
              {renderIcon('X', { size: 18 })}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* White-Label Banner */}
            <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border-light)] text-xs space-y-2">
              <span className="font-bold text-[var(--color-primary)] uppercase tracking-wider block">
                Regra 3 da Arquitetura:
              </span>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                As paletas residem na collection <code className="font-mono bg-[var(--color-bg)] px-1 py-0.5 rounded text-[var(--color-text)]">theme_config</code> dentro de <code className="font-mono bg-[var(--color-bg)] px-1 py-0.5 rounded text-[var(--color-text)]">database.ts</code>. Para rebrandear a padaria inteira, basta editar as variáveis no arquivo.
              </p>
            </div>

            {/* Mode Toggle: Light vs Dark */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                Modo de Exibição
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMode('light')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
                    mode === 'light'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-xs'
                      : 'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]'
                  }`}
                >
                  {renderIcon('Sun', { size: 16 })}
                  <span>Light Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('dark')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
                    mode === 'dark'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-xs'
                      : 'border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]'
                  }`}
                >
                  {renderIcon('Moon', { size: 16 })}
                  <span>Dark Mode</span>
                </button>
              </div>
            </div>

            {/* Presets List */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                Identidades Visuais Pré-Configuradas (Presets)
              </label>
              <div className="space-y-3">
                {availablePresets.map((preset) => {
                  const isSelected = activePresetId === preset.id;
                  const palette = preset[mode];

                  return (
                    <button
                      key={preset.id}
                      onClick={() => setPresetId(preset.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                        isSelected
                          ? 'border-[var(--color-primary)] bg-[var(--color-surface-muted)] ring-2 ring-[var(--color-primary)]/20 shadow-xs'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary-light)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-sm text-[var(--color-text)]">
                          {preset.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--color-primary)] text-white">
                            Ativo
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[var(--color-text-secondary)]">
                        {preset.description}
                      </p>

                      {/* Swatches preview */}
                      <div className="flex items-center gap-1.5 pt-1">
                        {[
                          palette.primary,
                          palette.primaryHover,
                          palette.secondary,
                          palette.accent,
                          palette.bg,
                          palette.surface,
                        ].map((hex, i) => (
                          <span
                            key={i}
                            className="w-5 h-5 rounded-full border border-black/20 shadow-2xs"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active CSS Variables Inspector */}
            <div className="space-y-3 pt-3 border-t border-[var(--color-border-light)]">
              <label className="block text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                Variáveis CSS Injetadas no :root
              </label>
              <div className="p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] font-mono text-[11px] space-y-1.5 max-h-48 overflow-y-auto">
                <div><span className="text-amber-600 dark:text-amber-400">--color-primary</span>: {currentPalette.primary};</div>
                <div><span className="text-amber-600 dark:text-amber-400">--color-primary-hover</span>: {currentPalette.primaryHover};</div>
                <div><span className="text-amber-600 dark:text-amber-400">--color-bg</span>: {currentPalette.bg};</div>
                <div><span className="text-amber-600 dark:text-amber-400">--color-surface</span>: {currentPalette.surface};</div>
                <div><span className="text-amber-600 dark:text-amber-400">--color-text</span>: {currentPalette.text};</div>
                <div><span className="text-amber-600 dark:text-amber-400">--color-border</span>: {currentPalette.border};</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[var(--color-border-light)] bg-[var(--color-surface-muted)]">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer"
            >
              Concluir & Voltar ao Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
