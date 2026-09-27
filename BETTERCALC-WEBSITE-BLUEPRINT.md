# BetterCalc Marketing Website Blueprint

**Phase:** 2 — experience and interaction planning  
**Status:** design blueprint only; no website implementation is included  
**Primary reference:** `HERON-WEBSITE-AUDIT.md`  
**Product evidence reviewed:** current BetterCalc UI, demo scripts, demo PDFs, screenshots, videos, reports, quantity logic, and design tokens  
**Direction:** Interactive Story — one plan, progressively made useful

---

## Purpose and non-negotiable product truths

This document turns the transferable lessons from the Heron audit into an original BetterCalc website system. It does not repeat the audit and does not copy Heron's specific creative devices. The central object here is not a building being inspected for violations; it is a contractor's PDF plan becoming measurable, comparable, and ready for work.

The blueprint is grounded in the current demo assets and product behavior:

- BetterCalc runs in the browser and works directly with PDF plans.
- Quantity Takeoff calibrates a plan, marks rooms, calculates quantities, and exports PDF and Excel.
- Revision Compare aligns two plans, supports overlay and swipe inspection, lets the user mark demolition and new construction, and exports a PDF comparison report.
- The current comparison workflow does **not** automatically detect changes. The website must show visual comparison followed by user-authored change marking, never claim automatic detection.
- The current Apartment A QTO demo reports `98.91 מ״ר` total regular tiling across three marked rooms.
- The current Changes table reports one demolition item at `0.75 מ״ר` and one new-construction item at `0.75 מ״ר`.
- Revision Compare currently exports PDF only. Excel belongs to the QTO workflow.
- The product is local-first and browser-based; the marketing site may describe work happening in the browser, but should not make broader privacy or security claims without separately approved copy.

The website's governing rule is simple: **the plan remains the main canvas, and every piece of copy, motion, data, and UI must explain what BetterCalc lets someone do with it.**

---

# 1. Core creative concept

## Concept name: “The plan becomes workable” / “התוכנית הופכת לעבודה”

The website follows one real plan through two practical transformations:

1. a PDF becomes calibrated spaces and quantities;
2. a revised PDF becomes a clear, documented set of changes.

The experience begins with the plan as a familiar but passive document. BetterCalc does not replace it with a dashboard metaphor. Instead, the product adds useful layers to the same drawing: scale, boundaries, quantities, a second revision, comparison, demolition, construction, and reports.

This creates a visual equation that can organize the entire site:

`PDF plan → calibrated plan → measured rooms → quantities → revised plan → understood changes → work report`

### What makes the idea BetterCalc-specific

- The hero interaction is a measurement probe, not a violation finder.
- The signature scroll sequence starts with the product's actual `5.00 m` reference line.
- Blue means selected, measured, or active—not error.
- Demolition and new construction have their own semantic colors and are never confused with the brand accent.
- The comparison proof is an actual moved partition from Apartment A Revision B.
- The climax is not “AI intelligence.” It is clarity: knowing what exists, how much is needed, and what changed.
- Product UI is treated as a working annotation layer around the plan, consistent with the existing product principle: “a drafting table, not a dashboard.”

### Creative restraint

The site should feel exact, calm, and useful. It should not use a theatrical loader, animated coordinates, diagnostic red, architectural stock photography, or Heron's drag-to-reveal mechanic. The premium quality comes from real plan evidence, precise pacing, and disciplined typesetting—not from maximum motion.

---

# 2. Narrative arc

The page tells one continuous story in seven acts.

## Act 1 — A plan is only the beginning

The visitor meets Apartment A as a large, clean plan. A restrained pointer probe snaps to real geometry and previews a distance or room boundary. The message is immediate: BetterCalc works directly on a PDF.

**Understanding:** “I can start from the document I already have.”

## Act 2 — Give the drawing a scale

The same plan persists. The real `5.00 m` reference is identified and calibrated. The drawing changes from image-like material into measurable space.

**Understanding:** “Once the scale is known, the plan can produce real quantities.”

## Act 3 — Turn rooms into quantities

Three room boundaries appear in deliberate order. Their values resolve into a compact quantity strip, then into a partial table. The result is `98.91 מ״ר`, followed by genuine PDF and Excel export proof.

**Understanding:** “The measurement work becomes an organized quantity report.”

## Act 4 — Introduce uncertainty

After the QTO result, the page becomes visually quiet. The question appears: what happens when the plan changes? Revision B enters using the same coordinate system and aligns over the original.

**Understanding:** “A second file should not mean starting over or comparing by eye.”

## Act 5 — See the difference

Original and revised plans move from single-layer dominance to 50/50 overlay, then to a user-controlled swipe. The moved wall becomes unmistakable without pretending that the system has automatically detected it.

**Understanding:** “I can align and inspect two revisions in the same place.”

## Act 6 — Translate difference into work

The user-marked old wall becomes demolition; the revised wall becomes new construction. A Changes table records `0.75 מ״ר` for each. The comparison report PDF connects drawing evidence to a deliverable.

**Understanding:** “Seeing a difference is useful; recording what must be done is the outcome.”

## Act 7 — Bring both workflows back together

A calm summary shows two linear workflows around the same plan. Five audience roles are explained through the work each needs to complete. The final plan contains the accumulated BetterCalc layers and leads to the CTA.

**Understanding:** “BetterCalc helps me get more operational value from a plan I already use.”

---

# 3. Full page structure

The recommended page is a single Hebrew, RTL landing page with approximately 12–15 normal viewport lengths on desktop. The two signature sticky sequences account for most of that distance; utility and conversion sections remain short.

| # | Chapter | Scroll mode | Main canvas | Primary message | Proof |
|---:|---|---|---|---|---|
| 0 | Header | fixed, compact | none | BetterCalc + navigation | direct CTA |
| 1 | Hero | one viewport, lightly interactive | Original Apartment A | “מתוכנית PDF / לכמויות.” | pointer probe on real geometry |
| 2 | Narrative pause | normal, 70–90vh | faded plan trace | “יש לכם תוכנית. / עכשיו צריך להוציא ממנה כמויות.” | pacing and premise |
| 3 | QTO story | sticky, ~430–500vh | same Original plan | calibrate → mark → quantify → export | 5.00m, three rooms, 98.91, PDF/Excel |
| 4 | Revision question | normal, 85–100vh | original plan at rest | “ומה קורה / כשהתוכנית משתנה?” | introduces Revision B |
| 5 | Overlay story | sticky, ~220–280vh | Original + Revision B | “שתי תוכניות. / אחת על השנייה.” | aligned layers and moved wall |
| 6 | Swipe proof | sticky handoff + user control | same aligned plans | “רואים מיד מה השתנה.” | draggable comparison divider |
| 7 | Work meaning | sticky or stepped, ~220–280vh | moved-wall crop | “לא רק לראות מה השתנה. / להבין מה צריך לבצע.” | demolition/new construction + Changes table |
| 8 | Report | normal, 100–130vh | comparison report pages | “מהשינוי בתוכנית / לדוח שאפשר לעבוד איתו.” | real PDF export |
| 9 | Comprehension checkpoint | normal, 100vh | split linear diagram | “שני כלים. / סביב אותה תוכנית.” | two workflows |
| 10 | Audience | normal, 120–160vh | persistent plan + role lens | relevance by job | five role-specific outcomes |
| 11 | Final plan / CTA | 100–120vh | accumulated plan layers | “יש לכם תוכנית? / תנו ל‑BetterCalc לעשות ממנה יותר.” | “פתחו את BetterCalc” |
| 12 | Footer | normal, compact | title-block grid | product and utility links | calm close |

### Header behavior

