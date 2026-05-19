# Publishing Guide — Google Material Symbols Helper

This guide prepares **Google Material Symbols Helper** for GitHub and Visual Studio Code Marketplace publication under **Angelito Systems S.A.C.**

Repository:

```txt
https://github.com/angelitosystems/Google-Material-Symbols-Helper.git
```

Marketplace publisher ID:

```txt
angelitosystems
```

Extension ID after publishing:

```txt
angelitosystems.google-material-symbols-helper
```

---

## 1. Required files before publishing

Make sure these files exist in the project root:

```txt
README.md
CHANGELOG.md
LICENSE
THIRD_PARTY_NOTICES.md
package.json
package-lock.json
.vscodeignore
media/icon.png
media/icon.svg
out/extension.js
```

Important:

- `package.json` must use `icon: "media/icon.png"`.
- Marketplace publishing does not allow the package icon to be SVG.
- `media/icon.svg` can still be used for the VS Code Activity Bar / Sidebar icon.
- README and CHANGELOG image links should be valid HTTPS URLs or local non-SVG assets.

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Generate icon data

```bash
npm run generate:icons
```

---

## 4. Compile

```bash
npm run compile
```

---

## 5. Test locally

Open the extension project in VS Code and press:

```txt
F5
```

Test:

- Sidebar icon browser.
- Gallery Webview.
- Autocomplete with `ms-home`.
- Context menu: `Google Material Symbols: Import CDN by Style`.
- Hover preview.
- Gutter preview.

---

## 6. Package as VSIX

```bash
npm run package
```

Expected output example:

```txt
google-material-symbols-helper-1.3.2.vsix
```

Install locally:

```bash
code --install-extension google-material-symbols-helper-1.3.2.vsix
```

---

## 7. Login to VS Code Marketplace

Install VSCE globally if needed:

```bash
npm install -g @vscode/vsce
```

Login:

```bash
vsce login angelitosystems
```

Paste the Azure DevOps Personal Access Token when prompted.

---

## 8. Publish

```bash
npm run publish
```

Or publish a patch/minor version automatically:

```bash
npm run publish:patch
npm run publish:minor
```

---

## 9. Push release files to GitHub

```bash
git status
git add README.md CHANGELOG.md LICENSE THIRD_PARTY_NOTICES.md package.json package-lock.json media .vscodeignore src out
git commit -m "Prepare Google Material Symbols Helper for Marketplace publishing"
git push -u origin main
```

---

## 10. GitHub release checklist

After publishing the `.vsix`, create a GitHub release:

```txt
Tag: v1.3.2
Title: Google Material Symbols Helper v1.3.2
```

Attach:

```txt
google-material-symbols-helper-1.3.2.vsix
```

Use the `CHANGELOG.md` section for `1.3.2` as the release notes.
