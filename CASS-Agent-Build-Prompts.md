# CASS Marketplace — AI Agent Build Prompts

Feed these to your AI coding agent **in order**. Each section is self-contained but builds on the schema and design system established in Sections 1–2, so run those first. Guest users can browse and add to cart; an account is required only at checkout.

---

## SECTION 1 — Project Setup & Design System

```
Set up a new React 19 project for a wholesale marketplace called "CASS" (Chantal All Seasons Shoes), to be deployed on Cloudflare Pages with InsForge as the backend (Postgres + auth + storage).

Establish a global design system with these rules, enforced everywhere in the app:

1. STRICTLY SHARP EDGES — no border-radius anywhere, on any button, card, input, modal, image container, or badge. Set a global CSS reset: `border-radius: 0 !important` is not required if components are built correctly, but audit every component to confirm no rounded corners exist.

2. COLOR PALETTE — match CASS branding:
   - Primary accent: magenta/pink (#E6007E or similar)
   - Secondary accent: purple (#5B2A86 or similar)
   - Structure: black (#000000) and white (#FFFFFF)
   - Use pink/purple for CTAs, headers, and section dividers; black/white for body text and layout structure.

3. TYPOGRAPHY — bold, high-contrast, easy to scan quickly on a small screen. Bold serif or bold sans-serif for headings (matching the CASS logo's bold style), clean sans-serif for body text.

4. MOBILE-FIRST RESPONSIVE — design and build for phone screens first, then scale up to tablet/desktop. Touch targets minimum 44x44px.

5. NO INPUT ZOOM ON MOBILE — every text input, select, and textarea must have `font-size: 16px` minimum (iOS Safari auto-zooms on inputs below 16px). Apply this globally via a base input style, not per-component.

6. Set up the project structure with folders for: pages, components (shared), lib (InsForge client, Pesapal client), styles (design tokens/theme file), and utils.

Create a central `theme.js` or `theme.css` file with all color, spacing, and typography tokens defined once, so every subsequent page pulls from this single source of truth.
```

---

## SECTION 2 — Database Schema (InsForge)

```
Set up the following tables in InsForge for the CASS marketplace:

**categories**
- id (uuid, pk)
- name (text)
- parent_id (uuid, nullable, fk -> categories.id)
- created_at

**products**
- id (uuid, pk)
- name (text)
- sku (text, unique)
- description (text)
- unit_price (numeric)
- unit_label (text, e.g. "pair", "carton", "kg")
- category_id (uuid, fk -> categories.id)
- image_urls (text[])
- stock_qty (integer)
- is_active (boolean, default true)
- created_at, updated_at

**price_tiers** (empty for now, reserved for future bulk pricing)
- id (uuid, pk)
- product_id (uuid, fk -> products.id)
- min_qty (integer)
- price_per_unit (numeric)

**buyers**
- id (uuid, pk, linked to InsForge auth user)
- business_name (text)
- contact_name (text)
- phone (text)
- email (text)
- address (text)
- created_at

**orders**
- id (uuid, pk)
- buyer_id (uuid, fk -> buyers.id)
- status (enum: quote_requested, quoted, invoiced, paid, fulfilled, cancelled)
- subtotal (numeric)
- delivery_fee (numeric, default 0)
- total (numeric)
- pesapal_merchant_ref (text, nullable)
- pesapal_tracking_id (text, nullable)
- payment_status (text, default 'unpaid')
- created_at, updated_at

**order_items**
- id (uuid, pk)
- order_id (uuid, fk -> orders.id)
- product_id (uuid, fk -> products.id)
- qty (integer)
- unit_price_at_order (numeric)
- line_total (numeric)

**order_status_history**
- id (uuid, pk)
- order_id (uuid, fk -> orders.id)
- status (text)
- changed_by (text)
- changed_at (timestamp)

**cart_items** (for guest + logged-in cart persistence)
- id (uuid, pk)
- session_id (text, for guest carts before login)
- buyer_id (uuid, nullable, fk -> buyers.id)
- product_id (uuid, fk -> products.id)
- qty (integer)
- created_at

Set up Row Level Security so buyers can only see their own orders/quotes, and admin role can see everything. Create an admin flag on the auth user or a separate `admins` table.
```

---

