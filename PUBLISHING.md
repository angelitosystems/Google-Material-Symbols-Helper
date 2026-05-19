# Publishing & Contribution Guide

This document explains how contributors can propose changes safely and how maintainers can publish a release.

> Security note: never commit personal access tokens, passwords, `.env` files, npm tokens, VS Marketplace tokens, Azure DevOps tokens, or local credentials.

---

## For Contributors: How to Open a Pull Request

1. Fork the repository on GitHub.
2. Clone your fork:

```bash
git clone <your-fork-url>
cd Google-Material-Symbols-Helper
```

3. Add the original repository as `upstream`:

```bash
git remote add upstream https://github.com/angelitosystems/Google-Material-Symbols-Helper.git
```

4. Create a feature branch:

```bash
git checkout -b feat/short-description
```

5. Install dependencies:

```bash
npm install
```

6. Generate the Material Symbols list if needed:

```bash
npm run generate:icons
```

7. Compile and validate the extension:

```bash
npm run compile
```

8. Test locally in VS Code:

```text
Press F5 in VS Code
```

9. Package locally before requesting review:

```bash
npm run package
```

10. Commit your changes:

```bash
git add .
git commit -m "feat: describe your change"
```

11. Push your branch:

```bash
git push origin feat/short-description
```

12. Open a Pull Request to:

```text
angelitosystems/Google-Material-Symbols-Helper:main
```

---

## Pull Request Checklist

Before opening a PR, confirm:

- [ ] The extension compiles with `npm run compile`.
- [ ] The extension can be launched with `F5`.
- [ ] No secrets, tokens, passwords, local paths, or private IDs were committed.
- [ ] `README.md` was updated if the user-facing behavior changed.
- [ ] `CHANGELOG.md` was updated if this is a release-related change.
- [ ] `THIRD_PARTY_NOTICES.md` was updated if third-party assets or dependencies were added.
- [ ] The extension icon used in `package.json` is a PNG file, not SVG.
- [ ] Webview assets are loaded safely with CSP and nonce where scripts are used.
- [ ] Google Material Symbols / Material Design Icons are credited properly.

---

## Maintainer Review Flow

Maintainers should review:

1. Source code changes.
2. Dependency changes.
3. Generated icon data changes.
4. Webview security rules.
5. README and CHANGELOG accuracy.
6. Third-party notices and licensing.
7. Local compile result.
8. Local VSIX package result.

Recommended commands:

```bash
npm install
npm run generate:icons
npm run compile
npm run package
```

---

## Safe Release Process for Maintainers

Only maintainers with access to the official Marketplace publisher should publish releases.

### 1. Verify package metadata

Check `package.json`:

- `name`
- `displayName`
- `description`
- `version`
- `publisher`
- `repository`
- `license`
- `icon`
- `categories`
- `keywords`

The Marketplace package icon must be a PNG file and should be at least 128x128 px.

### 2. Build the package

```bash
npm install
npm run generate:icons
npm run compile
npm run package
```

This should generate a `.vsix` file.

### 3. Login locally

Do this only on a trusted maintainer machine:

```bash
vsce login <publisher-id>
```

When prompted, paste the Marketplace Personal Access Token.

Do not write the token in this file, in GitHub Actions logs, in issues, in pull requests, or in commits.

### 4. Publish

```bash
vsce publish
```

Or publish a packaged VSIX manually through the Visual Studio Marketplace publisher management page.

---

## Secrets Policy

Never commit:

```text
.env
*.pem
*.key
*.pfx
*.cer
*.crt
*.token
npm-debug.log
.vscode/.token*
```

Never include:

```text
Azure DevOps PAT
VS Code Marketplace token
npm token
GitHub token
Personal email passwords
Local machine paths with private usernames
```

Public information that is normally safe to include:

```text
Repository URL
Open-source license
Company name
Public publisher name
Public Marketplace extension identifier
```

---

## Ownership

This project is maintained by Angelito Systems S.A.C., a technology company focused on software solutions, apps, business systems, automation, and AI-assisted tools for entrepreneurs, companies, and organizations.

Google Material Symbols and Material Design Icons are created and maintained by Google. This extension is not an official Google product and is not affiliated with Google.
