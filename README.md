# Z.ai Desktop

Unofficial desktop application for [Z.ai](https://chat.z.ai) - AI Chatbot & Agent powered by GLM-5 & GLM-4.7.

Built with [Pake](https://github.com/tw93/Pake) (Tauri-based, lightweight ~5MB vs Electron ~100MB).

## Downloads

| Platform | Package |
|----------|---------|
| Linux | `.deb` (Ubuntu/Debian), `.AppImage` (Universal) |
| macOS | `.dmg` (Intel & Apple Silicon) |
| Windows | `.msi` (x64) |

➡️ **Get the latest release** from [GitHub Releases](../../releases/latest)

## Install

### Linux

**Arch Linux (AUR):**
```bash
yay -S zai-chat-desktop
# or
paru -S zai-chat-desktop
```

**Debian/Ubuntu:**
```bash
sudo dpkg -i zai-chat-desktop_*.deb
```

**Universal (AppImage):**
```bash
chmod +x Zai-Chat-Desktop_*.AppImage
./Zai-Chat-Desktop_*.AppImage
```

### macOS

```bash
# Mount and drag to Applications
open Zai-Chat-Desktop_*.dmg
```

### Windows

```powershell
# Double-click the .msi installer
msiexec /i Zai-Chat-Desktop_*.msi
```

## Features

- 🚀 **Lightweight** — ~5MB (Tauri) vs ~100MB+ (Electron)
- 🎨 **Native look** — Hidden title bar, system tray
- ⌨️ **Keyboard shortcuts** — Native shortcuts support
- 🖥️ **Cross-platform** — Linux, macOS, Windows
- 🔄 **Auto-updates** — Via GitHub Releases
- 🇷🇺 **Русский интерфейс** — Fully localized to Russian

## Локализация (RU)

Приложение полностью переведено на русский язык:

- **Меню macOS** (Файл, Редактирование, Вид, Навигация, Окно, Справка) и системный трей — патч шаблона Pake выполняется скриптом [`scripts/patch-pake-ru.js`](scripts/patch-pake-ru.js) на этапе сборки
- **Стандартные пункты macOS** (Копировать, Вставить, Отменить…) локализуются системой, если язык системы — русский (бандл объявляет локализацию `ru` в `Info.plist`)
- **Веб-интерфейс chat.z.ai** переводится на лету встроенным словарём (800+ строк) из [`inject/app.js`](inject/app.js); сообщения чата, код и ввод пользователя не затрагиваются
- **Установщик Windows** (.msi) — на русском языке (`--installer-language ru-RU`)
- **macOS .dmg** — универсальная сборка (Intel & Apple Silicon, `--multi-arch`)

Перевод веб-интерфейса работает по точному совпадению текста со словарём: если сайт обновит интерфейс, новые элементы останутся на английском до обновления словаря.

## Build from source

Requires: Node.js 20+, Rust, pnpm

```bash
# Install Pake CLI
npm install -g pake-cli

# Build
pake https://chat.z.ai \
  --name "ZaiChatDesktop" \
  --hide-title-bar \
  --width 1400 \
  --height 900 \
  --show-system-tray \
  --targets deb,dmg,msi,appimage
```

## Automated Builds

This repository uses GitHub Actions to build all platforms automatically on every release.

See `.github/workflows/build.yml` for details.

## License

MIT — Same as [Pake](https://github.com/tw93/Pake)

## Disclaimer

This is an unofficial wrapper. Z.ai is a product of Zhipu AI.
