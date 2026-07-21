# Smoke-Test Landing Page Outline

Use this template to build a single-page site that tests whether people will pay for your idea — before you write any code.

---

## Page Structure

### 1. Headline (above the fold)

**Formula:** [Desired outcome] without [current pain]

> Examples:
> - "Schedule meetings without the email ping-pong"
> - "Track your team's OKRs without weekly status meetings"
> - "Generate invoices in 10 seconds instead of 30 minutes"

### 2. Subheadline (supporting line)

**Formula:** One sentence that makes the pain specific.

> Examples:
> - "The average professional spends 8 hours per week on scheduling. Calendly cuts that to zero."
> - "Stop chasing your team for status updates. OKR Tracker automatically aggregates progress from Slack."

### 3. Hero Image

- Screenshot of the product (even if mockup).
- Or a 15-second screen recording.
- For pre-product: a well-designed mockup or illustration of the problem being solved.

### 4. Benefit Bullets (3-5)

Each bullet should describe an outcome, not a feature.

| Weak (feature) | Strong (outcome) |
|---------------|------------------|
| "Syncs with Google Calendar" | "Never double-book again" |
| "AI-powered analytics" | "Know exactly what's slowing your team down" |
| "Drag-and-drop builder" | "Launch your landing page in 10 minutes" |

### 5. Social Proof (if you have it)

- "Join 200+ beta testers" (even if it's 5).
- Testimonial from a beta user.
- "As featured in [publication]" — or just logotypes of companies whose teams have joined.

### 6. Pricing Section

- Show a real price. Don't say "coming soon" or "starting at."
- Offer a founding member discount if pre-launch.
- Example: "Launch special: $19/month (50% off for life)."

### 7. Call to Action

**Option A (strongest signal):** "Buy Now" → Stripe checkout
**Option B (weaker signal):** "Get Early Access" → email signup
**Option C (weakest):** "Join Waitlist" → email signup

Always prefer Option A if you can. Real credit card charges are the gold standard of validation.

---

## What to Measure

| Metric | Good | Great | Amazing |
|--------|------|-------|---------|
| Visitor → Email | >3% | >8% | >15% |
| Visitor → Purchase | >0.5% | >2% | >5% |
| CAC (if ads) | <$50 | <$20 | <$10 |
| Bounce rate | <60% | <40% | <25% |

---

## What to Change If It Fails

| Problem | Fix |
|---------|-----|
| Nobody visits | Wrong audience or wrong distribution channel |
| Visit but don't sign up | Headline doesn't resonate or value prop is unclear |
| Sign up but don't buy | Price is wrong or trust is missing |
| 0 pre-orders from cold traffic | Problem isn't painful enough → go back to research |

---

## Tools

- **Landing page:** Carrd, Unicorn Platform, or plain HTML/CSS
- **Email capture:** Loops, Mailgun, ConvertKit
- **Payments:** Stripe (one product, simple checkout)
- **Analytics:** Plausible or PostHog
