# Digital India homepage and Google reviews

## Digital India copy
The homepage Digital India section was adapted from `AK-Online-Services-Digital-India-Section-Detailed(1).docx` (user-supplied). It contains the explanatory text, overview of CSCs, the local assistance role, six beneficiary groups, types of presently listed services, key benefits, a promise and an authority/eligibility disclaimer. It deliberately does **not** claim official CSC/VLE registration or authorised biometric/financial services. Verify CSC ID and specific service authorisations first if those claims are required.

## Review carousel
The homepage now contains a Google Reviews section with a link to the Google Maps URL already used throughout this site. A responsive scrolling review carousel is in `assets/google-reviews.js` and is activated automatically **only when properly sourced feedback is supplied**. Until then, it shows a transparent no-review fallback with a link to Google Maps; no reviews, ratings, names or review totals are fabricated.

The local JSON file `assets/google-reviews.json` intentionally contains `reviews: []`. It exists to support **review content the business has permission to publish**. Only add reviews with valid author attribution, a truthful 1–5 rating, full context, and a real source link. Example shape (example is *not* a review; do not publish it):

```json
{
  "sourceUrl": "https://share.google/Pz7HvHBhs9ErKviqQ",
  "reviews": [{
    "author": "<actual credited reviewer>",
    "text": "<authorised and accurate review excerpt>",
    "rating": 5,
    "date": "<actual public date>",
    "reviewUrl": "<real Google Maps review permalink>"
  }]
}
```

**IMPORTANT:** Do not scrape Google reviews or store Google Places API response content in this static JSON file. If using the official Google Places API, implement an authorised on-demand integration and follow Google's attribution, reuse/caching, and terms/privacy requirements. Do not paste placeholder reviews into the live website. The public webpage must not display a Google star rating unless verified by an authoritative source.

The animation stops on hover/focus, is disabled for users who prefer reduced motion, and provides genuine source links in every displayed review. The site is static GitHub Pages; no Google Business Profile connection or API key was available in this change.

## Final acceptance
- Verify registered CSC/VLE status before describing A K Online Services as government-authorised.
- Confirm every offered regulated service is within the company's current authority.
- If a scrolling review feed is required immediately, supply authentic, permission-cleared reviews and their Google source URLs or connect a compliant provider.
- Test English/Gujarati switch, mobile layout, outbound links and review ticker after publishing.
