# 7. Build the MVP

## The Principle

Your MVP is not the smallest version of your grand vision. It's the fastest way to deliver the core value and get paying customers. Features you cut are not losses — they're time you saved.

The question isn't "what can I build?" It's "what's the least I need to build for someone to pay me?" If you can deliver the core value with a manual process behind the scenes, do that first. Automate when the manual process breaks.

## The Checklist

### Scope the MVP

- [ ] Identify the **core loop:** the one action a user takes that delivers the value they're paying for.
- [ ] Everything else is secondary. Cut it from v1.
- [ ] List every feature you think you need. Rank by:
  - Essential for core value delivery?
  - Required for first payment?
  - Nice-to-have?
- [ ] Cut everything in the "nice-to-have" bucket. Cut 50% of the "required" bucket.
- [ ] Set a deadline: 4-8 weeks. If you can't ship in 8 weeks, reduce scope.

### Choose Your Stack

**For a solo founder or small team:**
- [ ] Use a framework you already know. Speed matters more than "the right tool."
- [ ] **Frontend:** React + Next.js or Vue + Nuxt. Both have huge ecosystems, templates, and deployment options.
- [ ] **Backend:** Use Next.js API routes (full-stack on one framework) or a simple Node/Express/Python API.
- [ ] **Database:** PostgreSQL (Supabase or Railway) — the standard for SaaS. SQLite for very simple apps.
- [ ] **Auth:** Clerk, Lucia, or Supabase Auth. Don't build auth yourself.
- [ ] **Payments:** Stripe (standard) or Paddle/Lemon Squeezy (for global tax handling).
- [ ] **Hosting:** Vercel (frontend), Railway/Fly.io (backend), Supabase (DB).
- [ ] **Email:** Resend, Loops, or Mailgun.
- [ ] **Monitoring:** Sentry (errors), PostHog (analytics), Better Stack (uptime).

**For APIs / infrastructure SaaS:**
- [ ] Go, Rust, or TypeScript for performance-critical paths.
- [ ] Redis for caching and rate limiting.
- [ ] Queue (BullMQ, RabbitMQ, or SQS) for background jobs.

### Build the Core Loop First

- [ ] Onboarding → core action → value delivered → retention loop.
- [ ] Example (Calendly): Sign up → connect calendar → share link → someone books → get notified.
- [ ] Example (project management): Sign up → create project → invite team → assign task → mark done.
- [ ] Don't support edge cases (SSO, teams, roles, permissions, export).
- [ ] Hardcode configuration where possible. Don't build a settings page in v1.

### The "Manual Backend" Approach

- [ ] If automating a process would take 2+ weeks, do it manually first.
- [ ] Example: "Send weekly report to customer." Manually email it for the first 10 customers. Then automate.
- [ ] Example: "Onboarding call." Give them a 15-minute Zoom instead of building in-app onboarding.
- [ ] You don't have a scaling problem until you're paying customers faster than you can serve them manually.

### Launch With a Bare Minimum

- [ ] Stripe checkout that works.
- [ ] Error handling that doesn't lose data.
- [ ] Basic email on signup and payment confirmation.
- [ ] A way for customers to contact you (email, Slack, or Intercom widget).
- [ ] Legal pages: Privacy policy, terms of service (use templates from Termly or comparable services).
- [ ] No admin panel, no analytics dashboard, no usage reports, no team management.

### Technical Must-Haves (Non-Negotiable)

- [ ] Data backups configured before launch.
- [ ] SSL enforced.
- [ ] Rate limiting on auth endpoints.
- [ ] Input validation (server-side, not just client-side).
- [ ] Secure storage of secrets (not in .env committed to git).
- [ ] Basic error logging (Sentry or equivalent).

## Case Study: Gumroad

Gumroad's MVP was almost laughably simple. A form where creators could upload a file, set a price, and get a buy link. No storefronts, no analytics, no subscriptions, no community.

**What it did:**
- Let creators sell digital products directly to their audience.
- Payment processing (hard) was the core value.
- Everything else came later.

**What it didn't have:**
- No storefront / landing page builder.
- No subscription billing.
- No affiliate system.
- No analytics beyond basic sales numbers.

**Why it worked:** The core value (sell a file, get paid, deliver to buyer) was fully functional. Creators could use it immediately. The missing features didn't block the transaction.

**Key takeaway:** If the core transaction works, people will use it. Add the polish later.

## Case Study: Dropbox

Dropbox's "MVP" was a video. Drew Houston recorded himself using a prototype that barely worked, showing the file sync flow. The video went viral, and the waitlist grew from 5,000 to 75,000 overnight.

**Key takeaway:** Your MVP doesn't have to be working software. It has to demonstrate the core value convincingly enough to get commitment (signups, pre-orders, waitlist entries).

## Red Flags

| Mistake | Why It's Dangerous |
|---------|-------------------|
| Building for scale you don't have | Microservices, Kubernetes, multi-region deployment. You have 5 customers. Stop. |
| Perfectionism | Shipping a great v0 is better than never shipping a perfect v1. |
| Building features "they might need" | They will tell you what they need. Listen after they pay. |
| Custom domain, SSO, team billing, roles | V2 features. Ship them when customers ask (and offer to pay for them). |
| No deadline | You'll build forever. Set a ship date. Cancel features to hit it. |
| Rewriting instead of iterating | You don't need a better codebase. You need more customers. |