- 52–60px high on desktop; 48–54px on mobile.
- Logo/product name on the inline-start side for RTL reading; primary CTA on the opposite side.
- Links: `כמויות`, `השוואת גרסאות`, `למי זה מתאים`, `שאלות נפוצות` if those destinations exist at launch.
- Transparent or warm-surface background at top; gains an opaque surface and bottom rule after the hero.
- It may hide on downward scroll during pinned visual chapters and return on upward scroll. It must remain keyboard reachable.
- No elaborate preloader. If critical vector layers are not ready, show the static hero immediately and enhance once loaded.

---

# 4. Desktop storyboard

## Scene 01 — Opening sheet

The viewport is a technical field, not a split SaaS hero. Apartment A occupies roughly 62–70% of the visual area, large enough for walls, furniture, and the `5.00 m` reference to read. Copy occupies a disciplined edge column and overlaps no important plan geometry.

The headline is two lines:

> מתוכנית PDF  
> לכמויות.

Subcopy:

> חישוב כמויות והשוואת גרסאות ישירות מתוכניות PDF — בלי CAD.

Primary CTA: `נסו את BetterCalc`

The pointer becomes a fine crosshair only over the plan. On hover, it can snap to a wall corner, trace a room boundary, or show a short distance badge. It does not open warnings, diagnostics, or fake autonomous findings. A small instruction such as `העבירו על התוכנית` appears once, then recedes after interaction.

## Scene 02 — The pause

The plan reduces to a pale ghost layer. The entire center field holds only:

> יש לכם תוכנית.  
> עכשיו צריך להוציא ממנה כמויות.

The first line is charcoal; the second enters in BetterCalc blue. This is a comprehension reset before the denser QTO sequence.

## Scene 03 — Calibration

The original plan returns at the same scale and position as the hero. The page scroll locks it into a sticky canvas. Everything except the existing reference line softens slightly. Two points resolve at the ends of the line, and `5.00 מ׳` becomes the most legible annotation in the field.

A compact side note reads:

> 01 / כיול  
> מסמנים מרחק ידוע פעם אחת.

The line changes from neutral gray to blue from one endpoint to the other. A small status label resolves to `מכויל · 5.00 מ׳ ייחוס`.

## Scene 04 — Room sequence

The plan stays fixed. Three rooms are marked in spatial order rather than all at once. Each boundary draws or fills once, then becomes quieter before the next begins. Values are those visible in the current product demo:

- `חדר הורים · 25.48 מ״ר`
- `חדר שינה · 26.21 מ״ר`
- `סלון · 47.22 מ״ר`

The room names are tied to the app's current demo labels. The marketing artwork must prevent confusion with area numbers printed inside the source PDF; see the asset requirements below.

## Scene 05 — Quantities become a report

The three plan overlays stay visible but reduce to approximately 30–40% fill opacity. From the lower edge, a table strip rises as part of the same drawing surface—no laptop frame, browser chrome, or floating rounded card. It contains the three room rows and a total:

> סה״כ ריצוף רגיל · 98.91 מ״ר

The strip may first show `חדר`, `כמות נטו`, and `להזמנה`; then expand by one measured row to hint at the full product table. Because the current demo uses `0%` waste, `כמות נטו` and `להזמנה` are the same. The site should not invent a waste factor for visual interest.

Two export tabs or sheet edges appear: `PDF` and `Excel`. A short, silent transition reveals real report content at readable scale.

## Scene 06 — Revision interruption

The quantity table settles and slides out along a grid rule. The plan remains. Copy takes over a large empty zone:

> ומה קורה  
> כשהתוכנית משתנה?

Revision B enters as a thin secondary outline, not as a brand-new section image. Registration marks or two alignment points briefly appear to explain that the documents share a calibrated coordinate relationship.

## Scene 07 — Overlay

Original dominates first in cool graphite. Revision B enters in a separate revision red only during raw comparison; this is inherited from the product's current compare display, not the site's call-to-action color. The sequence moves through three explicit states:

1. original at 100%, revision at 0%;
2. original at 100%, revision at 75%;
3. both visually balanced for inspection.

Copy changes from:

> שתי תוכניות.  
> אחת על השנייה.

to:

> רואים מיד מה השתנה.

The view eases toward the bedroom partition, but the overall plan remains recognizable before the crop tightens.

## Scene 08 — Swipe handoff

The scroll animation resolves into a true interactive divider. A blue vertical line, with a minimum 44×44px handle, separates original and revision. On entering the state, the divider moves once from 62% to 50% to demonstrate affordance, then stops. Pointer movement does nothing until the visitor drags.

Labels remain fixed at the upper corners: `מקור` and `גרסה B`. The moved partition is centered in the reachable swipe range. The drag works from the handle and the whole divider line. Keyboard users can focus the control and adjust in 5% increments with arrow keys; Home and End reveal either complete plan.

## Scene 09 — Difference becomes work

After the visitor scrolls onward, the divider settles at 50%. Comparison red fades back to grayscale. The old wall footprint receives the demolition treatment; the revised wall footprint receives the new-construction treatment.

Copy sequence:

> לא רק לראות מה השתנה.

then:

> להבין מה צריך לבצע.

The old wall is highlighted first and labeled `הריסה · 0.75 מ״ר`. The new wall follows and is labeled `בנייה חדשה · 0.75 מ״ר`. Both then remain visible together. A compact Changes table grows from the plan baseline with two real rows, preserving the product's classification rather than presenting generated prose.

## Scene 10 — Report proof

The marked plan flattens into the report's plan page. A second report page rises slightly behind it. The report should be shown from the current exported `compare-report.pdf`, rendered as optimized page images or extracted vector/raster previews during implementation.

Copy:

> מהשינוי בתוכנית  
> לדוח שאפשר לעבוד איתו.

Supporting line:

> מסמנים הריסה ובנייה חדשה, ומייצאים דוח PDF מסודר.

Do not show an Excel badge here.

## Scene 11 — Two tools, one plan

Motion stops. A full-width, ruled field contains the heading:

> שני כלים.  
> סביב אותה תוכנית.

Below it are two linear sequences, not cards:

- `כמויות` → `כיול` → `סימון חדרים` → `חישוב` → `PDF / Excel`
- `השוואת גרסאות` → `יישור` → `שכבות / החלקה` → `סימון שינויים` → `PDF`

The sequences share one central miniature plan, reinforcing that BetterCalc is a coherent plan workflow rather than two unrelated products.

## Scene 12 — Audience lens

Five roles appear as a numbered vertical index beside the persistent plan. Selecting a role changes a single concise outcome line and highlights the relevant layer on the plan; it does not swap stock imagery.

Recommended roles:

1. `קבלני גמר` — כמויות עבודה והזמנה מחדרים מסומנים.
2. `מנהלי פרויקטים` — תמונת מצב ברורה בין תוכנית, שינוי ודוח.
3. `כמאים` — מדידה מסודרת מתוך קובץ PDF קיים.
4. `מפקחים` — השוואה מתועדת בין גרסאות ותכולת עבודה.
5. `אדריכלים ומעצבים` — דרך ברורה להעביר עדכונים לביצוע.

This is a “work lens,” not Heron's image accordion: the plan, data line, and highlighted workflow change; the overall composition does not become a photo gallery.

## Scene 13 — Accumulated final plan

The final composition returns to the full plan. It now carries a restrained selection of the layers earned through the page: calibration reference, three room boundaries, a small quantity total, the revised partition, and two change markers. The layers should be arranged, not all shown at maximum intensity.

Headline:

> יש לכם תוכנית?  
> תנו ל‑BetterCalc לעשות ממנה יותר.

CTA: `פתחו את BetterCalc`

