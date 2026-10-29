#!/usr/bin/env node
/**
 * Z.ai Desktop — локализация шаблона Pake на русский язык.
 *
 * Патчит установленный пакет pake-cli (node_modules) ПЕРЕД сборкой:
 *   - src-tauri/src/app/menu.rs   — пункты меню macOS (File/Edit/View/...)
 *   - src-tauri/src/app/setup.rs  — пункты системного трея
 *   - src-tauri/Info.plist        — диалоги разрешений macOS + локализация ru
 *   - src-tauri/tauri.windows.conf.json — язык установщика MSI (ru-RU)
 *
 * Pake при каждом запуске копирует src-tauri из пакета во временную папку
 * сборки, поэтому патч node_modules гарантированно попадает в результат.
 *
 * Использование:
 *   node patch-pake-ru.js [путь-к-pake-cli]
 *
 * Если путь не указан, скрипт сам определяет глобальный каталог npm.
 * Скрипт идемпотентен: повторный запуск ничего не ломает.
 * Код выхода: 0 — успешно; 1 — пакет/файлы не найдены.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ---------------------------------------------------------------- утилиты --

function resolvePakeDir(arg) {
  const candidates = [];
  if (arg) candidates.push(arg);
  try {
    const npmRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    if (npmRoot) candidates.push(path.join(npmRoot, 'pake-cli'));
  } catch (_) {
    /* npm недоступен — пробуем типовые пути */
  }
  candidates.push(
    '/usr/local/lib/node_modules/pake-cli',
    '/usr/lib/node_modules/pake-cli',
    '/opt/homebrew/lib/node_modules/pake-cli'
  );

  for (const dir of candidates) {
    const menuRs = path.join(dir, 'src-tauri', 'src', 'app', 'menu.rs');
    if (fs.existsSync(menuRs)) return path.resolve(dir);
  }
  console.error('[RU] ОШИБКА: пакет pake-cli не найден. Проверено:');
  candidates.forEach((c) => console.error('  - ' + c));
  console.error('[RU] Установите: npm install -g pake-cli');
  process.exit(1);
}

// ------------------------------------------------------------------ патчи --

/** Пункты меню macOS (menu.rs). Все строки встречаются в файле ровно один раз. */
const MENU_RS = [
  ['"Built with Pake V{}"', '"Создано на базе Pake V{}"'],
  ['"File"', '"Файл"'],
  ['"New Window"', '"Новое окно"'],
  ['"Clear Cache & Restart"', '"Очистить кэш и перезапустить"'],
  ['"Edit"', '"Редактирование"'],
  ['"Paste and Match Style"', '"Вставить и сопоставить стиль"'],
  ['"Find Next"', '"Найти следующее"'],
  ['"Find Previous"', '"Найти предыдущее"'],
  ['"Find"', '"Найти"'],
  ['"Copy URL"', '"Скопировать ссылку"'],
  ['"View"', '"Вид"'],
  ['"Reload"', '"Обновить страницу"'],
  ['"Zoom In"', '"Увеличить"'],
  ['"Zoom Out"', '"Уменьшить"'],
  ['"Actual Size"', '"Реальный размер"'],
  ['"Toggle Developer Tools"', '"Инструменты разработчика"'],
  ['"Navigation"', '"Навигация"'],
  ['"Back"', '"Назад"'],
  ['"Forward"', '"Вперёд"'],
  ['"Go Home"', '"На главную"'],
  ['"Window"', '"Окно"'],
  ['"Toggle Always on Top"', '"Всегда поверх других окон"'],
  ['"Help"', '"Справка"'],
];

/** Пункты системного трея (setup.rs, английская ветка TrayLabels). */
const SETUP_RS = [
  ['new_window: "New Window",', 'new_window: "Новое окно",'],
  ['hide: "Hide",', 'hide: "Скрыть",'],
  ['show: "Show",', 'show: "Показать",'],
  ['quit: "Quit",', 'quit: "Завершить",'],
];

const INFO_PLIST_CAMERA =
  'Приложению требуется доступ к камере для видеозвонков и записи видео.';
const INFO_PLIST_MIC =
  'Приложению требуется доступ к микрофону для голосового ввода и звонков.';

/** macOS переводит стандартные пункты меню (Копировать/Вставить/…),
 *  только если бандл объявляет локализацию ru. */
const PLIST_LOCALIZATION =
  '    <key>CFBundleDevelopmentRegion</key>\n' +
  '    <string>ru</string>\n' +
  '    <key>CFBundleLocalizations</key>\n' +
  '    <array>\n' +
  '      <string>ru</string>\n' +
  '      <string>en</string>\n' +
  '    </array>\n';

