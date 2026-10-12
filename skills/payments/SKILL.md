---
name: payments
description: Router for payments and billing work — Stripe integration, Checkout, subscriptions, webhooks, tax/VAT handling, invoices, refunds, and PCI-compliant payment flows. Use when the user mentions Stripe, payments, checkout, subscription, billing, invoice, webhook, payment intent, customer portal, metered billing, proration, tax or VAT calculation, or PCI compliance.
---

# Payments Router

`stripe-best-practices` (6KB skill + 6 reference docs) from the official `stripe/ai` repo.

---

## Read the matching reference, don't guess

| Task | Reference |
|---|---|
| Cards, PaymentIntents, payment methods, 3DS, disputes | `references/payments.md` |
| Checkout, Payment Links, Elements, wallets | `references/connect.md` |
| Subscriptions, trials, meters, proration, usage-based | `references/billing.md` |
| Tax and VAT calculation, registrations | `references/tax.md` |
| Webhooks, signature verification, retries, idempotency | `references/security.md` |
| Treasury, financial accounts, payouts | `references/treasury.md` |

The reference docs are loaded on demand — read the one that matches before writing integration
code. Do not write Stripe code from memory; the API surface moves and the docs are right there.

---

## Non-negotiables

**Webhook signatures are mandatory.** Every handler must verify
`Stripe-Signature` before trusting the payload. Unsigned webhooks are a live vulnerability.

**Idempotency keys on every write.** Retries are normal. Without an idempotency key, a retried
POST creates duplicate charges.

**Amounts in the smallest currency unit.** Integer minor units (cents), never floats.

**Never store card numbers.** Stripe handles PANs. Your integration stores tokens/IDs only.
This is the PCI boundary — do not cross it.

**Use the official Stripe MCP if available** for live API reference, rather than relying on
memory or docs alone.

**Test in test mode with test clocks.** Never verify billing logic against live keys.

---

## Order of work

1. Read the matching reference first — always
2. Model the product: one-time? subscription? metered? tiered?
3. Create the objects (Customer, Product, Price) — prefer the Dashboard or API for setup
4. Write the checkout/payment flow
5. Write webhook handlers **with signature verification and idempotency**
6. Test in test mode, using test clocks for subscription lifecycle
7. Only then go live

---

## Scope note

This covers Stripe specifically. Other processors (Adyen, Braintree, Paddle, Lemon Squeezy)
have different models — don't pattern-match Stripe's onto them without checking.
## AI Installation

**Run this before the first real task in this domain.** It checks dependencies and
installs whatever is missing. Safe to re-run — existing skills are never overwritten
without `--force`.

```bash
# 1. see what this router needs, and what you already have
node install.mjs payments --check

# 2. install what's missing
node install.mjs payments
```

Then **restart the agent** so the new skills register. Skills load at startup only.

This router needs **1 skills**: 1 auto-installable, 0 manual.

<details><summary>Auto-installable (1)</summary>

- `stripe-best-practices` — `github:stripe/ai`

</details>

**Environment** (never commit these):**

```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

> Never commit keys. Verify webhook signatures and use idempotency keys on every write.

---

**If your agent has no shell or no plugin support:** you cannot self-install.
Tell the user which of the skills above are missing and let them run
`node install.mjs payments` in a terminal. Do not claim a skill is available
when it is not, and do not silently proceed with a partial stack — say what is missing,
then continue with whatever is installed.