Secondary text may say:

> התחילו מקובץ PDF. בלי CAD, בלי התקנה.

The footer continues the same rule grid and warm surface, but becomes static and utilitarian.

---

# 5. Detailed scroll states for every signature sequence

## 5.1 Hero continuity into QTO

**State H0 — loading-safe:** static original plan, headline, subcopy, and CTA render without animation.  
**State H1 — ready:** plan line weights settle from 80% to 100%; pointer hint appears.  
**State H2 — pointer probe:** crosshair snaps within an 8–12px tolerance to corners, the reference line, and approved room boundaries. A single blue measurement badge appears near the active geometry.  
**State H3 — exit:** copy moves upward no more than 24px and fades; the plan scales by no more than 4% and translates into the exact sticky QTO position.  
**State H4 — pause:** the plan dims while the narrative sentence occupies the canvas.  
**State H5 — QTO re-entry:** the same plan returns to full contrast. There is no cut to a different screenshot.

The continuity must be geometrically exact. A visitor should be able to track the `5.00 m` reference line from hero to calibration.

## 5.2 QTO sticky sequence

Recommended duration: `430–500vh` desktop. Use named timeline ranges rather than tying critical state boundaries to arbitrary pixel positions.

| Range | Visual state | Copy state | Required pause |
|---:|---|---|---|
| 0–10% | clean plan locks into place | `01 / כיול` enters | 0.4 viewport |
| 10–23% | reference endpoints and line activate | `מסמנים מרחק ידוע פעם אחת.` | allow full line read |
| 23–34% | calibration resolves, rest of plan returns | status `מכויל · 5.00 מ׳` | brief stillness |
| 34–49% | חדר הורים boundary and 25.48 | `02 / מסמנים חדרים` | value settles before next |
| 49–61% | חדר שינה boundary and 26.21 | same | stagger, no overlap animation |
| 61–73% | סלון boundary and 47.22 | same | longer dwell for largest room |
| 73–86% | compact rows assemble into quantity strip | `03 / מקבלים כמויות` | total appears last |
| 86–94% | total resolves to 98.91 | `סה״כ ריצוף רגיל` | numerical emphasis, no count-up longer than 0.7s |
| 94–100% | real PDF and Excel outputs appear | `04 / מייצאים` | settled final state |

Motion rules:

- The base plan does not drift while rooms are being added.
- Room boundaries enter clockwise from their first point or by a short opacity/clip reveal; avoid a slow “magic drawing” effect.
- Only one active room uses a strong fill. Completed rooms reduce in saturation but remain visible.
- Values should snap to their final number. A brief count-up is acceptable only if it ends quickly and never implies live recalculation from scroll.
- The table emerges from a page rule, visually connecting geometry to data.
- Export proof uses actual report material, not decorative file icons alone.

## 5.3 Overlay and swipe sequence

Recommended duration before the interactive hold: `220–280vh` desktop.

**State C0 — original:** original plan in graphite, Revision B absent.  
**State C1 — registration:** two alignment points or a short alignment line appears; Revision B outline enters at 20%.  
**State C2 — revised layer:** Revision B reaches 75%, matching the current compare default; the original remains visible.  
**State C3 — focus:** the plan field reframes toward the moved bedroom wall while preserving surrounding rooms.  
**State C4 — balanced overlay:** both revisions are readable and the displacement is obvious.  
**State C5 — divider forms:** the overlay boundary hardens into the blue swipe divider.  
**State C6 — interactive hold:** scroll no longer drives the divider. The visitor owns it until scrolling away.  
**State C7 — exit:** divider returns to 50%, focus stays on the wall, and semantic change colors replace revision tint.

The swipe state must remain understandable without dragging. The initial 50/50 state should already reveal the moved wall, and adjacent text must explain `גררו להשוואה`.

## 5.4 Demolition and new-construction sequence

Recommended duration: `220–280vh` desktop.

**State W0 — neutral difference:** both wall locations are present as thin gray outlines.  
**State W1 — old wall:** the original wall footprint takes on demolition amber; label `הריסה` and `0.75 מ״ר` appear.  
**State W2 — transition:** the old footprint stays visible but drops to 55% emphasis; a short directional connector bridges the 0.35m relocation. The connector explains movement only and must not be labeled as product-detected.  
**State W3 — new wall:** revised wall becomes construction green; label `בנייה חדשה` and `0.75 מ״ר` appear.  
**State W4 — together:** both footprints display at equal semantic weight.  
**State W5 — Changes table:** two rows enter from the lower rule; totals resolve.  
**State W6 — report morph:** table and plan flatten into the report preview.

The choreography must preserve chronology: existing wall → removal → revised wall → construction record. Avoid showing both colors at full strength before the visitor understands each meaning.

---

# 6. User-controlled interactions

## Hero measurement probe

The desktop hero allows exploration without requiring it. Pointer movement over the plan snaps a small blue crosshair to a curated set of geometric targets. Targets include the `5.00 m` reference, a wall segment, and one room boundary. The visible response can be a distance, a boundary highlight, or a small `סימון חדר` label.

Guardrails:

- no panning the whole plan;
- no continuously updating X/Y coordinates;
- no issue cards;
- no interaction required to read the hero;
- no fake result the product could not produce;
- maximum one tooltip at a time;
- native cursor returns outside the plan.

## Swipe comparator

This is the primary product-like interaction and must be real, not a video. Requirements:

- pointer, touch, and keyboard support;
- `role="slider"` semantics in implementation;
- accessible value text such as `50% תוכנית מקור, 50% גרסה B`;
- 44px minimum handle target;
- no page scroll lock for horizontal touch movement unless the gesture begins on the handle;
- visible original/revision labels independent of color;
- stable plan registration at every divider position;
- a reset control or double-click/tap behavior is optional, but 50% should be the default on re-entry.

## Audience work lens

Each role is a button in a numbered index. Selection changes:

- one concise benefit line;
- one highlighted plan layer or report fragment;
- one small workflow label.

The first role is selected by default. Arrow keys may move between roles. On mobile, roles become full-width disclosure rows with the relevant plan crop directly beneath the active row.

## Export proof controls

In the QTO result, `PDF` and `Excel` can behave as tabs that switch between static, real previews. They should not initiate a download unless real public sample files are intentionally provided at launch. If downloads are offered, the control must say `הורדת דוח לדוגמה` rather than resemble the live app export button.

---

# 7. Transitions between chapters

Transitions should reuse geometry from the outgoing scene rather than wipe the screen with decorative effects.

## Hero → quantity pause → QTO

The plan remains the same DOM/SVG object. Copy leaves, plan contrast decreases, the pause sentence enters, then the reference line reactivates. This is the most important continuity transition.

## QTO → revision question

Room fills fade; the quantity table collapses into a single baseline. The original plan remains at 100% registration. The question enters into the cleared area. Revision B arrives only after the question has been read.

## Overlay → swipe

The transition converts opacity comparison into spatial comparison. The edge of the clipped revision layer becomes the handle; no crossfade or replacement asset should interrupt alignment.

## Swipe → work states

The divider settles centrally and loses interactivity as the old and new wall footprints take semantic color. A small label changes from `השוואה` to `תכולת שינוי`, making the conceptual transition explicit.

## Changes table → PDF report

The table rows align with their equivalents in the report. The report page expands from the same lower baseline. This may be a scale/clip transition, not a 3D page flip.

## Summary → audience

The miniature shared plan from the two-workflow diagram scales up to become the audience lens canvas. This makes audience relevance feel like another way to view the same work rather than a detached persona section.

## Audience → final CTA

Role-specific layers fade to a curated composite. The final copy appears only after the plan reaches its accumulated state. The CTA is the final active blue signal.

