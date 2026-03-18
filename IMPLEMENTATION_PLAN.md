# CreditBuddy UK – Implementation Plan

This document is the step-by-step blueprint for building the site. Use it during development and tick off items as you go. No code is in this file—only what to build and in what order.

---

## Table of Contents

1. [Prerequisites & Tools](#1-prerequisites--tools)
2. [Phase 1: Project Setup](#2-phase-1-project-setup)
3. [Phase 2: Layout & Static Pages](#3-phase-2-layout--static-pages)
4. [Phase 3: Tool 1 – CCJ Duration Checker](#4-phase-3-tool-1--ccj-duration-checker)
5. [Phase 4: Tool 2 – Credit Report Error Checker](#5-phase-4-tool-2--credit-report-error-checker)
6. [Phase 5: Tool 3 – 30-Day Credit Boost Planner](#6-phase-5-tool-3--30-day-credit-boost-planner)
7. [Phase 6: Optional Email Capture & Firebase](#7-phase-6-optional-email-capture--firebase)
8. [Phase 7: Affiliate Links & Monetization](#8-phase-7-affiliate-links--monetization)
9. [Phase 8: SEO & Launch](#9-phase-8-seo--launch)
10. [Data Flow Summary](#10-data-flow-summary)
11. [File & Folder Map](#11-file--folder-map)
12. [Environment Variables](#12-environment-variables)
13. [Pre-Launch Checklist](#13-pre-launch-checklist)

---

## 1. Prerequisites & Tools

Before writing code, you will need:

| Item | Purpose |
|------|--------|
| **Node.js** (LTS) | Runs the project and build tools. Install from nodejs.org. |
| **npm** or **pnpm** | Comes with Node; used to install packages. |
| **Code editor** | e.g. VS Code / Cursor. |
| **Firebase account** | Free tier; for optional auth and Firestore. Create at console.firebase.google.com. |
| **Git** (optional) | For version control. Recommended but not required to start. |

You do **not** need a database server, separate backend, or paid hosting to begin. Firebase free tier is enough for this project.

---

## 2. Phase 1: Project Setup

**Goal:** A running SvelteKit app and a locked-down Firebase project. No tools yet.

### 2.1 Create the SvelteKit project

- Use the official SvelteKit create flow (e.g. `npm create svelte@latest`).
- Choose: SvelteKit demo app or minimal template, TypeScript or JavaScript (your choice), no extra adapters yet (we can add Firebase Hosting adapter later if needed).
- Install dependencies and confirm the dev server runs (e.g. `npm run dev` → open localhost).

### 2.2 Create the Firebase project

- In Firebase Console: create a new project (e.g. "CreditBuddy UK").
- Enable **Authentication** – only if we will use optional sign-in or email capture later. Start with Email/Password and/or Google sign-in disabled until Phase 6.
- Enable **Firestore Database** – choose "Start in production mode" (locked by default).
- Do **not** add any security rules that allow public read/write. Leave rules as deny-all until we define them in Phase 6.
- Register a **Web app** in the project; copy the Firebase config object (apiKey, projectId, etc.). We will put this in environment variables, not in source code.

### 2.3 Project structure (create folders and placeholders)

Create this structure so we know where everything lives. You can create empty files or minimal placeholder files:

```
src/
  routes/
    +layout.svelte          ← Main layout (header, footer, nav)
    +page.svelte            ← Home
    about/
      +page.svelte          ← About
    privacy/
      +page.svelte          ← Privacy
    terms/
      +page.svelte          ← Terms
    tools/
      ccj-checker/
        +page.svelte        ← CCJ Duration Checker
      credit-report-checker/
        +page.svelte        ← Credit Report Error Checker
      30-day-planner/
        +page.svelte        ← 30-Day Credit Boost Planner
  lib/
    components/             ← Reusable UI (buttons, cards, etc.)
    logic/                  ← Client-side tool logic only
    firebase/               ← Firebase config and helpers (Phase 6)
static/
  favicon, images, robots.txt later
```

- Add a **.env.example** file at project root listing every environment variable we will use (e.g. `VITE_FIREBASE_*` or `PUBLIC_FIREBASE_*`). Do **not** put real keys in it.
- Add **.env** to **.gitignore** so secrets are never committed.

### 2.4 Phase 1 done when

- [ ] SvelteKit app runs locally.
- [ ] Firebase project exists; Firestore is in production mode; no permissive rules.
- [ ] Folder structure and .env.example exist; .env is gitignored.

---

## 3. Phase 2: Layout & Static Pages

**Goal:** A consistent layout and all non-tool pages. No tools, no Firebase yet.

### 3.1 Layout (+layout.svelte)

- **Header:** Logo/name "CreditBuddy UK", navigation links to Home, Tools (or dropdown), About, Privacy, Terms.
- **Footer:** Short disclaimer (e.g. "Information only, not financial advice"), link to Privacy, link to Terms, optional "Contact" or email.
- **No auth UI yet** – no "Sign in" or "Sign out" until Phase 6.

### 3.2 Home page (+page.svelte)

- Short value proposition (UK credit education, free tools).
- Clear links or cards to the three tools: CCJ Checker, Credit Report Error Checker, 30-Day Planner.
- Optional: one sentence on "We may earn from recommended links" with link to full disclosure (e.g. in footer or a dedicated page).

### 3.3 About page

- Who the site is for, what the tools do, that we don’t store sensitive financial data. Keep it short.

### 3.4 Privacy Policy page

- What data we collect (e.g. optional email, basic usage if we add analytics).
- That we do **not** store credit scores or sensitive financial data.
- How long we keep data, user rights (access, deletion), and that we use Firebase (Google) for optional features. Link to Google’s privacy policy where relevant.
- GDPR-friendly: lawful basis (e.g. consent for email), right to withdraw, right to complain to ICO.

### 3.5 Terms of Use page

- Use of the site for information only; not professional advice; we’re not liable for decisions made from the tools. Keep language simple.

### 3.6 Styling

- Use a simple, consistent approach (e.g. one CSS file or SvelteKit’s recommended global styles). Make it readable and accessible (contrast, font size). No need for a heavy UI library unless you want one later.

### 3.7 Phase 2 done when

- [ ] Layout appears on every page with header and footer.
- [ ] Home, About, Privacy, Terms, Terms of Use are done and linked.
- [ ] All three tools are linked from the home page (they can still be placeholder "Coming soon" pages for now).

---

## 4. Phase 3: Tool 1 – CCJ Duration Checker

**Goal:** User enters CCJ date (and optionally type); all logic runs in the browser; result is shown on the same page. Nothing is sent to the server.

### 4.1 Page route

- **URL:** `/tools/ccj-checker` (or `/tools/ccj-duration-checker` – pick one and stick to it).

### 4.2 User inputs (client-side only)

- **Date of judgment** – required. Use a date picker or three dropdowns (day, month, year).
- **Satisfied or unsatisfied** – optional but recommended. A satisfied CCJ can be removed from the register earlier (paid within one month and removed from public record; still on credit file for 6 years from date of judgment). Unsatisfied stays 6 years from judgment date.

### 4.3 Logic (in `src/lib/logic/` or similar)

- All in JavaScript/TypeScript that runs in the browser only.
- **Rules to implement (UK):**
  - CCJ stays on the **credit file** for 6 years from the **date of judgment** (whether satisfied or not for file duration).
  - If **satisfied within 1 month** of judgment: can apply for certificate of cancellation and have it **removed from the public Register of Judgments** (it still stays on credit file for 6 years).
  - If satisfied **after 1 month**: stays on Register for 6 years; stays on credit file for 6 years from judgment date.
- **Outputs to show:**
  - Date the CCJ will drop off the credit file (judgment date + 6 years).
  - If satisfied within one month: note that it can be removed from the public register (and optionally link to official guidance).
  - Short, plain-English explanation.

### 4.4 UI flow

1. Page loads with a short intro and the form (date + satisfied yes/no).
2. User fills and submits (or we calculate on change).
3. Result appears on the same page: "Your CCJ will drop off your credit file on [date]." Plus any extra line about the register if relevant.
4. No loading spinner to server; no form data sent to our backend.

### 4.5 Phase 3 done when

- [ ] CCJ checker page works with date (and optionally satisfied) input.
- [ ] All calculations and text are correct per UK rules.
- [ ] No sensitive data is sent to any server; logic is client-side only.

---

## 5. Phase 4: Tool 2 – Credit Report Error Checker

**Goal:** A step-by-step guide/checklist that users can tick through. All state is local (browser only) or in memory. No server storage of answers.

### 5.1 Page route

- **URL:** `/tools/credit-report-checker` (or `/tools/credit-report-error-checker`).

### 5.2 Concept

- This is an **educational checklist**, not a data processor. We don’t ask users to paste their report or upload anything.
- Content: common errors (wrong address, duplicate accounts, wrong account status, outdated defaults, etc.). For each, we give: "What to look for" and "What to do" (e.g. dispute with the agency or lender).

### 5.3 User interaction

- List of error types. Each item can be expanded (e.g. accordion) to show "What to look for" and "What to do."
- Optional: simple "I’ve checked this" checkbox per item. If we store that, use **localStorage only** (key like `credit-report-checker-progress`). No server, no Firebase for this.

### 5.4 Content (to write in the page or in a small client-side data file)

- 5–10 common errors, each with:
  - Title (e.g. "Wrong personal details").
  - What to look for (one or two short paragraphs).
  - What to do (steps: which agency, link to dispute process, etc.).
- Links to official sources (e.g. Experian, Equifax, TransUnion UK) for disputing. These can become affiliate links in Phase 7.

### 5.5 Phase 4 done when

- [ ] Credit Report Error Checker page is live with all checklist items and copy.
- [ ] Any "progress" is localStorage only or not stored at all.
- [ ] No user data from this tool is sent to our server or Firebase.

---

## 6. Phase 5: Tool 3 – 30-Day Credit Boost Planner

**Goal:** A day-by-day plan (e.g. 30 days) with one or two actions per day. Users can mark days done; state is localStorage only.

### 6.1 Page route

- **URL:** `/tools/30-day-planner` (or `/tools/credit-boost-planner`).

### 6.2 Content

- 30 days of simple, actionable steps (e.g. "Check your report", "Register to vote", "Pay a bill on time", "Dispute one error"). Mix of one-off and repeat actions.
- Each day: title + short description. No need for user to enter personal data; this is a generic plan.

### 6.3 User interaction

- List or calendar view of days 1–30.
- Each day has a "Mark as done" (or "Done") control. Store completion in **localStorage** only (e.g. key `30-day-planner-done` with array of day numbers or object). No server, no Firebase for this.

### 6.4 Logic

- Client-side only: read/write localStorage, show which days are done. Optional: "You’ve completed X of 30 days" or a simple progress message.

### 6.5 Phase 5 done when

- [ ] 30-day planner page shows all 30 days with clear actions.
- [ ] "Mark as done" works and persists in localStorage only.
- [ ] No data from this tool is sent to our server or Firebase.

---

## 7. Phase 6: Optional Email Capture & Firebase

**Goal:** Optional email sign-up, GDPR-compliant, stored in Firestore with strict rules. No sensitive data.

### 7.1 When to show email capture

- Optional: after a tool result (e.g. "Get more tips – optional email") or in the footer, or a small banner. Never required to use the tools.
- One clear purpose: e.g. "Credit tips and updates."

### 7.2 Form and consent

- Fields: email only (or email + explicit consent checkbox). No name required unless we decide otherwise.
- **Consent:** "I agree to receive [description] and have read the Privacy Policy." Link to Privacy Policy. Checkbox must be unchecked by default.
- Submit only when checkbox is checked. Store consent wording or a consent flag with the email (e.g. "consent: tips and updates, date, IP or no IP per your privacy policy").

### 7.3 Firebase setup

- **Authentication:** Enable only if we want "sign in" (e.g. Email/Password or Google). For a simple "email only" newsletter we can skip auth and write to Firestore from the app with security rules.
- **Firestore collection:** e.g. `subscribers` or `email_signups`.
  - Fields: `email`, `consentText` or `consent: true`, `createdAt`, optional `source` (e.g. "ccj-checker", "footer").
  - No credit data, no passwords in this collection if we’re not using auth.

### 7.4 Security rules (plain language)

- **Default:** deny all read and write.
- **Allow:** create only (no update or delete by client) for the `subscribers` collection, and only if:
  - The document has `email` (string), `consent` or `consentText`, and `createdAt`.
  - Optionally: validate email format in rules or in app (we do in app; rules can restrict field presence).
- **No** allow read or list for clients. Only our backend (or Firebase Admin in future) should read emails, e.g. for export or sending emails via a separate tool.

### 7.5 Implementation steps

- Add Firebase SDK (client-only) to the project. Initialize from environment variables (e.g. `VITE_FIREBASE_*` or `PUBLIC_*`).
- Create a small helper in `src/lib/firebase/` for Firestore (e.g. `addSubscriber(email, consent)` that does one `addDoc` to `subscribers`).
- Add the form component; on submit, call the helper, then show "Thanks, you’re signed up" or "Something went wrong, try again."
- Do not send any tool inputs (CCJ date, checklist answers, planner progress) to Firebase.

### 7.6 Phase 6 done when

- [ ] Email capture form exists and is optional.
- [ ] Consent checkbox and Privacy Policy link are present; checkbox default unchecked.
- [ ] Firestore rules deny all except single-document create for `subscribers` with required fields.
- [ ] No sensitive or tool data is stored in Firebase.

---

## 8. Phase 7: Affiliate Links & Monetization

**Goal:** Add affiliate links where relevant, with clear disclosure. No user data shared.

### 8.1 Where to add links

- Credit Report Error Checker: links to "Get your report" or "Dispute with [Agency]" can be affiliate links to report providers.
- 30-Day Planner: e.g. "Get your free report" link.
- Footer or a "Recommended services" section: same links with short descriptions.

### 8.2 How to implement

- Store affiliate URLs in config (e.g. `src/lib/config/affiliate.ts` or `.env`). Use one variable per partner (e.g. `AFFILIATE_EXPERIAN_URL`). Build full URL in the app (e.g. base + our ID).
- Use normal `<a href="...">` or SvelteKit’s link; no automatic tracking of user data. If we add analytics later, use a generic event like "Clicked external link – credit report" without passing email or tool data.
- **Disclosure:** In footer and/or near the first affiliate link: "We may earn a small commission if you use our links to sign up for services. This doesn’t affect our recommendations." Link to a short "How we make money" or include in Privacy/Terms.

### 8.3 Phase 7 done when

- [ ] Affiliate links are in place where agreed.
- [ ] Disclosure is visible (footer or dedicated line).
- [ ] No user data is sent to affiliate partners; only normal link clicks.

---

## 9. Phase 8: SEO & Launch

**Goal:** Crawlable, indexable pages and a clean launch.

### 9.1 Per-page SEO

- **Every page:** Unique `<title>` and meta `description` (e.g. in SvelteKit: use a layout or each page’s load/script to set or pass meta).
- **Structured content:** One clear H1 per page; H2 for main sections. No need for complex schema.org initially; we can add later if needed.

### 9.2 Sitemap and robots

- **Sitemap:** List all public URLs (home, about, privacy, terms, three tools). Generate at build time or use a simple route like `/sitemap.xml`.
- **robots.txt:** Allow crawlers; point to sitemap (e.g. `Sitemap: https://yoursite.com/sitemap.xml`). Place in `static/robots.txt` or generate dynamically.

### 9.3 Deployment

- Build: `npm run build`. Test the production build locally (e.g. `npm run preview`).
- Deploy to Firebase Hosting, Vercel, or another static/hybrid host. Set environment variables in the host’s dashboard (same names as in .env.example).
- Point your domain (e.g. creditbuddyuk.co.uk) to the host and enable HTTPS.

### 9.4 Phase 8 done when

- [ ] All pages have title and meta description.
- [ ] Sitemap and robots.txt are live.
- [ ] Site is deployed and accessible over HTTPS.
- [ ] .env is not in the repo; production env vars are set on the host.

---

## 10. Data Flow Summary

| Feature | User input | Where it runs | Stored? |
|--------|------------|----------------|---------|
| CCJ Checker | Date, satisfied yes/no | Browser only | No |
| Credit Report Checker | Checklist expand / tick | Browser only | Optional localStorage only |
| 30-Day Planner | Mark days done | Browser only | localStorage only |
| Email sign-up | Email + consent | Browser → Firebase (one write) | Firestore `subscribers` only |
| Affiliate click | Click link | Browser → external site | No (we don’t send user data) |

---

## 11. File & Folder Map

Quick reference for where things live:

| Purpose | Location |
|--------|----------|
| App shell, header, footer | `src/routes/+layout.svelte` |
| Home, About, Privacy, Terms | `src/routes/+page.svelte`, `about/+page.svelte`, etc. |
| CCJ checker UI | `src/routes/tools/ccj-checker/+page.svelte` |
| CCJ checker logic | `src/lib/logic/ccj.ts` (or similar) |
| Credit report checker UI | `src/routes/tools/credit-report-checker/+page.svelte` |
| 30-day planner UI | `src/routes/tools/30-day-planner/+page.svelte` |
| Planner content/data | `src/lib/logic/planner-days.ts` or in the page |
| Reusable UI | `src/lib/components/` |
| Firebase init & helpers | `src/lib/firebase/` |
| Affiliate/config | `src/lib/config/` or `.env` |
| Static assets | `static/` |

---

## 12. Environment Variables

Keep these in `.env` (and list in `.env.example` without real values):

| Variable | Purpose |
|----------|--------|
| `PUBLIC_FIREBASE_API_KEY` | Firebase client config |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `PUBLIC_FIREBASE_STORAGE_BUCKET` | Optional |
| `PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Optional |
| `PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `AFFILIATE_*_URL` (per partner) | Optional; affiliate base URLs |

Use the exact names your SvelteKit/Firebase setup expects (e.g. Vite uses `VITE_` prefix for client-exposed vars; SvelteKit may use `PUBLIC_`). Document the chosen prefix in this file when you set the project up.

---

## 13. Pre-Launch Checklist

Before going live, confirm:

- [ x] All three tools work and calculations are correct (especially CCJ dates).
- [x ] No credit data or sensitive inputs are stored on the server or in Firebase (except optional email in `subscribers`).
- [ ] Firestore rules are deny-by-default; only the intended create is allowed for `subscribers`.
- [ ] Privacy Policy and Terms are in place; email capture has explicit consent and links to Privacy.
- [ ] Affiliate disclosure is visible.
- [ ] SEO: titles, descriptions, sitemap, robots.txt.
- [ ] HTTPS works; no API keys in source code; production env vars set on host.
- [ ] Test on a mobile-sized screen and fix any layout or tap targets.

---

When you’re ready to start coding, begin with **Phase 1** and work through in order. You can tick off the "Phase X done when" and "Pre-Launch Checklist" items as you go. If you want, the next step can be a concrete **Phase 1 task list** (exact commands and file names) so you can implement setup without guessing.
