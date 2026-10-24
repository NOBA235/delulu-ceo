---
doc: prd
status: approved
---

# Delulu CEO — Product Requirements

A single-page, satirical AI web app for developers, students, and young adults that transforms questionable life decisions into ridiculous, hyper-confident startup pitch decks.  
*Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`*

---

## The Core Journey
*Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`*

1. **Arrival:** The user opens the app and sees a clean, editorial-style hero section: "Your worst decisions. Our next unicorn."
2. **Confession:** The user types a questionable personal decision into a prominent multiline input up to 1,000 characters (or clicks a sample confession chip such as "Bought another keyboard" to populate the text area). A subtle character counter keeps them informed.
3. **Submission:** The user clicks "Pitch My Delusion →". If valid, the button shows a spinner ("Pitching to imaginary investors..."), the textarea switches to read-only mode (preserving visibility while preventing editing), an accessible live region announces the loading state, and rotating status copy keeps the waiting experience entertaining.
4. **Presentation:** Upon server completion, the app displays four structured, context-specific cards arranged like a miniature startup pitch presentation:
   - *01 The Startup Pitch* (Absurd company name, tight concept, investment rationale)
   - *02 The Forbes Headline* (Over-the-top fictional triumph)
   - *03 The Risk Analysis* (Glaring red flags spun as growth opportunities)
   - *04 The CEO Verdict* (Visual highlight: the comedic payoff balancing hype and a sharp roast)
5. **Sharing:** The user clicks "Copy My Delusion". The full pitch deck is formatted as clean, structured plain text and copied to their clipboard using the browser Clipboard API. Once the copy operation resolves successfully, the button temporarily displays "Copied!" alongside a confirmation notification: *"Delusion copied. Go convince your friends."* If the clipboard API fails, a clear inline fallback instructs the user to copy manually.
6. **Reset:** The user clicks "Pitch Another Delusion" to clear the results and return to the input screen ready for a fresh confession.

---

## Screens and Layout
*Source: `scope.md > The POC Boundary`*

Delulu CEO is a focused single-page application with two primary visual phases (Input View and Results View), built inside a centered, responsive column:

### 1. Header (Persistent)
- Top-left compact wordmark: `DELULU CEO` with a subtle playful CEO-themed icon.
- No navigation links, login modals, or distracting chrome.

### 2. Main Content Surface (Adaptive)
- **Phase A — Input Surface:**
  - Eyebrow tag: `YOUR PERSONAL DELUSION ENGINE`.
  - Hero headline: *"Your worst decisions. Our next unicorn."*
  - Supporting copy: Witty 1-sentence explanation of turning bad habits into venture-backed empires.
  - Confession text area: Generous height, centered focus, clean border, subtle shadow, 1,000-character cap with soft counter.
  - Sample chips: 2–3 compact pills beneath the text area ("Bought another keyboard", "Abandoned my side project", "Spent my rent money on gadgets").
  - Primary CTA: Prominent, high-contrast "Pitch My Delusion →" button.
  - Humorous loading container: Centered beneath the CTA during requests with `aria-live="polite"` for screen reader announcements.
- **Phase B — Results Surface:**
  - Summary banner showing the user's original confession.
  - 4-card pitch deck:
    - **Desktop:** Balanced 2×2 grid with uniform card heights and generous whitespace.
    - **Mobile:** Single-column vertical stack in presentation order (Pitch → Headline → Risk → Verdict).
  - Primary Action Bar:
    - Centered primary button: "Copy My Delusion".
    - Secondary button: "Pitch Another Delusion".
    - Accessible inline feedback message for copy confirmation or copy failure fallback.

---

## Look and Feel
*Source: `scope.md > Inspiration & Identity`*