---

# 8. Visual system

## Overall character

BetterCalc should feel like a modern quantity sheet laid over a working plan: warm but not nostalgic, technical but not cold, quiet enough for fine geometry, and visibly connected to the current product.

The marketing surface is warmer than the app's cool stage, but the product blue, type density, and plan treatment create continuity. The page uses planes, rules, and anchored annotations instead of rounded feature cards.

## Surface hierarchy

1. **Page field:** warm off-white technical paper.
2. **Plan sheet:** a slightly lighter neutral with almost no elevation.
3. **Instrument surface:** cool light gray, borrowed from the app stage, for compact product fragments.
4. **Data strip:** white or near-white with horizontal rules.
5. **Active state:** blue edge/fill with restrained translucency.

## Geometry rules

- Default corner radius: `0–2px` for editorial/layout surfaces.
- Product controls may retain the app's existing `6–8px` radius inside authentic screenshots or faithful fragments.
- Buttons: 2–4px radius maximum; primary CTA can be rectangular with a separated arrow cell.
- Borders: predominantly 1px; structural frame can use 1.5px at high pixel densities.
- Shadows: none on page structure; only a very subtle sheet shadow where a report page must separate from the background.
- Dividers and annotations meet the grid; avoid free-floating pills.

## Plan treatment

- Preserve vector sharpness where possible.
- Heavy walls remain the darkest geometry.
- Furniture and dimensions sit at 35–55% of structural contrast.
- Marketing overlays use alpha fills so the plan remains legible.
- Labels must not collide with source-plan area text.
- Plan crops always include enough neighboring geometry to remain spatially understandable.
- A clean plan state is shown before every annotation-heavy state.

## Product UI fragments

Use only the portions needed to prove a result: calibration status, three room values, quantity rows, layer labels, change rows, and exports. Recompose these as semantic HTML styled with BetterCalc tokens; do not paste full 1600×1000 screenshots into browser frames as the primary storytelling device. Full screenshots can appear in a secondary “see the product” proof area if needed later.

---

# 9. Typography

## Recommended pairing

### Primary Hebrew and Latin: Heebo Variable

Heebo is already used in the BetterCalc demo video assets, supports Hebrew and Latin cleanly, and can carry display, body, navigation, and product-adjacent copy. Use variable weights if self-hosting is legally and operationally approved.

Recommended roles:

- display: 650–750;
- section title: 600–700;
- body: 400–450;
- UI label: 500–600.

### Technical numerals and Latin labels: IBM Plex Mono or Geist Mono

Use mono only for measurements, indices, file types, revision names, and compact metadata. Hebrew words should generally remain in Heebo; forcing Hebrew into a Latin-oriented monospaced face creates fallback inconsistencies.

Examples appropriate for mono:

- `5.00 m`
- `98.91 m²`
- `REV B`
- `PDF / XLSX`
- `01 / כיול`

When the visible label is Hebrew, keep the Hebrew portion in Heebo and isolate the number/unit with `dir="ltr"` in implementation.

## Scale

| Role | Desktop | Mobile | Line height | Notes |
|---|---:|---:|---:|---|
| Hero | clamp(56px, 6.2vw, 104px) | 42–56px | 0.92–0.98 | two deliberate lines |
| Major pause | 48–76px | 36–48px | 1.0 | ample empty space |
| Section title | 34–52px | 30–38px | 1.05 | max two lines |
| Outcome number | 44–72px | 36–52px | 1.0 | tabular numerals |
| Body lead | 18–22px | 17–20px | 1.45 | 34–44ch maximum |
| Body | 15–17px | 16–18px | 1.55 | never tiny “premium” copy |
| Technical label | 11–13px | 12–13px | 1.35 | strong contrast |

Use `font-variant-numeric: tabular-nums` for quantities, dimensions, percentages, and table values.

## Hebrew composition rules

- Write natural Hebrew; do not mirror English headline syntax mechanically.
- Keep punctuation attached to the semantic Hebrew phrase, not to an isolated LTR number span.
- Use non-breaking spacing between values and units: `98.91 מ״ר`.
- Keep line breaks editorially controlled at the largest sizes.
- Avoid all-uppercase as a visual device; hierarchy comes from weight, scale, spacing, and rules.

---

# 10. Grid and layout

## Desktop

- Full framed width with a 16–24px outer inset.
- 12-column grid.
- 20–28px gutters.
- Minimum content edge 24px; 40–56px above 1440px.
- Persistent vertical anchors at columns 1, 4, 7, 10, and 12.
- Copy column usually 3–4 columns wide.
- Plan canvas usually 8–10 columns and may cross behind the copy only where contrast is protected.
- Maximum plan sheet width approximately 1440px, but the surrounding technical field can be full-bleed.

## Tablet

- 8-column grid.
- Plan occupies all eight columns; copy uses four to six.
- Sticky scenes shorten by roughly 20–30%.
- Quantity table becomes horizontally clipped only if a deliberate column subset is shown; never depend on page-level horizontal scrolling.

## Mobile

- 4-column grid.
- 16px side inset, 12px gutters.
- Copy and plan stack in a single reading order.
- The plan may intentionally crop within a bounded viewport, but the user should not need to pinch-zoom to understand the story.
- Dense data views show a selected subset of columns and a clear total.

## Vertical rhythm

Use an 8px base with the practical sequence `8, 12, 16, 24, 32, 48, 72, 96, 144`. Signature pauses should consume space in viewport units; utility spacing should use fixed tokens. Do not apply giant vertical padding uniformly to every section.

## RTL mechanics

The document is `dir="rtl"`, but plan coordinates, file names, revision names, measurements, and table numerals require isolated bidirectional spans. Visual timeline direction should follow Hebrew reading order where it improves comprehension, but spatial facts in the plan must never be mirrored.

---

# 11. Color roles

The exact final values should be contrast-tested in implementation. This initial palette connects the marketing page to current BetterCalc tokens while establishing a warmer editorial ground.

| Role | Proposed value | Use |
|---|---:|---|
| Warm paper | `#F4F1EA` | primary website background |
| Plan sheet | `#FCFBF8` | drawing and report surfaces |
| Charcoal | `#172033` | headlines, heavy plan geometry |
| Body graphite | `#3F4654` | body copy; matches app text |
| Muted | `#6B7280` | secondary labels; matches app muted |
| Rule | `#C9CDD4` | page grid and technical dividers |
| Rule light | `#E3E5EA` | dense table separators; matches app border |
| Instrument gray | `#E7E9EE` | product-adjacent stage; matches app stage |
| BetterCalc blue | `#2563EB` | CTA, active selection, calibration, swipe handle |
| Blue hover | `#1D4ED8` | interactive hover/focus |
| Blue wash | `rgba(37,99,235,.10)` | measured-room and active-layer fill |
| Demolition amber | `#C58A12` | demolition geometry and labels |
| Demolition wash | `rgba(197,138,18,.16)` | demolition footprint fill |
| Construction green | `#16803D` | new-construction geometry and labels |
| Construction wash | `rgba(22,128,61,.14)` | new-construction footprint fill |
| Revision compare | `#DC4F57` | temporary Revision B line tint only |

### Color discipline

- Blue is the sole brand/action accent.
- Amber and green are semantic work types, always paired with labels and/or patterns.
- Revision red is limited to the raw two-layer comparison and disappears when semantic change markup begins.
- No red/orange is used as a general CTA or decorative brand field.
- Large backgrounds remain neutral; saturated colors occupy small, meaningful areas.
- Focus rings use blue plus an offset neutral halo and must remain visible on blue-filled controls.

---

# 12. Motion language

## Character