## SECTION 3 — Shared Components (Header, Footer, Nav, Cart Drawer)

```
Build the shared components used across every page:

1. **Header** — CASS logo, hotline number, hamburger menu on mobile, cart icon with item count badge, "Sign In / Account" link. Sharp-edged, pink/purple accent bar, sticky on scroll.

2. **Mobile Nav Drawer** — slides in from the side (no rounded corners), lists categories, links to account/orders, closes on outside tap.

3. **Footer** — CASS contact info (order lines, call lines), bank/payment note, business hours if applicable, copyright.

4. **Cart Drawer/Sidebar** — slides in when "Add to Cart" is tapped, shows line items with qty steppers, subtotal, "View Cart" and "Request Quote" buttons. Available to guests (unauthenticated) — cart persists via session_id in cart_items table, then merges into buyer_id on login.

5. **Product Card** — image, name, unit price, unit label, "Add to Cart" button. Sharp edges, consistent grid sizing across breakpoints.

6. **Toast/Notification component** — for "Added to cart", "Quote requested", errors, etc. Sharp-edged, matches theme.

Ensure every component pulls from the theme.js/theme.css tokens from Section 1 — no hardcoded colors or spacing.
```

---

## SECTION 4 — Public Page: Home / Catalog

```
Build the Home page, which doubles as the main catalog browse page.

Layout:
- Hero/banner section with CASS branding (pink/purple, sharp-edged banner block)
- Category filter bar (horizontally scrollable on mobile, sidebar on desktop)
- Product grid: responsive — 2 columns on mobile, 3-4 on tablet/desktop, using the Product Card component
- Search bar at top of catalog, filters products by name in real time
- "Load more" or pagination for large catalogs
- Fully accessible to guests — no login required to browse or view prices

Fetch products and categories from InsForge. Support filtering by category and search query via URL params so links are shareable.
```

---

## SECTION 5 — Public Page: Product Detail

```
Build the Product Detail page (route: /products/:id).

Layout:
- Image gallery (main image + thumbnails), sharp-edged image containers
- Product name, unit price, unit label, stock status (in stock / low stock / out of stock)
- Quantity selector (respects available stock)
- "Add to Cart" button — works for guests, stores in cart_items with session_id
- Description section
- Related products from the same category, shown as a horizontal scroll on mobile

No login required to view or add to cart from this page.
```

---

## SECTION 6 — Public Page: Cart

```
Build the full Cart page (route: /cart), separate from the cart drawer — this is the dedicated review page before checkout.

Layout:
- List of all cart items with product image, name, unit price, qty stepper, line total, remove button
- Subtotal calculation
- "Continue Shopping" link back to catalog
- "Request Quote" button

Behavior:
- Accessible to guests — cart is fully functional without an account
- When "Request Quote" is tapped:
  - IF the user is not logged in, redirect to /account/signup (or show an inline auth modal) with the cart preserved
  - IF the user is logged in, proceed directly to creating the quote request (Section 7)

This is the ONLY point in the flow that requires an account. Make this boundary clear in the UI with a message like "Sign in or create an account to complete your order" rather than blocking cart/browse access.
```

---

## SECTION 7 — Auth: Sign Up / Login

```
Build Sign Up and Login pages/flows using InsForge auth (route: /account/signup, /account/login).

Sign Up fields: business_name, contact_name, phone, email, password, address (optional at signup, can be completed later).

Behavior:
- Open signup, no approval gating
- On successful signup/login, merge any guest cart_items (matched by session_id) into the new buyer_id
- After auth completes, redirect the user back to wherever they came from (e.g. straight back to /cart to continue requesting a quote) rather than to a generic dashboard
- Sharp-edged form inputs, 16px minimum font-size on all fields per the global input rule
- Show clear validation errors inline, not via browser alerts
```

---

## SECTION 8 — Buyer Dashboard: Quotes, Invoices, Orders

```
Build the authenticated Buyer Dashboard (route: /account/orders).

Sections/tabs:
1. **Quotes** — list of quote_requested and quoted orders, showing items, requested date, status
2. **Invoices** — orders in "invoiced" status, showing total due and a "Pay Now" button that launches Pesapal checkout
3. **Order History** — paid and fulfilled orders, with order details and status timeline (pulled from order_status_history)

Each order detail view shows: line items, quantities, prices, subtotal, delivery fee (if any), total, and current status badge.

Also build a simple **Account Settings** page (route: /account/settings) to edit business_name, contact_name, phone, address.
```

