# Delulu CEO 👔🚀

> *"Your worst decisions. Our next unicorn."*

**Delulu CEO** is a satirical startup pitch generator that takes everyday questionable personal decisions, bad financial habits, and procrastination rabbit holes, and rebrands them as revolutionary, Series A-backed startup opportunities.

Built as a proof-of-concept for the **Build With AI: Basics** hackathon using the Devpost Learn Skill Pack plan-first methodology.

---

## 🌟 How It Works

1. **Confess a Habit:** Enter an impulsive purchase or questionable life choice (or pick an interactive preset chip).
2. **Consult the Imaginary Board:** An accessible, rotating loading state plays deadpan VC commentary while Gemini structures the pitch.
3. **The 2×2 Pitch Deck:**
   - **01. Startup Pitch:** Company name, business model, and VC FOMO rationale.
   - **02. Forbes Cover:** Sensationalized headline celebrating your imaginary empire.
   - **03. Risk Analysis:** Obvious red flags reframed as radical competitive moats.
   - **04. CEO Verdict (Highlight):** The brutal executive roast balancing hype with reality.
4. **Export & Reset:** One-click formatted plain-text copy (optimized for Discord/Slack/X sharing) with manual fallback and instant state reset.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS (Custom editorial palette `#FAF9F6`)
- **AI Model:** Google Gemini (`gemini-2.5-flash` via `@google/genai`)
- **Validation:** [Zod](https://zod.dev/) (Runtime validation on both HTTP requests and AI outputs)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** Node.js native test runner (`node --test`)

---

## 🛡️ Guardrails & Security

- **Strict Schema Validation:** Generation enforces Gemini's native JSON `responseSchema` plus server-side verification with `PitchResponseSchema.safeParse()`. No fabricated or broken cards are served.
- **Input Bounds:** 1,000-character cap validated on both client and server to prevent prompt injection and runaway token costs.
- **Rate Limiting:** In-memory sliding window limiter protecting the API from rapid-fire spam.
- **Timeout Protection:** 15-second `AbortController` timeout handling upstream stalls gracefully.
- **Server-Only Credentials:** `AI_API_KEY` stays strictly server-side and is never bundled to the client.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/NOBA235/delulu-ceo.git
cd delulu-ceo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example environment file:
```bash
cp .env.example .env.local
```
Add your Gemini API key in `.env.local`:
```env
AI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

Run the test suite:
```bash
npm test
```
Build for production:
```bash
npm run build
```

---

## 📂 Planning & Hackathon Artifacts

This project was built step-by-step following the Devpost Learn skills workflow:
- [`devpost/scope.md`](devpost/scope.md) — Unique kernel and proof-of-concept boundary.
- [`devpost/prd.md`](devpost/prd.md) — Product requirement document and core journey.
- [`devpost/spec.md`](devpost/spec.md) — Technical blueprint and schemas.
- [`devpost/checklist.md`](devpost/checklist.md) — Slices, verification steps, and commit history.
- [`devpost/app-map.html`](devpost/app-map.html) — Architecture diagram and reference code route.

---

## 📜 License
MIT License. Created for the **Build With AI: Basics** Hackathon.