Motion is measured, planar, and causal. It should resemble aligning sheets, marking boundaries, and resolving rows—not cinema, physics, or AI magic.

## Core motion verbs

- **Align:** two layers translate/rotate minimally into registration.
- **Trace:** a boundary resolves along actual room geometry.
- **Reveal:** a clipped plan or report layer becomes visible.
- **Settle:** an annotation moves 8–20px into its anchored location.
- **Resolve:** a value or status changes once and holds.
- **Hand off:** scroll-driven movement stops and a user-controlled state begins.

## Timing

| Motion | Duration | Easing |
|---|---:|---|
| hover/focus feedback | 120–180ms | standard ease-out |
| local label or row | 180–260ms | cubic-bezier(.2,.8,.2,1) |
| layer reveal | 320–480ms | cubic-bezier(.2,.7,.2,1) |
| chapter transition | 600–900ms equivalent | scrubbed/linear with eased endpoints |
| role content swap | 240–360ms | ease-out |
| report sheet settle | 450–650ms | no overshoot |

## Rules

- Transform and opacity are the default animated properties.
- Avoid perpetual marquee, floating, pulsing, and cursor-chasing effects.
- Never animate all plan layers simultaneously.
- Motion stops when a data table is intended for reading.
- Scroll direction reverses the visual sequence cleanly; no one-way state should leave the plan inconsistent.
- A user-controlled interaction is not simultaneously scroll-controlled.
- Native scrolling is preferred. Smooth-scroll hijacking is unnecessary.

---

# 13. QTO choreography

## Source of truth

The choreography uses the existing original plan and current product demo evidence:

- calibration: actual `5.00 m` reference printed on the plan;
- three marked rooms: `חדר הורים`, `חדר שינה`, `סלון`;
- visible current values: `25.48`, `26.21`, `47.22 מ״ר`;
- total regular tiling: `98.91 מ״ר`;
- waste: `0%` in the current demo;
- exports: real QTO PDF and Excel artifacts.

## Layer stack

1. source plan structural geometry;
2. subdued furniture and source labels;
3. calibration endpoints and line;
4. room boundaries and translucent fills;
5. anchored room labels/values;
6. compact quantity table;
7. export proof.

## Camera and crop

Begin with the full A3 plan. Calibration keeps the full sheet because the reference sits near the bottom. Room marking may scale in by up to 8%, but all three rooms must fit simultaneously at the final state. The quantity strip can occupy the lower 24–30% of the sticky canvas, allowing the plan to translate upward slightly without changing scale.

## Data presentation

The marketing table is a faithful excerpt, not a pixel copy of the whole product panel. Recommended columns:

| חדר | כמות נטו | פחת | להזמנה |
|---|---:|---:|---:|
| חדר הורים | 25.48 מ״ר | 0% | 25.48 מ״ר |
| חדר שינה | 26.21 מ״ר | 0% | 26.21 מ״ר |
| סלון | 47.22 מ״ר | 0% | 47.22 מ״ר |
| **סה״כ** | **98.91 מ״ר** |  | **98.91 מ״ר** |

The current app also calculates panels and other work types where configured, but the signature sequence should focus on one clean tiling quantity story. Broader capability can be explained later in copy without crowding the primary proof.

## Truthfulness note

The source PDF itself contains printed room-area labels that differ from the marked-area values visible in the current app demo. The marketing asset must not place two competing area readings in the same visual hierarchy. Recommended solution: create a marketing-clean derivative of the plan that preserves room names and geometry while suppressing the printed area numerals, then overlay the verified BetterCalc values. Alternatively, revise the demo geometry and report together before production. Do not silently change only one side.

---

# 14. Revision Compare choreography

## Source of truth

- Original: `BetterCalc_Demo_Apartment_A_Floor_Plan.pdf`
- Revision: `BetterCalc_Demo_Apartment_A_Revision_B.pdf`
- same A3 landscape page size;
- meaningful demonstrated change: the wall between the two lower bedrooms moves horizontally in Revision B;
- current product modes include layers/overlay and swipe;
- current marked changes: one demolition region and one new-construction region, each displayed as `0.75 מ״ר`;
- export: comparison PDF only.

## Alignment sequence

Do not imply the files align themselves automatically unless that capability is explicitly confirmed for the launch version. The visual story can show alignment points being identified, then the plans settling into registration. The copy should say `מיישרים את הגרסאות` or `שמים את הגרסאות זו על זו`, not `BetterCalc מזהה ומיישר אוטומטית`.

## Overlay sequence

The original begins in neutral graphite. Revision B enters in temporary revision red at 75% opacity, echoing the current product. The opacity balance then moves toward a state in which duplicated lines visually neutralize and the moved wall remains doubled.

Avoid blend modes that produce inaccessible or muddy geometry. A controlled opacity pair plus distinct labels is preferable.

## Swipe sequence

The divider should expose the original on one side and Revision B on the other. Because the page is RTL, labels may sit `מקור` on the right and `גרסה B` on the left if that matches the implemented clip orientation; what matters is persistent, unambiguous labeling. Do not mirror or reverse the plans themselves.

The moved wall should stay within the central 40% of the comparator so a small drag reveals it. The divider's focus outline and value readout must not cover the wall.

## Change-marking sequence

After comparison, the website visibly changes mode from inspection to user marking. A small tool label such as `סימון שינוי` appears. Then:

1. old wall footprint receives demolition amber;
2. text `הריסה · 0.75 מ״ר` anchors beside it;
3. revised footprint receives construction green;
4. text `בנייה חדשה · 0.75 מ״ר` anchors beside it;
5. the Changes table shows both rows.

This sequence demonstrates that the user records work against the visual difference. It must never use copy such as `זוהה שינוי`, `נמצא אוטומטית`, or `AI identified`.

## Report sequence

The real comparison report is the end state. The marketing preview should show enough of the marked plan and change summary to prove continuity. If report pages are too small for body copy to read, magnify one authentic table region rather than inventing a redesigned report.

---

# 15. Mobile adaptation for each major sequence

Mobile is a re-authored experience, not the desktop timeline compressed into portrait dimensions.

| Sequence | Mobile composition | Input | Simplification |
|---|---|---|---|
| Hero | headline first, plan beneath at 60–70vh | tap one of 2–3 hotspots or passive demo | no cursor/crosshair tracking |
| Narrative pause | 60–75vh, two-line statement | none | plan ghost reduced to one crop |
| Calibration | sticky 160–200vh, full-width plan with reference line kept visible | scroll | no endpoint drawing beyond a short reveal |
| Rooms | plan crop changes between rooms; mini-map or label preserves context | scroll or explicit `הבא` dots | only one strong room fill at a time |
| Quantity result | total first, then three stacked rows | normal scroll | four-column desktop table becomes labeled value rows |
| Export | two side-by-side sample tabs or stacked report thumbnails | tap | no animated sheet fan |
| Revision overlay | focused bedroom crop; original/revision labels fixed | scroll | full-plan alignment shown briefly, then crop |
| Swipe | full-width 4:3 comparator, 52px handle | horizontal drag/touch | no scroll-driven divider movement after handoff |
| Demolition/build | focused moved-wall crop with labels outside geometry | step scroll | one semantic state at a time |
| Changes table | two stacked records | normal scroll | totals remain visible; nonessential columns removed |
| Report | one report page plus tap-to-view second preview | tap | no overlapping sheets if text becomes too small |
| Two tools | two vertical workflows sharing a plan icon | normal scroll | no side-by-side diagram |
| Audience | disclosure list; active outcome and plan crop under row | tap | no persistent split-screen |
| Final CTA | accumulated crop above copy, not behind it | tap CTA | only 3–4 layers shown |

