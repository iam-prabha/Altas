# 10. Scale

## The Principle

Scaling is not about hiring more people. It's about building systems that let you grow revenue without proportionally growing costs. A SaaS that needs a new hire for every $10k in new revenue is not a SaaS — it's a services company.

When to scale: when you have product-market fit (people stay, pay, and tell others). Before that, scale kills you by multiplying burn rate before you have revenue to match.

## The Checklist

### Know When You Have Product-Market Fit

- [ ] Strong signal: >80% of churn is involuntary (failed payments, not deliberate cancels).
- [ ] Strong signal: customers are referring others without being asked.
- [ ] Strong signal: usage grows organically (existing users invite new users).
- [ ] Strong signal: you can pause paid acquisition and MRR stays flat or grows.
- [ ] Superpower: a customer tells you "I'd pay double for this."

**If you don't have PMF, don't scale. Keep iterating. Scaling before PMF is the #1 startup killer.**

### When to Hire

- [ ] **Hire after the pain, not before.** Don't hire "in case" you get busy.
- [ ] **First hire:** Customer support / operations — free your time for product and sales.
- [ ] **Second hire:** Engineering — only if you're bottlenecked by your own dev speed.
- [ ] **Third hire:** Sales / marketing — only if you have consistent inbound demand.
- [ ] Hire for the *next* stage, not the *current* one. A $5k MRR business doesn't need a VP of Sales.
- [ ] Use contractors and freelancers before full-time employees. Test the role before committing.
- [ ] Remote-first from day 1. The talent pool is global.

### Automate Ruthlessly

- [ ] **Billing:** Dunning, invoicing, receipts — all automated (Stripe / Paddle).
- [ ] **Email:** Onboarding sequences, re-engagement, win-back — automated sequences.
- [ ] **Reporting:** MRR, churn, LTV, CAC — automated dashboard, not manual spreadsheets.
- [ ] **Deployment:** CI/CD with auto-tests. Ship multiple times per day.
- [ ] **Monitoring:** Alerts for downtime, error spikes, churn rate changes.
- [ ] **Onboarding:** Automated email sequence + in-app guides + self-serve knowledge base.
- [ ] **Support:** Canned responses, knowledge base, chatbot for common questions.

### Pricing Changes for Scale

- [ ] Introduce annual plans (improves cash flow, reduces churn).
- [ ] Introduce usage-based pricing elements (expands revenue with customer success).
- [ ] Raise prices for new customers. Grandfather existing ones.
- [ ] Introduce enterprise tier ($500+/month) with custom contracts, SLA, dedicated support.
- [ ] Consider implementation fees for high-touch onboarding.

### When to Raise Prices

- [ ] Churn is below 5% monthly — customers are sticky.
- [ ] You're turning away customers (demand > capacity).
- [ ] You've added significant value since launch.
- [ ] Competitors charge more for less.
- [ ] Your costs have gone up (infra, team, support).

### When to Kill Features

- [ ] Less than 5% of active users use it.
- [ ] It generates zero support tickets (nobody cares) or more than 20% of all support tickets (broken).
- [ ] It's not directly related to the core value proposition.
- [ ] It would take significant work to maintain for v2.
- [ ] Deprecate gracefully: announce 3 months in advance, offer migration paths.

### Internationalization

- [ ] **When:** When 20%+ of your traffic comes from non-English-speaking countries.
- [ ] **How:** Start with currency/locale formatting. Then translate landing page. Then in-app text.
- [ ] **Tools:** Crowdin, Tolgee, or in-house with i18n framework.
- [ ] **Payment:** Consider Stripe (global) + local payment methods (iDEAL, SEPA, Alipay).
- [ ] **Don't** launch in a country until you can support customers in their timezone and language.

## Case Study: Canva

Canva is a masterclass in feature killing and focus. In the early days, they famously said no to:
- Desktop apps (web-only for years).
- Enterprise features (SSO, admin panel, compliance).
- Video editing (added years later).
- Print-on-demand integration.
- Native mobile apps for design editing (view-only for a long time).

**Why this worked:**
- Every "no" meant more focus on the core loop: templates → drag-drop → export.
- They dominated the "design for non-designers" wedge before expanding upmarket.
- By the time they added video, enterprise, and print, they had 50M+ users and the resources to build well.

**Key takeaway:** Your biggest scaling advantage is saying no to 90% of opportunities. A focused company scales. A scattered one fragments.

## Case Study: Zapier

Zapier scaled to $50M+ ARR with a mostly remote, mostly support-heavy team. Their growth engine wasn't ads — it was integrations.

**The insight:** Every integration Zapier added made the product more valuable for existing users and attracted new users from that ecosystem. WordPress plugin? New WordPress users. Salesforce integration? New Salesforce power users.

**The scaling playbook:**
- Each integration was a growth channel.
- Users created Zaps (automations), which became sticky switching costs.
- Content marketing targeted "How to connect X and Y" — infinite SEO playbook.

**Key takeaway:** Your scale engine should be something that compounds. For Zapier, it was integrations. For Calendly, it was calendar connections. Find your compound growth lever.

## Red Flags

| Mistake | Why It's Dangerous |
|---------|-------------------|
| Scaling before PMF | You'll burn cash and energy on a product nobody loves. |
| Hiring too fast | Each hire adds complexity, management overhead, and culture dilution. |
| Building for "enterprise" too early | Enterprise sales cycles are 6-18 months. You'll run out of money. |
| Not raising prices | Inflation, team costs, and infrastructure costs go up. Your prices should too. |
| Ignoring international | If your product is digital, it's global. Currency conversion + localization = new markets. |
| Feature creep | Every new feature is maintenance debt. Kill more features than you add. |
