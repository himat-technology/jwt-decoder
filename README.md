<div align="center">

# 🛡️ JWT Decoder & Inspector

### 🚀 High-Performance, 100% Client-Side JSON Web Token Inspector & Validator

**Zero Server Calls • Zero Data Logging • Instant Offline-Ready In-Browser Decoding**

[![Live Demo](https://img.shields.io/badge/⚡_Live_Demo-himat.tech-14b8a6?style=for-the-badge&logo=vercel&logoColor=white)](https://himat.tech/free-tools/jwt-decoder)
[![GitHub](https://img.shields.io/badge/GitHub-himat--technology-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/himat-technology)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/himat-technology)
[![Instagram](https://img.shields.io/badge/Instagram-Follow-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/himat_technologies/)
[![Facebook](https://img.shields.io/badge/Facebook-Follow-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/people/Himat-technology/61593829197445/)

<br />

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-34%20passing-10b981.svg?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Client-Side Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-emerald.svg?style=flat-square)](https://himat.tech/free-tools/jwt-decoder)

<br />

[**🔗 Try Live Demo**](https://himat.tech/free-tools/jwt-decoder) • [**📖 Documentation**](#key-features) • [**⚡ Quick Start**](#getting-started) • [**🧪 Testing**](#running-automated-tests) • [**🌐 Socials**](#community--connect)

---

</div>

> [!IMPORTANT]
> **🔒 100% Client-Side Privacy Guarantee**  
> Your tokens, keys, and payload claims **never leave your browser**. All Base64Url parsing, UTF-8 conversion, JSON syntax highlighting, and timestamp checks are computed locally in client-side memory using the web browser's native engine. **No backend API or third-party tracking is used.**

---

## 🌟 Key Features

<table>
  <tr>
    <td width="50%">
      <h3>⚡ Instant Local Decoding</h3>
      <p>Decodes standard JWTs in real-time as you type. No submit button required. Full offline support after dependency installation.</p>
    </td>
    <td width="50%">
      <h3>🎨 Color-Coded Token Breakdown</h3>
      <p>Visually segments tokens into <span style="color:#fb7185;font-weight:bold;">HEADER</span>, <span style="color:#c084fc;font-weight:bold;">PAYLOAD</span>, and <span style="color:#2dd4bf;font-weight:bold;">SIGNATURE</span> with live character counts and byte sizes.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>⏰ Live Timestamp Evaluation</h3>
      <p>Real-time relative calculation for <code>exp</code> (Expiration), <code>nbf</code> (Not Before), and <code>iat</code> (Issued At) with auto-ticking relative tags (e.g. <i>"Expired 2 hours ago"</i>, <i>"Expires in 3 days"</i>).</p>
    </td>
    <td width="50%">
      <h3>🔍 Deep Claims Inspector</h3>
      <p>Built-in registry of RFC 7519 & OpenID Connect registered claims with instant search, filtering (All / Standard / Custom), and human-readable descriptions.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🌍 Robust Unicode & Emoji Support</h3>
      <p>Handles international UTF-8 character encodings (Japanese Kanji, German umlauts, Spanish accents, and emojis) without throwing <code>URIError</code>.</p>
    </td>
    <td width="50%">
      <h3>📋 One-Click Copy Utilities</h3>
      <p>One-click clipboard copy for formatted Header JSON, Payload JSON, raw signature segments, and individual claim values with visual feedback.</p>
    </td>
  </tr>
</table>

---

## 🧭 Live Demo & Official Reference

You can try the live, fully interactive version of this tool online at:

🔗 **[https://himat.tech/free-tools/jwt-decoder](https://himat.tech/free-tools/jwt-decoder)**

---

## 🧩 Color-Coded Structure Overview

A standard JSON Web Token is comprised of three dot-separated Base64Url-encoded sections:

$$\text{\color{#fb7185}HEADER} \ . \ \text{\color{#c084fc}PAYLOAD} \ . \ \text{\color{#2dd4bf}SIGNATURE}$$

| Section | Color | Purpose | Example Contents |
| :--- | :---: | :--- | :--- |
| **Header** | 🔴 Rose | Token type & signing algorithm | `{"alg": "HS256", "typ": "JWT"}` |
| **Payload** | 🟣 Purple | Claims, user identity, & timestamps | `{"sub": "12345", "name": "Alex", "exp": 1819440000}` |
| **Signature** | 🟢 Teal | Binary cryptographic verification digest | `dBjftJeZ4CVP-mB92K27uhbUJU1p1r...` |

---

## 🔐 Supported Algorithms for Inspection

Because decoding a standard Base64Url-encoded token structure does not require knowing the signing secret or private key, this application supports decoding tokens from all standard RFC 7518 JWS algorithms:

- **HMAC (Symmetric)**: `HS256`, `HS384`, `HS512`
- **RSASSA-PKCS1-v1_5 (Asymmetric)**: `RS256`, `RS384`, `RS512`
- **ECDSA (Asymmetric)**: `ES256`, `ES384`, `ES512`
- **RSASSA-PSS (Asymmetric)**: `PS256`, `PS384`, `PS512`
- **Edwards-Curve**: `EdDSA` (`Ed25519`, `Ed448`)
- **Unsecured**: `none`

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation & Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/himat-technology/jwt-decoder.git
cd jwt-decoder
```

2. **Install dependencies:**
```bash
npm install
```

3. **Launch local development server:**
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## 🏗️ Production Build

To generate an optimized, zero-dependency static production bundle:

```bash
npm run build
```

The compiled assets will be in the `dist/` folder and can be deployed instantly to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static file server.

To preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Running Automated Tests

Run the complete Vitest test suite:

```bash
npm run test
```

To run tests with interactive watch mode:
```bash
npm run test:watch
```

**Test Suite Coverage:**
- `jwtDecoder.test.ts`: ASCII Base64Url decoding, UTF-8 / multi-byte Unicode strings, malformed token sections, invalid Base64, and JSON syntax errors.
- `jwtValidation.test.ts`: Algorithm metadata, RFC 7519 standard claims vs. custom application claim detection.
- `timestampUtils.test.ts`: Human-readable date formatting, `exp` expiration logic, `nbf` future/active validation, and relative time calculations.

---

## 📁 Architecture & File Structure

```
jwt-decoder/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Sticky brand navbar with client-side status & socials
│   │   ├── JwtInput.tsx            # Live JWT textarea, sample selector, paste & clear
│   │   ├── TokenStructure.tsx      # Color-coded token breakdown (Header.Payload.Signature)
│   │   ├── JsonViewer.tsx          # Syntax-highlighted JSON viewer with line numbers & copy
│   │   ├── ClaimInspector.tsx      # Claims explorer with search, filters, and RFC descriptions
│   │   ├── TimestampStatus.tsx     # Real-time auto-updating timestamp cards (exp, nbf, iat)
│   │   ├── CopyButton.tsx          # Accessible clipboard copy button with feedback
│   │   ├── FeatureSection.tsx      # 6 core feature showcase cards
│   │   ├── HowItWorks.tsx          # 3-step walkthrough guide
│   │   ├── FAQ.tsx                 # Accordion FAQ answering security & algorithm questions
│   │   └── Footer.tsx              # Security disclaimers, links & credits
│   ├── hooks/
│   │   └── useJwtDecoder.ts        # Custom hook for reactive decoding & 5s timestamp ticker
│   ├── utils/
│   │   ├── jwtDecoder.ts           # Base64Url decoding, UTF-8 parsing, and diagnostics
│   │   ├── jwtValidation.ts        # RFC 7519 / OIDC claim registry and algorithm metadata
│   │   ├── timestampUtils.ts       # Human date formatting, relative time calculation
│   │   ├── sampleJwt.ts            # High-quality standard, expired, and unicode demo tokens
│   │   └── __tests__/              # Comprehensive Vitest unit test suite
│   │       ├── jwtDecoder.test.ts
│   │       ├── jwtValidation.test.ts
│   │       └── timestampUtils.test.ts
│   ├── types/
│   │   └── jwt.ts                  # Comprehensive TypeScript interfaces
│   ├── App.tsx                     # Main page orchestrator
│   ├── main.tsx                    # React DOM root mounting
│   └── index.css                   # Global Tailwind CSS and custom styling
├── public/
│   └── favicon.svg                 # Custom SVG brand favicon
├── package.json                    # Project dependencies and npm scripts
├── vite.config.ts                  # Vite + Vitest config
├── tsconfig.json                   # Strict TypeScript configuration
├── tsconfig.node.json              # TypeScript Node bundler config
├── tailwind.config.js              # Color palette, dark theme, and fonts
├── postcss.config.js               # PostCSS setup
├── eslint.config.js                # ESLint configuration
├── README.md                       # Comprehensive documentation
└── .gitignore                      # Git ignored files
```

---

## ⚠️ Security Notice

> [!WARNING]
> **Decoding is NOT Cryptographic Verification**:  
> Decoding a JSON Web Token merely reveals what is encoded in its header and payload. Anyone can fabricate or alter an unverified payload. **Never** trust unverified JWT payloads in backend authorization decisions without cryptographically validating the signature with your secret key (HMAC) or public key (RSA/ECDSA).

---

## 🌐 Community & Connect

Stay connected with **HiMat Technology** for updates, developer tools, and open-source releases:

<div align="center">

| Platform | Link |
| :--- | :--- |
| 🌐 **Official Website** | [himat.tech](https://himat.tech) |
| ⚡ **Live JWT Tool** | [himat.tech/free-tools/jwt-decoder](https://himat.tech/free-tools/jwt-decoder) |
| 🐙 **GitHub** | [@himat-technology](https://github.com/himat-technology) |
| 💼 **LinkedIn** | [company/himat-technology](https://www.linkedin.com/company/himat-technology) |
| 📸 **Instagram** | [@himat_technologies](https://www.instagram.com/himat_technologies/) |
| 📘 **Facebook** | [Himat-technology](https://www.facebook.com/people/Himat-technology/61593829197445/) |

</div>

<br />

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal and commercial use.

<div align="center">
  <sub>Built with ❤️ by <a href="https://himat.tech">HiMat Technology</a></sub>
</div>