## Mobile sticky behavior

- Keep total sticky distance under roughly 650–800vh across the whole page, not per sequence.
- Prefer one QTO sticky chapter and one short comparison sticky chapter.
- Use `100svh`/`100dvh` carefully; account for browser chrome and safe areas.
- Avoid nested scroll containers.
- Do not pin a table while the on-screen keyboard or browser controls reduce viewport height.
- At widths below approximately 360px, switch long technical labels to two lines rather than reducing below 12px.

## Mobile hero behavior

The plan can run a 3–4 second passive loop once: reference line highlights, one room boundary appears, and the result badge resolves. Tapping the plan can repeat or select the next approved hotspot. The content remains fully understandable if the loop never runs.

## Mobile swipe details

Set `touch-action: pan-y` on the comparator region and capture horizontal movement only after a horizontal intent threshold. This lets users scroll normally when touching the plan. Provide `מקור` and `גרסה B` toggle buttons as an alternative to dragging; the toggles are also useful for reduced-motion mode.

---

# 16. Reduced-motion behavior

`prefers-reduced-motion: reduce` must produce a complete, intentionally designed version—not merely set all durations to zero.

## Global substitutions

- Disable smooth scrolling and scrubbed timelines.
- Replace sticky multi-state animation with ordered static states in normal document flow.
- Keep all headings, explanations, values, and controls present.
- Remove count-ups, plan tracing, auto-moving dividers, parallax, and sheet morphs.
- Preserve focus, hover, and pressed feedback with 80–120ms opacity/color changes where acceptable.

## Sequence mapping

| Standard experience | Reduced-motion experience |
|---|---|
| hero pointer snapping | static plan with one selected 5.00m annotation; optional click changes target instantly |
| plan remains through hero/QTO transform | hero plan followed by a clearly repeated calibration figure |
| scroll-drawn room boundaries | three static plan steps or one final annotated plan plus three rows |
| numeric count-up | final values shown immediately |
| aligned plan fade/translate | original, overlay, and focus images displayed as three figures |
| auto-demonstrated swipe | static 50/50 comparator; user drag still available |
| demolition/construction timeline | two adjacent labeled wall states, followed by combined state |
| report morph | direct cut to report preview |
| audience plan crossfades | content switches instantly after selection |

The swipe comparator can remain interactive because its movement is directly user-controlled, but no inertia, easing, or automatic motion should occur.

---

# 17. Performance strategy

## Performance target

The site should feel immediate on a normal mobile connection despite its visual ambition. The opening must not wait for the comparison sequence, videos, reports, or lower-page interaction code.

Suggested launch targets on representative mid-range mobile hardware:

- LCP under 2.5s at the 75th percentile;
- CLS under 0.1;
- INP under 200ms;
- initial page JavaScript well below a motion-heavy showcase site's bundle;
- no long-running animation loop when the page is idle.

## Asset strategy

- Use an optimized layered SVG for the signature plan whenever extraction quality is acceptable.
- Split the plan into only meaningful groups: base, calibration, rooms, revision, change marks, labels. Do not preserve every PDF drawing object as an independent DOM node.
- If SVG becomes too complex, use a high-resolution AVIF/WebP base plan and lightweight SVG overlays.
- Generate responsive plan crops for mobile; do not ship the full desktop raster when only one wall is visible.
- Render PDF report previews to AVIF/WebP at build time. Do not load PDF.js merely to show two marketing thumbnails.
- Keep the existing demo videos as optional production references or fallback proof, not autoplay backgrounds.
- Self-host only required font subsets/weights and preload the primary Hebrew font file.
- Lazy-load Revision Compare, report, and audience assets before their chapters using intersection thresholds.

## Runtime strategy

- Prefer CSS sticky positioning plus a small intersection/progress controller.
- If a timeline library is used, load it after the static hero is interactive and register only the two signature chapters.
- Animate transforms and opacity; do not continuously recalculate SVG paths on scroll.
- Coalesce pointer updates with `requestAnimationFrame`.
- Suspend hero pointer logic when offscreen.
- Do not use WebGL, a continuous canvas cursor, or a site-wide smooth-scroll loop.
- Respect `content-visibility: auto` for lower static sections where browser support and focus behavior are verified.
- Use explicit aspect ratios for every plan/report media surface to prevent layout shift.

## Progressive enhancement

The HTML order should already tell the full story: headline, calibration explanation, room values, total, comparison explanation, change records, audience, CTA. JavaScript upgrades those blocks into sticky sequences and interactions. If an animation module fails, no product claim or CTA disappears.

---

# 18. Existing reusable assets

| Asset | Location | Recommended use | Notes / limitations |
|---|---|---|---|
| Original Apartment A PDF | `demo/assets/BetterCalc_Demo_Apartment_A_Floor_Plan.pdf` | hero, QTO base, summary, CTA | real vector A3 landscape plan; printed room-area labels can conflict with demo overlay values |
| Revision B PDF | `demo/assets/BetterCalc_Demo_Apartment_A_Revision_B.pdf` | overlay, swipe, change story | same page size and strong registration; moved partition is the core proof |
| Sample plan PDF | `demo/assets/sample-plan.pdf` | internal testing only | too simplified to lead the marketing story |
| QTO plan screenshot | `demo/output/01-plan-rendered.png` | product-reference or secondary proof | authentic UI, but full screenshot is too dense for hero use |
| Calibrated screenshot | `demo/output/02-calibrated.png` | calibration fidelity reference | validates 5.00m status and UI language |
| Room screenshot | `demo/output/03-rooms-with-quantities.png` | marked-room reference | validates room names, overlays, and current values |
| Quantity panel screenshot | `demo/output/04-quantities-panel.png` | table/data reference | validates 98.91 total and 0% waste; useful as truth source |
| Overlay screenshot | `demo/output/01-overlay.png` | compare palette and layer reference | shows current 75% revised opacity and plan alignment |
| Swipe screenshots | `demo/output/02-swipe-revised.png`, `03-swipe-original.png`, `04-swipe-mid.png` | comparator state references | useful for visual QA and fallback images |
| Marked changes screenshot | `demo/output/05-marked-changes.png` | demolition/construction reference | authentic moved-wall markup |
| Changes panel screenshot | `demo/output/06-changes-panel.png` | table/data reference | validates two 0.75 מ״ר rows |
| QTO report PDF | `demo/output/reports/qto-report.pdf` | real export proof | pre-render to optimized previews for web |
| QTO Excel export | `demo/output/reports/qto-quantities.xlsx` | authentic Excel proof/download if approved | do not visually promise Excel for compare |
| Compare report PDF | `demo/output/reports/compare-report.pdf` | comparison-report proof | pre-render selected authentic pages |
| QTO demo videos | `demo/output/qto-demo.webm`, `qto-export.webm` | production reference, optional fallback | not needed for signature scroll implementation |
| Compare demo videos | `demo/output/compare-demo.webm`, `compare-extended.webm` | interaction/motion reference | not an autoplay requirement |
| Launch video and cover | `demo/video/out/betterCalc-launch.mp4`, `betterCalc-cover.png` | optional secondary media or social asset | keep out of critical path |
| Video theme tokens | `demo/video/src/theme.ts` | color/type continuity | confirms Heebo, blue, amber, green usage |
| App design tokens | `src/index.css` | product/marketing bridge | marketing surface may be warmer; keep action blue exact |
| Demo scripts | `demo/qto-demo.mjs`, `demo/compare-demo.mjs`, `demo/extra-footage.mjs` | regenerate evidence and verify flows | strongest source for intended demo sequence |

Existing assets should be treated as evidence and source material. Most should be transformed into web-appropriate layers or previews rather than embedded raw.