- **Aesthetic:** "Premium editorial meets satirical tech." The visual credibility of a YC-backed fintech or high-end business journal contrasted with completely absurd content.
- **Palette & Contrast:**
  - *Background:* Warm off-white (`#FAF9F6`).
  - *Primary Text:* Deep near-black (`#171717`) meeting WCAG AA/AAA contrast ratios against the background.
  - *Secondary / Meta Text:* Muted slate gray (`#737373`) meeting WCAG AA contrast for text.
  - *Accent:* Confident deep emerald (`#087F5B`), reserved for the primary CTA, subtle card highlights, and positive confirmation states.
  - *Cards:* Crisp white surface (`#FFFFFF`) with thin neutral borders (`#E5E5E5`) and restrained, diffuse drop shadows.
  - *CEO Verdict Highlight:* Pale emerald tint (`#E6F4EA` with an emerald accent border) to give the final punchline distinct visual weight.
- **Typography & Accessibility:**
  - *Interface & Body:* Geist or Inter for crisp readability, clean labels, and modern spacing.
  - *Hero Headline:* Refined, restrained modern serif to give the launch statement an editorial magazine presence.
  - *Pitch Titles & Headlines:* Bold, high-conviction sans headings.
  - *Focus States:* Prominent, high-visibility focus rings (`focus-visible`) for all interactive elements (textarea, chips, buttons).
- **Design Boundaries:** Explicitly avoid neon colors, chaotic multi-color gradients, heavy glassmorphism, floating blur blobs, and generic purple-blue "AI chatbot" defaults.

---

## Features and Behavior

### Feature 1: Confession Input, Limits & Validation
- **Behavior:**
  - User can type multiline text into the confession input up to a strict limit of 1,000 characters.
  - A character count indicator shows remaining characters when approaching the limit.
  - Clicking any sample chip fills the textarea with that pre-written confession without auto-submitting.
  - Client validates input: empty/whitespace-only input or input exceeding 1,000 characters triggers an immediate inline message and sets focus to the textarea.
  - Server independently enforces the 1,000-character cap and rejects empty or oversized payloads with a 400 Bad Request error.
  - Typing or selecting a chip immediately clears active validation errors.
- **Acceptance Criteria:**
  - [ ] Submitting empty or whitespace-only input triggers the inline message: *"Even delusion needs a business idea. Confess something first."*
  - [ ] Input exceeding 1,000 characters is rejected client-side with a clear message: *"Your delusion is too ambitious. Please limit your confession to 1,000 characters."*
  - [ ] Server validates and rejects inputs >1,000 characters or empty strings, returning a structured JSON error.
  - [ ] Clicking a sample chip immediately inserts that text into the textarea without submitting.
  - [ ] No network or AI call is made when input is invalid.

### Feature 2: Pitch Generation, Abuse Prevention & Suspense State
- **Behavior:**
  - Clicking "Pitch My Delusion →" disables the button, displays a spinner, and updates text to *"Pitching to imaginary investors..."*
  - The confession input becomes `readOnly={true}` during generation, preserving text visibility while preventing edits.
  - Rapid double-clicks or repeated submissions are blocked by disabling the submit trigger.
  - An accessible live region (`aria-live="polite"`) announces the loading state to screen readers.
  - A humorous status indicator rotates beneath the button every ~2.5 seconds:
    - *"Convincing VCs this is a billion-dollar idea..."*
    - *"Rebranding your financial red flags as growth opportunities..."*
    - *"Preparing your Forbes cover story..."*
  - API request has a server-side timeout (e.g. 15 seconds) and token caps on prompt/output to prevent runaway cost and latency.
- **Acceptance Criteria:**
  - [ ] Submit button is disabled immediately upon click; duplicate submissions are prevented.
  - [ ] The confession input cannot be edited while a request is in flight.
  - [ ] Screen readers announce the loading status via an aria-live container.
  - [ ] If generation fails or times out, the input's editable state is fully restored and the original text is preserved.

