# UX Copy — Nordhaven

> Authoritative copy spec for all 15 page sections. Owner: Claude (UI/UX). Codex reads this; does not edit it.
> Tone: confident · warm · editorial · premium · sentence case · no jargon · no superlatives.
> All copy is **original** — not derived from the `design.webp` reference.

---

## Navigation

**Brand wordmark:** Nordhaven

**Primary nav links (sentence case, dot-separated in design):**
- Buy
- Sell
- Rent
- Agents
- News

**CTA button (top right):** Contact us

**Mobile menu close label (screen reader):** Close navigation menu

---

## 1. Hero section

**Display headline (2 lines, display-1):**
> Find the home  
> you've been imagining.

**Supporting paragraph (top-right column on desktop, ~25 words):**
> More than a property search — Nordhaven connects you with the homes, neighbourhoods, and people that make the move worth making.

**Hero image alt text:**
> A contemporary luxury home with floor-to-ceiling windows, surrounded by mature trees at dusk.

*(Use a high-quality original photo or licensed image. Do not use the reference image.)*

---

## 2. AI-style search bar

**Mode toggle labels:** Buy · Sell · Rent

**Search input placeholder (rotates or stays fixed — pick one per mode):**
- Buy: `e.g. 3-bedroom near a good school in Austin, TX`
- Sell: `e.g. What's my home on Maple Street worth?`
- Rent: `e.g. Pet-friendly apartment with parking under $2,500`

**Leading icon aria-label:** Add search criteria
**Mic button aria-label:** Search by voice
**Waveform button aria-label:** Audio input active
**Submit button aria-label:** Run search

**"Save search" label (listing panel):** Save search
**Result count format:** `{n} homes for sale` / `{n} homes for rent`

---

## 3. Suggested search chips

Eight conversational chips. Sentence case. Natural questions a buyer/renter actually asks.

1. Will a king bed fit in the primary?
2. 3-bedroom near a Starbucks
3. What makes this house unique?
4. Does this property have a backyard?
5. Good schools within walking distance?
6. Open plan kitchen and living?
7. Home office or bonus room?
8. Recently renovated?

*(Chips are inline-scrollable on mobile. Each chip aria-label = chip text + " — tap to search".)*

---

## 4. Property category filters

**Section eyebrow:** Explore our homes

**Filter chip labels:**
- New to market
- Most viewed
- Open houses
- Price drop
- Luxury
- Sold

*(aria-pressed toggles; default: all off / show all.)*

---

## 5. Featured homes

**Section heading:** Explore our homes

**Section subhead (optional, below heading):**
> Hand-picked listings across every price point, from starter homes to statement properties.

**Property card — CTA link:** View details
**Property card — beds label:** Beds · Baths · sq ft  *(icons + numbers; screen reader: "{n} bedrooms, {n} bathrooms, {n} square feet")*

**"No results" empty state:**
> No homes match your filters right now. Try removing a filter or broadening your search area.

**Loading skeleton aria-label:** Loading property listings…

---

## 6. Homes for you

**Section heading:** Homes for you

**Section subhead:**
> Based on where people like you are searching — updated daily.

*(Same PropertyCard component as Featured homes. No new copy needed beyond section heading/sub.)*

---

## 7. Property listing + map split

**Panel heading format:** `{n} Homes for sale`
**Save search button:** Save search *(aria-label: "Save this search")*
**Map toggle (mobile, < lg):** Show map / Show list
**Map aria-label:** Map of property listings. Use the list below for an accessible alternative.
**Map pin aria-label:** `{price} — {address}. Tap to view details.`
**List item link:** View details *(aria-label: "View details for {address}")*

---

## 8. Smarter way to sell

**Section heading:**
> The smarter way to  
> sell your home.

**Body copy (~40 words):**
> We combine sharp market insight, expert staging advice, and a network of serious buyers to get you the best result — faster and with less stress than the traditional route.

**Bullet points (3–4):**
- Suggested listing price within 48 hours
- Professional photography included
- Access to pre-qualified buyers
- Dedicated agent from listing to close

**CTA link:** Learn more *(aria-label: "Learn more about selling with Nordhaven")*

**Feature image alt:**
> A beautifully staged open-plan living room with natural light streaming through large windows.

---

## 9. Neighbourhood discovery

**Section heading:** Explore your next neighbourhood