---

## SECTION 9 — Quote Submission Logic

```
Implement the quote request flow triggered from the Cart page (Section 6) once the buyer is authenticated:

1. Create a new row in `orders` with status = 'quote_requested', buyer_id = current user, and populate order_items from the cart
2. Snapshot unit_price_at_order from the current product price at time of request
3. Clear the cart_items for that buyer/session
4. Insert a row into order_status_history
5. Redirect buyer to their new quote in the dashboard (Section 8) with a confirmation message
6. (If notifications are set up) trigger a notification to the admin that a new quote request has come in
```

---

## SECTION 10 — Admin Dashboard: Product Management

```
Build the Admin Product Management page (route: /admin/products), restricted to users with admin role.

Features:
- Table/list view of all products with search and category filter
- Add/Edit product form: name, sku, description, unit_price, unit_label, category, images (upload to InsForge storage), stock_qty, is_active toggle
- Bulk stock adjustment
- Delete/deactivate product

Sharp-edged, dense table layout on desktop; card-based list on mobile for admin usability on the go.
```

---

## SECTION 11 — Admin Dashboard: Quote Review & Invoicing

```
Build the Admin Quote Review page (route: /admin/quotes), restricted to admin role.

Features:
- List of orders with status = 'quote_requested', sorted oldest first
- Click into a quote to see buyer details and line items
- Admin can edit quantities and unit prices per line item before finalizing
- "Send Invoice" button: recalculates subtotal/total, sets status = 'invoiced', logs to order_status_history, and (if notifications are set up) notifies the buyer

Also build a general **Order Management** view (route: /admin/orders) listing all orders across all statuses, filterable by status, with the ability to manually update status (e.g. mark as fulfilled) and add a delivery_fee before invoicing.
```

---

## SECTION 12 — Pesapal Payment Integration

```
Integrate Pesapal for the "Pay Now" action on invoiced orders (triggered from Section 8).

Flow:
1. Buyer taps "Pay Now" on an invoiced order
2. Backend generates a Pesapal merchant reference tied to the order.id and stores it in orders.pesapal_merchant_ref BEFORE redirecting to Pesapal (do not rely on sessionStorage alone — persist it in the database to avoid the merchantRef loss issue)
3. Redirect buyer to Pesapal's hosted checkout
4. On Pesapal callback/webhook, verify the transaction, update orders.payment_status and orders.pesapal_tracking_id, and transition order status to 'paid'
5. Use a database trigger or server-side function (not a client-side call) to update status, and ensure the update isn't blocked by any existing status-change triggers — use session variables where needed to bypass blocking triggers, as needed for InsForge's Postgres setup
6. Log every callback attempt (even failures) to a payments log table for reconciliation
7. Show buyer a clear success/failure confirmation page after returning from Pesapal (route: /account/orders/:id/payment-result)

Build the Admin Payment Reconciliation view (route: /admin/payments) showing all Pesapal transactions, their matched order, and status, with a manual "mark as paid" override for edge cases (e.g. bank deposit fallback).
```

---

## SECTION 13 — Deployment

```
Configure the project for deployment to Cloudflare Pages:

1. Set up build configuration (framework preset, build command, output directory) for the React app
2. Configure environment variables for InsForge project keys and Pesapal API credentials as Cloudflare Pages environment variables (never hardcoded in the repo)
3. Set up a Cloudflare Pages Function or Worker if a server-side endpoint is needed for the Pesapal webhook callback (since this must be a secure server-to-server call, not client-side)
4. Verify the production build has no console errors, confirm mobile responsiveness across common breakpoints (360px, 390px, 768px, 1024px+), and confirm no input triggers zoom on tap on an actual mobile device or emulator
5. Set up a custom domain if available, otherwise deploy to the default *.pages.dev URL
```

---

## Notes for running this with your AI agent

- Run sections in order — later sections assume earlier schema/components exist
- After each section, review the output before moving to the next, especially Section 2 (schema) and Section 12 (payments), since mistakes there are the most costly to unwind
- Re-paste the design rules from Section 1 if you notice the agent drifting from sharp-edged/theme consistency in later sections