---

# 19. New assets needed

## Essential production assets

1. **Layered marketing plan asset**  
   A normalized SVG or hybrid raster/SVG composition in the original PDF coordinate system, with groups for base geometry, calibration, each room, Revision B, old wall, new wall, and anchor labels.

2. **Clean-label plan variant**  
   A derivative that removes or visually suppresses the printed room-area numerals that conflict with current BetterCalc demo measurements while keeping legitimate room names and technical context.

3. **Validated data manifest**  
   A small source-of-truth file for all website numbers and labels: calibration length, room values, QTO total, revision names, change types, and change areas. The UI, accessible descriptions, and any generated previews should consume the same values.

4. **Responsive plan crops**  
   Full plan, three-room QTO crop, moved-wall compare crop, and final accumulated crop at desktop/tablet/mobile aspect ratios.

5. **Authentic report previews**  
   Optimized images of the most useful QTO and Compare report pages, plus one enlarged table detail for each.

6. **Export file marks**  
   Simple BetterCalc-native PDF and Excel labels or icons; no third-party brand marks unless approved.

7. **Interaction affordances**  
   Swipe handle, calibration endpoint, room anchor, and semantic change legend designed as one family.

8. **BetterCalc wordmark/logo treatment**  
   A production-ready light-background and dark/blue-background version if the current text lockup is not already formalized.

9. **Font files and fallback QA sheet**  
   Licensed/self-hosted Heebo subset and selected mono; test Hebrew, English plan labels, numerals, superscript ², PDF/XLSX, and mixed-direction strings.

10. **Accessibility descriptions**  
    Concise alt text for static evidence and extended text equivalents for the QTO and comparison sequences.

## Optional assets

- a downloadable sample QTO report bundle;
- a downloadable sample revision comparison PDF;
- one short, captioned “product in motion” clip below the main story for visitors who prefer video;
- subtle paper/grid texture generated in CSS or as a tiny repeatable SVG;
- a compact icon family for `כיול`, `חדרים`, `כמויות`, `השוואה`, `הריסה`, and `בנייה חדשה`.

## Asset QA requirement

Every visible number must be checked against the current app output immediately before launch. If the demo data changes, update the source PDFs, screenshots, reports, website manifest, and copy as one versioned set.

---

# 20. Proposed initial Hebrew copy

The copy is intentionally direct and contractor-facing. It avoids “revolutionary,” “smart,” and unsupported automation language.

## Header

- Navigation: `כמויות` · `השוואת גרסאות` · `למי זה מתאים`
- CTA: `פתחו את BetterCalc`

## Hero

**Headline**  
`מתוכנית PDF`  
`לכמויות.`

**Subcopy**  
`חישוב כמויות והשוואת גרסאות ישירות מתוכניות PDF — בלי CAD.`

**CTA**  
`נסו את BetterCalc`

**Interaction hint**  
`העבירו על התוכנית`

## QTO entrance

**Pause**  
`יש לכם תוכנית.`  
`עכשיו צריך להוציא ממנה כמויות.`

**Calibration**  
Eyebrow: `01 / כיול`  
Title: `מתחילים ממרחק ידוע.`  
Body: `מסמנים קו מידה בתוכנית ומגדירים את האורך האמיתי.`  
Status: `מכויל · 5.00 מ׳ ייחוס`

**Rooms**  
Eyebrow: `02 / חדרים`  
Title: `מסמנים את השטחים שצריך לחשב.`  
Body: `כל חדר נשאר מחובר למיקום שלו בתוכנית.`

**Quantities**  
Eyebrow: `03 / כמויות`  
Title: `הסימון הופך לטבלה.`  
Total label: `סה״כ ריצוף רגיל`  
Total: `98.91 מ״ר`

**Export**  
Eyebrow: `04 / יצוא`  
Title: `מהתוכנית לדוח מסודר.`  
Body: `מייצאים את הכמויות ל‑PDF או ל‑Excel.`  
Controls: `תצוגת PDF` · `תצוגת Excel`

## Revision transition

`ומה קורה`  
`כשהתוכנית משתנה?`

## Overlay and swipe

**Overlay**  
`שתי תוכניות.`  
`אחת על השנייה.`

Supporting copy: `מיישרים את הגרסאות ומשווים אותן באותו קנה מידה.`

**Swipe**  
`רואים מיד מה השתנה.`

Instruction: `גררו להשוואה`  
Labels: `מקור` · `גרסה B`

## Demolition and construction

**First beat**  
`לא רק לראות מה השתנה.`

**Second beat**  
`להבין מה צריך לבצע.`

Labels:  
`הריסה · 0.75 מ״ר`  
`בנייה חדשה · 0.75 מ״ר`

Body: `מסמנים את השינוי על התוכנית ומרכזים אותו בטבלת שינויים.`

## Compare report

**Headline**  
`מהשינוי בתוכנית`  
`לדוח שאפשר לעבוד איתו.`

**Body**  
`תוכנית מקור, גרסה מעודכנת, סימוני הריסה ובנייה חדשה — בדוח PDF אחד.`

## Comprehension checkpoint

**Headline**  
`שני כלים.`  
`סביב אותה תוכנית.`

**QTO summary**  
`מכיילים → מסמנים חדרים → מחשבים כמויות → מייצאים PDF או Excel`

**Compare summary**  
`מיישרים גרסאות → משווים → מסמנים שינויים → מייצאים PDF`

## Audience

**Heading**  
`אותה תוכנית.`  
`כל אחד צריך ממנה משהו אחר.`

**Intro**  
`BetterCalc מחבר בין המדידה, ההשוואה והדוח — לפי העבודה שצריך לקדם.`

**Roles**

- `קבלני גמר` — `להוציא כמויות עבודה והזמנה לפי חדרים.`
- `מנהלי פרויקטים` — `להבין מה השתנה ולהעביר תמונת מצב ברורה.`
- `כמאים` — `למדוד מתוך PDF ולרכז תוצאה מסודרת.`
- `מפקחים` — `לתעד שינויים ולבדוק את תכולת הביצוע.`
- `אדריכלים ומעצבים` — `להעביר עדכון תוכנית בצורה שקל להשוות ולבצע.`

## Final CTA

**Headline**  
`יש לכם תוכנית?`  
`תנו ל‑BetterCalc לעשות ממנה יותר.`

**Body**  
`התחילו מקובץ PDF. בלי CAD, בלי התקנה.`

**CTA**  
`פתחו את BetterCalc`

## Copy claims to avoid

- `מזהה שינויים אוטומטית`
- `AI שמחשב הכול בשבילכם`
- `דיוק מושלם`
- `ללא טעויות`
- `תומך בכל תוכנית`
- `יצוא Excel להשוואת גרסאות`
- `הנתונים נשמרים בענן` or any cloud claim unless the product model changes
- vague claims such as `חוסכים שעות` without measured evidence

---

# 21. High-level implementation recommendations

These are architectural recommendations for the later build phase, not an implementation mandate.

## Rendering model

- Keep the marketing experience in the existing React/Vite ecosystem unless deployment requirements justify a separate framework.
- Represent the persistent plan in one normalized coordinate system matching the source PDF page.
- Build semantic plan layers as SVG groups or hybrid image/SVG overlays.
- Render quantity and Changes tables as real HTML for accessibility, responsive layout, and selectable text.
- Use authentic report previews generated at build time.
- Avoid loading the live product application inside the marketing page.

## Story state

Define explicit narrative states instead of scattering scroll percentages through components. Suggested state names:

