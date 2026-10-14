---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Scaffold Next.js app and build confession landing form with validation**
  Becomes usable: A running Next.js web application displaying the premium editorial landing page (`#FAF9F6`), wordmark, hero headline, confession input with 1,000-character cap and live counter, 3 interactive sample chips, and instant client-side validation.
  Why now: Bootstraps the project scaffold, dependencies, TypeScript config, and Tailwind styling inside slice one, giving the core user journey its landing foundation before introducing backend complexity.
  PRD ref: `prd.md > Feature 1: Confession Input, Limits & Validation`, `prd.md > Screens and Layout`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Stack & Dependencies`, `spec.md > File Structure`, `spec.md > Components` (`components/confession-form.tsx`)
  Build: Initialize Next.js App Router with TypeScript and Tailwind CSS, configure the editorial theme palette, create `app/layout.tsx` and `app/page.tsx`, implement `components/confession-form.tsx` with sample chips and Zod client validation (`lib/validation/pitch-request.ts`).
  Verify (mechanical): Run `npm run build` and start the dev server to confirm zero compilation errors; test empty and >1,000 character submissions to verify validation error rendering without form submission.
  Learner check: Open `http://localhost:3000`, click the sample chips to see them populate the textarea, test typing and submitting empty text to see the inline error message, and confirm the visual styling matches the planned editorial look.
  Commit: `feat: scaffold app and build confession landing form`

- [x] **2. Server-side API endpoint with AI provider adapter, timeout, rate limiting, and strict schema validation**
  Becomes usable: A functioning `POST /api/pitch` endpoint that validates incoming requests with Zod, applies in-memory rate limiting and a 15-second timeout, calls the AI provider via a clean adapter interface, and validates the 6-field structured JSON response.
  Why now: Risk first. Proves the external AI integration, token capping, prompt engineering, and response validation independently on the server before wiring it into UI state.
  PRD ref: `prd.md > Feature 2: Pitch Generation, Abuse Prevention & Suspense State`, `prd.md > Feature 3: The 4 Satire Cards & Output Quality`
  Spec ref: `spec.md > AI Provider Abstraction & Prompt Design`, `spec.md > Data Model & State Machine`, `spec.md > Security, Cost & Abuse Prevention`
  Build: Implement `lib/validation/pitch-request.ts` and `lib/validation/pitch-response.ts`, create `lib/ai/types.ts` and `lib/ai/providers/gemini-adapter.ts`, build `lib/ai/generate-pitch.ts` with 15s AbortController and prompt engineering, set up `lib/security/rate-limit.ts`, and wire the handler in `app/api/pitch/route.ts` with error envelopes. Create `.env.example`.
  Verify (mechanical): Run an automated API verification script against `POST /api/pitch` using a sample confession to confirm a 200 OK response with all 6 required fields present and non-empty; send invalid/empty payloads to verify 400 Bad Request error envelopes.
  Learner check: Inspect the test script output or curl response to verify that the generated startup name, concept, Forbes headline, risk analysis, and CEO verdict are witty, context-specific, and match the schema.
  Commit: `feat: implement server-side AI pitch generation with strict schema validation`

- [ ] **3. Wire frontend to API with accessible humorous loading state, error recovery, and 2x2 pitch deck rendering**
  Becomes usable: The complete end-to-end core journey. Submitting a confession triggers the rotating humorous loading state, locks the input to read-only, calls `/api/pitch`, handles API errors gracefully with a "Try Again" recovery action, and renders the four satirical cards in a responsive 2×2 grid with the highlighted CEO Verdict.
  Why now: Delivers the core product payoff and kernel early by connecting the proven frontend form to the proven backend generation.
  PRD ref: `prd.md > Feature 2: Pitch Generation, Abuse Prevention & Suspense State`, `prd.md > Feature 3: The 4 Satire Cards & Output Quality`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > The Core Journey Through the System`, `spec.md > Components` (`components/loading-status.tsx`, `components/pitch-deck.tsx`, `components/pitch-card.tsx`)
  Build: Implement `components/loading-status.tsx` with ~2.5s rotating status lines and `aria-live="polite"`. Build `components/pitch-deck.tsx` and `components/pitch-card.tsx` with responsive 2×2 grid styling and distinctive emerald highlighting on Card 04. Wire form submission in `app/page.tsx` with read-only lock and error recovery.
  Verify (mechanical): Run end-to-end component/browser checks confirming that: (1) loading state displays rotating messages and disables submit, (2) successful generation renders all 4 cards with correct tags and CEO verdict highlight, and (3) simulated API failure displays the error message and restores the editable input with original text intact.
  Learner check: Open the app, type a real questionable decision (or use a sample chip), click "Pitch My Delusion →", watch the rotating loading status, and read through the four generated cards on screen.
  Commit: `feat: connect core pitch flow with humorous loading and 2x2 card deck`

- [ ] **4. Formatted clipboard export with fallback and full state reset**
  Becomes usable: The complete, shareable loop. Users can click "Copy My Delusion" to place formatted plain text onto their clipboard (with "Copied!" button feedback and toast notification), see a manual fallback if clipboard permissions fail, and click "Pitch Another Delusion" to reset the interface for a fresh confession.
  Why now: Closes the product loop and delivers the primary sharing requirement needed for a 60-second hackathon demonstration video.
  PRD ref: `prd.md > Feature 4: Clipboard Export, Fallback & Reset`, `prd.md > The Core Journey` (steps 5-6)
  Spec ref: `spec.md > Components` (`components/copy-actions.tsx`), `spec.md > Important Failure Modes & Fallbacks`
  Build: Implement `lib/clipboard/format-pitch.ts` with exact plain-text template. Create `components/copy-actions.tsx` with `navigator.clipboard.writeText`, success toast, manual copy fallback, and state reset logic. Integrate into `app/page.tsx`.
  Verify (mechanical): Run unit test verifying `formatPitch` produces the exact plain-text structure containing real data (no bracket placeholders); test clipboard copy and reset state transitions.
  Learner check: Generate a pitch, click "Copy My Delusion", paste into a text editor or Discord to inspect the formatting, and click "Pitch Another Delusion" to confirm the app resets cleanly without making an API call.
  Commit: `feat: add formatted clipboard export and state reset`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — end-to-end generation and 2×2 card presentation tried at Slice 3
- [ ] Final kick-the-tires exploration and feedback completed — full app tested with clipboard export and reset at Slice 4

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be filled upon completion]
Route and stops: [to be filled upon completion]
Edit outcome: [to be filled upon completion]
Reflection: [to be filled upon completion]
Activity mode: [to be filled upon completion]

## Revisions


