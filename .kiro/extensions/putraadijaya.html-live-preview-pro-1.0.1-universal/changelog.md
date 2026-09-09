# Changelog

All notable changes to HTML Preview Pro will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-02-16

### Added
- ✨ **Real-time HTML preview** – Instant rendering in VS Code webview with automatic hot reload
- 🔥 **Auto-reload on file change** – Preview updates automatically as you type, no manual refresh needed
- 🎯 **Multiple preview modes** – Open previews in side-by-side editor panel or launch in default browser
- ⌨️ **Keyboard shortcut** – `Ctrl+Alt+P` (Windows/Linux) or `Cmd+Alt+P` (macOS) for quick access
- 🎨 **Theme-aware rendering** – Preview adapts to VS Code light and dark themes
- 📁 **Multiple file support** – Open previews for several HTML files simultaneously
- 🛡️ **Sandboxed execution** – Secure, isolated webview environment with no external dependencies
- 🌐 **Full HTML5 support** – Inline CSS, JavaScript, images, and media files
- 📍 **Relative path resolution** – Assets load correctly from the HTML file's directory
- 🖱️ **Context menu integration** – Right-click in editor or file explorer to preview
- 🎛️ **Toolbar buttons** – Quick access icons in the editor title bar
- 📋 **Command palette support** – Search and run preview commands from command palette
- 🔗 **Browser preview fallback** – Launch in default browser for full-fidelity testing with external resources

### Features
- Supports HTML5 markup with full spec compliance
- Inline `<style>` tags render with full CSS support
- Inline `<script>` tags execute in the webview environment
- Linked CSS and JavaScript files with relative path resolution
- Image and media file support (local files and data URIs)
- Tab-aware preview that follows active editor
- Zero configuration – works immediately with any HTML file
- Lightweight and fast – no build steps or server setup required
- Privacy-focused – all processing happens locally on your machine

### Requirements
- VS Code 1.70.0 or later
- Windows, macOS, or Linux
- No external runtime dependencies

### Known Limitations
- External CDN resources may be blocked by the webview sandbox (use browser preview for full fidelity)
- Some browser APIs (e.g., `localStorage`, `sessionStorage`) may be restricted in webview mode
- Relative paths are resolved from the HTML file's directory
- Cross-origin requests may be restricted (test in browser preview if needed)

---

## Planned for Future Releases

### [1.1.0] - Planned
- Responsive device frames (mobile, tablet, desktop presets)
- Preview toolbar with zoom and refresh controls
- Theme-aware background presets
- Live CSS editing with instant preview

### [1.2.0] - Planned
- HTML validation and error highlighting
- Export preview as standalone HTML
- Custom preview CSS injection
- Preview history/undo support

### [2.0.0] - Planned
- Split-view synchronization
- Performance profiling in preview
- Accessibility checker integration
- Collaborative preview sharing

---

## How to Report Issues

Found a bug or have a feature request? Please open an issue on [GitHub Issues](https://github.com/PutraAdiJaya/html-live-preview-pro/issues).

## Contributing

Contributions are welcome! Please check [GitHub Discussions](https://github.com/PutraAdiJaya/html-live-preview-pro/discussions) for ongoing conversations and ideas.

---

**HTML Preview Pro** – Real-time HTML rendering, zero configuration.