function patchFile(baseDir, relPath, rules, { optional = false } = {}) {
  const abs = path.join(baseDir, relPath);
  if (!fs.existsSync(abs)) {
    if (optional) {
      console.log(`[RU]   пропущен (нет файла): ${relPath}`);
      return;
    }
    console.error(`[RU] ОШИБКА: файл не найден: ${abs}`);
    process.exit(1);
  }
  let content = fs.readFileSync(abs, 'utf8');
  let changed = 0;
  for (const [from, to] of rules) {
    const n = content.split(from).length - 1;
    if (n > 0) {
      changed += n;
      content = content.split(from).join(to);
    }
  }
  if (changed > 0) {
    fs.writeFileSync(abs, content, 'utf8');
    console.log(`[RU]   ${relPath}: замен — ${changed}`);
  } else {
    console.log(`[RU]   ${relPath}: уже на русском (изменений нет)`);
  }
}

// ------------------------------------------------------------------ запуск --

function main() {
  const arg = process.argv[2];
  const pakeDir = resolvePakeDir(arg);
  console.log(`[RU] Локализация Pake → русский язык: ${pakeDir}`);

  console.log('[RU] menu.rs (меню macOS):');
  patchFile(pakeDir, path.join('src-tauri', 'src', 'app', 'menu.rs'), MENU_RS);

  console.log('[RU] setup.rs (системный трей):');
  patchFile(pakeDir, path.join('src-tauri', 'src', 'app', 'setup.rs'), SETUP_RS);

  console.log('[RU] Info.plist (разрешения macOS, локализация бандла):');
  const plistRel = path.join('src-tauri', 'Info.plist');
  const plistAbs = path.join(pakeDir, plistRel);
  if (!fs.existsSync(plistAbs)) {
    console.error(`[RU] ОШИБКА: файл не найден: ${plistAbs}`);
    process.exit(1);
  }
  let plist = fs.readFileSync(plistAbs, 'utf8');
  let plistChanged = 0;
  if (plist.includes('Request camera access')) {
    plist = plist.replace(
      '<string>Request camera access</string>',
      `<string>${INFO_PLIST_CAMERA}</string>`
    );
    plistChanged++;
  }
  if (plist.includes('Request microphone access')) {
    plist = plist.replace(
      '<string>Request microphone access</string>',
      `<string>${INFO_PLIST_MIC}</string>`
    );
    plistChanged++;
  }
  if (!plist.includes('CFBundleLocalizations')) {
    // Вставляем сразу после первого <dict>
    plist = plist.replace(/<dict>/, '<dict>\n' + PLIST_LOCALIZATION.replace(/\n$/, ''));
    plistChanged++;
  }
  if (plistChanged > 0) {
    fs.writeFileSync(plistAbs, plist, 'utf8');
    console.log(`[RU]   Info.plist: изменений — ${plistChanged}`);
  } else {
    console.log('[RU]   Info.plist: уже на русском (изменений нет)');
  }

  console.log('[RU] tauri.windows.conf.json (язык установщика MSI):');
  patchFile(
    pakeDir,
    path.join('src-tauri', 'tauri.windows.conf.json'),
    [['"language": ["en-US"]', '"language": ["ru-RU"]']],
    { optional: true }
  );

  injectRemoteDictSource();

  console.log('[RU] Готово: шаблон Pake локализован на русский язык.');
}

// ------------------------------------------------- удалённый словарь RU ---
// Подставляем адрес текущего репозитория вместо '__REMOTE_DICT_REPO__' в
// inject/app.js. Благодаря этому приложение при каждом запуске забирает
// свежий inject/dictionary.json с GitHub: обновления перевода попадают в
// программу простым редактированием файла — БЕЗ пересборки .dmg.
function injectRemoteDictSource() {
  try {
    const appJsAbs = path.resolve(__dirname, '..', 'inject', 'app.js');
    if (!fs.existsSync(appJsAbs)) {
      console.log('[RU] inject/app.js не найден — подстановка словаря пропущена.');
      return;
    }
    const repo = process.env.GITHUB_REPOSITORY || '';
    if (!repo) {
      console.log('[RU] GITHUB_REPOSITORY не задан (локальный запуск) — пропускаем.');
      return;
    }
    let src = fs.readFileSync(appJsAbs, 'utf8');
    if (src.indexOf('__REMOTE_DICT_REPO__') === -1) {
      console.log('[RU] inject/app.js: источник словаря уже подставлен.');
      return;
    }
    src = src.split('__REMOTE_DICT_REPO__').join(repo);
    fs.writeFileSync(appJsAbs, src, 'utf8');
    console.log('[RU] inject/app.js: удалённый словарь → ' + repo + '/inject/dictionary.json');
  } catch (e) {
    console.log('[RU] Ошибка подстановки словаря (не критично): ' + e.message);
  }
}

main();
