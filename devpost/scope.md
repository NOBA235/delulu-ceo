---
doc: scope
status: approved
---

# Delulu CEO

A humorous AI-powered web app that transforms questionable personal decisions into ridiculous, hyper-confident startup pitch decks.

## The Unique Kernel
Deadpan Silicon Valley corporate delusion applied to terrible personal life choices. Instead of generic AI jokes or earnest life advice, Delulu CEO treats your worst financial and lifestyle habits as Series A-worthy unicorn opportunities, broken into four structured satire pillars:
1. **The Startup Pitch:** An absurd company name, what the business supposedly does, and why investors should fund it.
2. **The Forbes Headline:** A fictional, over-the-top headline celebrating your imaginary empire.
3. **The Risk Analysis:** Glaring financial and personal red flags spun with absurd, unflinching optimism.
4. **The CEO Verdict:** A brutally honest final judgment balancing supportive hype with a sharp roast.

## Who It's For
Developers, students, and young adults making questionable everyday decisions (impulse purchases, late-night rabbit holes, abandoned side projects, neglected budgets) who want to laugh at their own habits and share the joke with friends on Discord, WhatsApp, or X.

## The Core Loop
1. **Confess:** The user lands on a clean, minimal interface and types their questionable decision into a prominent input box (or clicks a sample confession chip).
2. **Pitch:** The user clicks "Pitch My Delusion" and experiences an entertaining, humorous loading state with robust feedback if requests take longer than expected.
3. **Reveal:** The app displays four beautifully styled cards arranged like a miniature startup pitch presentation.
4. **Share & Reset:** The user clicks "Copy My Delusion" to grab clean, formatted text for social sharing (receiving an instant "Delusion copied. Go convince your friends" confirmation), or resets immediately to confess another bad decision.

## Inspiration & Identity
- **Tone:** Deadpan corporate optimism meets sharp comedic roasting. Specific, witty, and contextual to the user's input—avoiding bland, generic AI cheerleading.
- **Visuals:** Premium, minimal, intentional. Sharp typography, disciplined spacing, and clean card containers reminiscent of a high-end fintech or startup launch page rather than a cluttered AI playground.
- **Copy:** "Your worst decisions. Our next unicorn."

## Why This Matters to the Learner
- Practice a disciplined, plan-first, spec-driven workflow to actively prevent scope creep and manage complexity.
- Build a genuinely funny, memorable proof of concept that can be completed, verified, and recorded in a 1-minute video within the hackathon timeframe.
- Understand the code structure, tradeoffs, and key architectural choices rather than passively accepting generated code.

## What "Working" Looks Like
A user opens the app locally, types a real confession (or clicks a sample chip like *"I spent all my savings on a mechanical keyboard"*), clicks "Pitch My Delusion", is greeted by a humorous CEO-style loading state, and receives four distinct, witty cards rendered on screen (with 2–4 seconds as an aspiration, backed by resilient slow-request handling). Clicking "Copy My Delusion" places a formatted summary on their clipboard, triggers a *"Delusion copied. Go convince your friends"* notification, and a "Pitch Another" button resets the state cleanly. The entire workflow is demonstrated in under 60 seconds on video.

## The POC Boundary
**In for POC:**
- Single-page application with responsive, minimal design.
- Large confession text input with empty-input validation and 2–3 quick-click sample decision chips for fast testing and video demonstration.
- Server-side structured LLM generation with strict output schema validation (no API keys exposed client-side).
- Clear, honest error handling and retry mechanism on API failures (no silent substitution of fake results).
- Humorous loading state with patience copy for slow generations.
- Mini-deck card layout presenting the pitch, headline, risk analysis, and verdict.
- One-click formatted clipboard export with confirmation feedback.
- Reset / new confession action.

**Later:**
- Downloadable PNG/image export for Instagram Stories / social cards.
- Text-to-speech audio narration of the CEO verdict in an arrogant executive voice.
- Community "Wall of Delusion" feed featuring top anonymous pitches.

**Explicitly Cut:**
- **User Authentication / Accounts:** Adds onboarding friction and backend complexity with zero gain for a comedy POC.
- **Database / Persistent History:** Unnecessary for the core loop; clipboard sharing satisfies user distribution.
- **Multi-page Navigation:** Keep everything in a focused, single-view reactive flow.

## Key Assumptions & Constraints
- The app uses an LLM API key kept exclusively on the server, loaded via `.env`, and guaranteed excluded from Git.
- Generation uses structured output guarantees so cards render reliably.
- Real API calls are validated; failures show clear comedic error/retry messaging rather than pretending a call succeeded with hardcoded fallbacks.
- The proof of concept runs locally during development and evaluation, fulfilling the hackathon requirement of a working demo video and public GitHub repository without mandatory cloud deployment.