### Feature 3: The 4 Satire Cards & Output Quality
- **Behavior:**
  - The server invokes the LLM using a server-side API key (never exposed to the client) and requests structured output under a strict JSON schema.
  - Output quality standards:
    - All four fields must be directly specific to the user's confession, witty, and concise.
    - Each field must serve a distinct comedic role (no redundant jokes across cards).
    - Tone balances hyperbolic Silicon Valley hype with playful self-deprecation; avoids cruel, offensive, or demeaning humor.
    - The CEO Verdict serves as the memorable punchline.
  - Server strictly validates that all 4 required fields are non-empty strings before returning 200 OK. If parsing fails or the LLM returns malformed data, the server returns an error. No fabricated placeholder results are displayed.
  - *Card 01 — Startup Pitch:* Displays fictional startup name, elevator pitch, and funding rationale.
  - *Card 02 — Forbes Headline:* Displays a breathless, hyper-optimistic headline celebrating the user.
  - *Card 03 — Risk Analysis:* Highlights red flags spun as radical competitive advantages.
  - *Card 04 — CEO Verdict:* Displays the final judgment with distinctive styling (emerald tint/border) as the visual and comedic highlight.
- **Acceptance Criteria:**
  - [ ] All four cards render with their respective numbered tags (`01 STARTUP PITCH`, `02 FORBES HEADLINE`, `03 RISK ANALYSIS`, `04 CEO VERDICT`).
  - [ ] Server validates JSON schema before responding; malformed responses trigger the error state rather than broken or fake cards.
  - [ ] Card text wraps cleanly without horizontal overflow or clipping.
  - [ ] Desktop renders a 2×2 grid; mobile screens stack 1 column in order 1 → 2 → 3 → 4.

### Feature 4: Clipboard Export, Fallback & Reset
- **Behavior:**
  - Clicking "Copy My Delusion" formats the cards into structured plaintext and writes to `navigator.clipboard`.
  - The copied text contains the actual generated content (the bracketed placeholders below indicate the data fields populated dynamically at runtime):
    ```text
    DELULU CEO
    Your worst decisions. Our next unicorn.

    🚀 STARTUP PITCH
    [Generated startup name]
    [Generated concept and investor pitch]

    📰 FORBES HEADLINE
    [Generated fictional headline]

    📉 RISK ANALYSIS
    [Generated risks spun humorously]

    👔 CEO VERDICT
    [Generated final verdict]

    Generated by Delulu CEO — Your worst decisions. Our next unicorn.
    ```
  - Only after the clipboard promise resolves successfully:
    - Button label switches to "Copied!".
    - An inline notification appears: *"Delusion copied. Go convince your friends."*
    - The confirmation remains for ~3 seconds before restoring the default button label.
  - If the Clipboard API fails (e.g., permissions denied or insecure context):
    - Show an inline fallback: *"Unable to copy automatically. Please select and copy the text manually."*
    - The success notification is NOT shown.
  - Clicking "Pitch Another Delusion" resets the state, clears the cards, and restores the editable input view.
- **Acceptance Criteria:**
  - [ ] Copied text contains the real generated strings, not literal brackets or template variables.
  - [ ] "Copied!" and confirmation text appear ONLY when clipboard writing succeeds.
  - [ ] If clipboard write rejects, the user sees an honest fallback message.
  - [ ] "Pitch Another Delusion" clears cards and re-enables the input without triggering any network call.

### Feature 5: Creator Share Card Download
- **Behavior:**
  - In the results view, the user can download a polished portrait PNG (4:5 ratio, 1080×1350) ready to post to social platforms.
  - The image presents Delulu CEO branding/tagline, the generated startup name, Forbes-style headline, and CEO verdict in a readable, branded layout.
  - The original confession is deliberately excluded from the image; the export uses only the generated pitch fields and app branding.
  - PNG creation happens in the browser from the current in-memory pitch. No account, database, third-party image API, or additional AI request is required.
  - Existing copy and reset actions remain available.
- **Acceptance Criteria:**
  - [ ] A user can download a valid 1080×1350 PNG from a generated pitch.
  - [ ] The PNG contains the startup name, Forbes headline, CEO verdict, and Delulu CEO branding, with text that remains legible and within the image bounds.
  - [ ] The user's original confession is not present in the downloaded image.
  - [ ] Download success and failure are communicated accessibly; if export fails, copy and reset still work.
  - [ ] The download action is usable by keyboard and on narrow mobile screens.