`hero` → `calibration` → `room-master` → `room-bedroom` → `room-living` → `quantities` → `qto-export` → `revision-enter` → `overlay` → `swipe` → `demolition` → `construction` → `changes-table` → `compare-report` → `summary` → `audience` → `final`

A state machine or typed chapter configuration should map each state to:

- active plan layers;
- camera/crop;
- copy block;
- active data rows;
- interaction ownership;
- mobile variant;
- reduced-motion replacement.

## Scroll orchestration

- Prefer native scroll plus CSS `position: sticky`.
- Use Intersection Observer for chapter activation.
- Use a small progress mapper or GSAP ScrollTrigger only for the two complex pinned sequences if it materially reduces implementation risk.
- Avoid Lenis or equivalent smooth-scroll interception unless extensive accessibility and input testing proves a real benefit.
- Ensure deep links and browser find still reach content inside transformed chapters.

## Interactions

- Implement the swipe comparator with pointer events and an accessible range/slider model.
- Keep the hero probe on a curated hit map, not pixel analysis.
- Make audience selection a real tab/disclosure pattern depending on viewport.
- Provide visible focus and keyboard parity for every click/tap interaction.

## Content and data

- Store all verified values in one typed marketing data manifest.
- Label product fragments as simplified where the layout differs from the application.
- Maintain an evidence note for every capability claim.
- Version the Original and Revision B files together.
- Add automated checks that the total equals the sum of visible room rows and that compare export types remain accurate.

## Accessibility

- One logical H1; sequential heading order regardless of visual position.
- Skip link and clearly labeled primary navigation.
- WCAG 2.1 AA contrast minimums.
- Text alternatives for every plan story state; decorative plan layers hidden from the accessibility tree.
- Table headers and captions for quantity/change data.
- Slider semantics and keyboard instructions for swipe.
- Color-independent demolition/construction labeling, optionally with different hatch patterns.
- Reduced-motion mode designed and tested from the outset.
- No essential content on hover.

## Analytics

Measure comprehension and intent without turning the experience into a telemetry-heavy demo. Useful events:

- hero plan interaction;
- swipe interaction started;
- audience role selected;
- sample report preview opened/downloaded;
- primary CTA clicked;
- chapter reach depth.

Do not use interaction completion as a gate for the CTA.

## Validation before build handoff

Prototype and test these three questions first:

1. Can a first-time visitor explain the QTO workflow after the three-room sequence?
2. Does the visitor understand that comparison is visual and change marking is user-directed?
3. Can a mobile visitor operate the swipe without fighting vertical page scroll?

If those fail, reduce choreography before adding polish.

---

# 22. Risks and overdesign guardrails

## Risk 1 — becoming a Heron clone

**Failure mode:** warm paper, plan, mono labels, long sticky scene, and colored markers accidentally reproduce Heron's identity.  
**Guardrail:** BetterCalc's story is measurement and comparison; use product blue, real tabular results, the Apartment A revision, a calibration line, and semantic construction colors. Do not use boot logs, live coordinates, violation cards, concrete collage imagery, orange CTAs, or Heron's exact typographic/composition patterns.

## Risk 2 — overstating automation

**Failure mode:** aligned overlays and animated wall highlights read as automatic change detection.  
**Guardrail:** explicitly show the mode shift to `סימון שינוי`; use verbs such as `משווים` and `מסמנים`; never use `זוהה` unless the product gains and validates that capability.

## Risk 3 — data contradictions

**Failure mode:** printed source-PDF areas, app-marked quantities, scripts, screenshots, and reports show different values.  
**Guardrail:** use the current customer-facing output—25.48, 26.21, 47.22, total 98.91, and two 0.75 change rows—as the approved launch set; suppress conflicting embedded numerals in the marketing derivative; drive all visible data from one manifest.

## Risk 4 — the plan becomes decoration

**Failure mode:** the plan is always present but does not explain any action.  
**Guardrail:** every return to the plan must add a product-relevant layer or resolve a workflow question. Remove plan appearances that exist only for atmosphere.

## Risk 5 — too much sticky scrolling

**Failure mode:** the page feels slow, especially for returning or task-oriented visitors.  
**Guardrail:** limit signature sticky chapters to QTO and Compare; keep a visible CTA in the header; allow normal scrolling elsewhere; shorten timelines on tablet/mobile; make every 60–100vh produce a meaningful state change.

## Risk 6 — faux product UI

**Failure mode:** beautifully simplified tables imply controls or capabilities that do not exist.  
**Guardrail:** use real labels, real values, and authentic exports. Mark recomposed fragments as simplified in internal specs. Do not add filters, AI badges, charts, or export formats for visual balance.

## Risk 7 — dense plan illegibility

**Failure mode:** full-sheet geometry, overlays, copy, and tables compete.  
**Guardrail:** reveal one semantic layer at a time; reduce inactive geometry; crop only after full-plan context is established; cap overlay opacity; preserve large quiet fields around labels.

## Risk 8 — color-only meaning

**Failure mode:** demolition and construction are indistinguishable for color-vision deficiencies.  
**Guardrail:** pair color with explicit words, icons/patterns, spatial position, and table rows. Test both states in grayscale.

## Risk 9 — RTL and mixed-direction defects

**Failure mode:** `5.00 m`, `98.91 m²`, file names, and revision labels reorder unpredictably.  
**Guardrail:** isolate LTR tokens, test VoiceOver/NVDA reading order, test Safari and Chromium, and keep visual order independent from DOM hacks.

## Risk 10 — mobile thermal and input cost

**Failure mode:** large SVGs, scroll listeners, and clip paths stutter; comparator steals vertical scroll.  
**Guardrail:** simplify groups, pre-render base plans, update on animation frames, disable offscreen work, shorten sticky ranges, and use gesture-intent thresholds.

## Risk 11 — a loader that delays value

**Failure mode:** an aesthetic loading sequence hides the hero while assets initialize.  
**Guardrail:** render static hero HTML and a lightweight plan immediately; enhance layers later. No mandatory narrative preloader.

## Risk 12 — too many miniature interactions

**Failure mode:** every line, row, and role asks for hover or drag, making the site feel like a demo playground.  
**Guardrail:** reserve user control for the hero probe, swipe comparator, export preview, and audience lens. Everything else is guided or static.

## Risk 13 — reports shown too small to prove anything

**Failure mode:** report pages become decorative paper thumbnails.  
**Guardrail:** show one full-page context state, then magnify an authentic detail with readable headings and values. Provide a sample download only if the files are approved for public use.

## Risk 14 — two products feel disconnected

**Failure mode:** QTO and Revision Compare become separate landing pages stacked together.  
**Guardrail:** keep the original plan registered throughout, transition directly from the quantity result into Revision B, and close with the shared-plan workflow summary.

## Risk 15 — polish precedes comprehension

**Failure mode:** time is spent on path animation, paper texture, or page morphs before the core story tests well.  
**Guardrail:** prototype in grayscale with static layers first. Validate the three comprehension questions in section 21. Add motion only when it makes cause and effect clearer.

---

# Recommended next design deliverables

This blueprint is ready to move into design, but not directly into high-fidelity production. The next phase should produce, in order:

1. a verified marketing data manifest and clean plan-layer asset;
2. low-fidelity desktop storyboards for the 13 scenes;
3. mobile storyboards for QTO, swipe, and change marking;
4. a motion prototype of only the hero-to-QTO continuity;
5. an accessible swipe prototype on desktop and mobile;
6. high-fidelity keyframes for QTO result, overlay, demolition/construction, and final CTA;
7. a performance budget and asset-loading map;
8. usability testing before the complete page is animated.

The design succeeds if a visitor remembers one coherent transformation: **the PDF plan they already have becomes quantities and actionable revision information inside BetterCalc.**