**Section subhead:**
> Find the area that fits your life — schools, commute, cafés, and everything in between.

**Trio card labels + subtext:**

| Card | Heading | Sub |
|---|---|---|
| Search neighbourhoods | Search neighbourhoods | Explore lifestyle, schools, and walkability scores. |
| New homes | New builds near you | Discover newly completed developments before they sell out. |
| Agent directory | Meet your agent | Browse our network of local specialists by area. |

**Card CTA (each):** Explore *(aria-label: "Explore {card heading}")*

---

## 10. Agent section

**Section heading:** Meet our expert agents

**Section subhead:**
> Local knowledge, honest advice, and a track record you can trust.

**Agent card — rating label (screen reader):** `{n} out of 5 stars — {m} reviews`
**Agent card — CTA:** Contact *(aria-label: "Contact {agent name}")*

**Empty state (no agents loaded):**
> Agent profiles are loading. If they don't appear, please refresh the page.

---

## 11. Real estate news

**Section heading:** Real estate news

**Section subhead:**
> Stay up to date with the latest developments, market shifts, and practical guides.

**NewsCard — read more link:** Read article *(aria-label: "Read: {article title}")*
**Date format:** `<time datetime="YYYY-MM-DD">Month D, YYYY</time>`  e.g. `June 12, 2025`

**Empty state:**
> No articles available right now. Check back soon.

---

## 12. Trends, tips & inspiration

**Section heading:** Discover trends, tips, and property inspiration

**Section subhead:**
> Expert real estate advice, market trends, and inspiring ideas to help you buy, sell, and navigate today's housing market.

**"See all" CTA:** See all learning *(aria-label: "See all learning resources")*

**Article card CTA:** Read more *(aria-label: "Read more: {article title}")*

---

## 13. CTA section

**Heading:**
> Ready to find your next home?

**Subhead (optional, 1 line):**
> Search thousands of listings with a single, natural-language search.

**Primary button:** Start your search *(aria-label: "Start searching for a home")*

*(Background: `--ink` dark. Text: `--on-ink` white. One action only.)*

---

## 14. Footer

**Brand tagline (footer):** Find your place.

**Column headings + links:**

| Company | Buy | Sell | Resources | Legal |
|---|---|---|---|---|
| About Nordhaven | Search homes | Get a valuation | Real estate news | Privacy policy |
| Our agents | New to market | How we sell | Trends & tips | Terms of use |
| Careers | Open houses | Seller guides | Neighbourhood guides | Cookie policy |
| Contact us | Luxury homes | — | Mortgage calculator | Accessibility |

**Newsletter label:** Stay in the loop
**Newsletter input placeholder:** Your email address
**Newsletter button:** Subscribe *(aria-label: "Subscribe to the Nordhaven newsletter")*
**Newsletter success:** You're subscribed. We'll send the good stuff only.
**Newsletter error:** Please enter a valid email address.

**Social links (aria-labels):** Nordhaven on Instagram · Nordhaven on LinkedIn · Nordhaven on Facebook

**External link attributes:** All social/external links: `rel="noopener noreferrer" target="_blank"`

**Legal line:**
> © {year} Nordhaven. All rights reserved.

---

## 15. Global / system copy

**404 page:**
> Heading: Page not found.
> Body: The page you're looking for has moved or doesn't exist. Head back home and search from there.
> CTA: Back to home

**Error boundary:**
> Heading: Something went wrong.
> Body: We hit an unexpected error. Refresh the page or try again in a moment.
> CTA: Refresh

**Form error messages (generic):**
- Required field: `This field is required.`
- Email invalid: `Please enter a valid email address.`
- Too short: `Please enter at least {n} characters.`
- Too long: `Please keep this under {n} characters.`
- Submission failed: `We couldn't send your message. Please try again.`
- Submission success: `Thanks — we'll be in touch shortly.`

---

## Copy tone reference

| Do | Don't |
|---|---|
| Confident, direct | Salesy, pushy |
| Warm, human | Cold, corporate |
| Specific and honest | Vague superlatives ("best", "amazing") |
| Sentence case everywhere | Title Case On Every Word |
| Short, punchy CTAs | Passive labels ("Click here", "Submit") |
| Concrete benefits | Abstract marketing speak |

---

*Handoff note: C-007 complete. Codex may now read this file to populate `data/copy.ts` or inline copy. Any changes to copy require Claude approval — do not edit this file unilaterally.*