---

## States and Boundaries

- **Default / Empty State:** Landing page with clean input, sample chips, active CTA, no cards, no error messages.
- **Input Validation Error State:** Inline error below input: *"Even delusion needs a business idea. Confess something first."* or *"Your delusion is too ambitious. Please limit your confession to 1,000 characters."* Textarea receives focus.
- **Loading / Suspense State:** Confession textarea is `readOnly`, submit button is disabled with spinner, rotating humorous status messages announced via `aria-live="polite"`.
- **Network / API Failure State:**
  - Displays inline notice: *"Our imaginary investors have gone silent. Your delusion is safe—let's try again."*
  - Button restores to "Try Again".
  - Textarea returns to editable mode (`readOnly={false}`) with original confession intact.
  - No dummy/placeholder results are silently substituted.
- **Success State:** Input section transitions into the 2×2 card deck with original confession summary banner and action buttons.
- **Copied State:** "Copied!" button state with *"Delusion copied. Go convince your friends"* notification.
- **Clipboard Error State:** Inline notice: *"Unable to copy automatically. Please select and copy the text manually."*
- **Share Image Export State:** The user can trigger an in-browser PNG download; a success status or a clear retryable error is shown without losing the pitch.

---

## Product Decisions
*Source: User interview clarifications*

1. **Strict 1,000-Character Boundary:** Validated on both client and server to prevent prompt injection abuse, runaway token costs, and interface breakage.
2. **Server-Side API Key & Token Bounds:** Keep all LLM credentials strictly server-side in `.env`, bounded by max token parameters and a 15-second request timeout.
3. **Strict Schema Validation without Silent Fallbacks:** Require complete 4-field structured JSON from the model; on schema mismatch or API error, fail honestly with a retry action instead of serving fabricated responses.
4. **Editable Restoration on Failure:** The confession input becomes `readOnly` during flight to prevent race conditions, but is immediately re-enabled if an error occurs so users never lose their work.
5. **Verified Clipboard Confirmation:** Only display "Copied!" if `navigator.clipboard.writeText` successfully resolves; provide manual fallback if blocked.
6. **Accessible Foundations:** High-contrast color palette (meeting WCAG standards), explicit visible focus indicators on all interactive controls, and accessible status announcements for screen readers.

---

## What We're Building
- Responsive single-page application (light editorial theme: `#FAF9F6` background, `#171717` text, `#087F5B` emerald accent).
- Centered header with wordmark and CEO icon.
- Multiline confession input with 1,000-character cap and 3 sample chips.
- Client and server input validation with clear error states.
- Accessible loading state with rotating status text and `aria-live` announcement.
- Server-side LLM route using environment variables, prompt token bounds, and strict JSON schema validation.
- 2×2 desktop grid / stacked mobile cards with CEO Verdict punchline styling.
- Formatted clipboard export with verified success confirmation and manual fallback.
- Browser-generated, branded 1080×1350 PNG share card that excludes the original confession.
- State reset button.

---

## Deferred From the POC
- **Voiceover / TTS:** Audio playback of the CEO verdict in an arrogant executive voice.
- **Delusion Leaderboard / Wall of Fame:** Public feed of community-submitted pitches.
- **Batch generation, paid plans, and creator analytics:** Revisit only after validating creator demand.

---

## Non-Goals
- **User Accounts / Profiles:** Zero logins, passwords, or session cookies.
- **Persistent Database:** No saving pitches to Postgres/MongoDB; the clipboard carries the content to external platforms.
- **Multi-Route Navigation:** No separate `/about`, `/pricing`, or `/dashboard` pages.

---

## Open Questions
- None blocking product definition. Technical choices (Next.js App Router vs Vite, exact Gemini SDK model, styling tool) will be resolved in `4-spec`.
