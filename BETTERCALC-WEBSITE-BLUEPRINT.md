# BetterCalc Website Blueprint — Package 1

This preserves Package 1 product facts while restoring the original scroll-story experience from `df01201`, immediately before `fed471d`. The older room-only scope and doubled demo quantity remain superseded. Decisions about replacing or tuning the original motion are deferred until the new content and real visual assets are complete.

## Positioning and identity

BetterCalc turns architectural/construction PDF plans into usable quantities in the browser, without a CAD-heavy workflow. Preserve the existing brand, Hebrew RTL direction, Heebo/IBM Plex typography, paper/ink/blue palette and plan-based visual language.

Hero headline: **מתוכנית PDF לכמויות.** Supporting copy covers finishes, concrete, reinforcement, revision comparison and PDF/Excel output. Application CTA: **פתחו את BetterCalc**. Secondary CTA links to the workflow.

## Seven-section architecture

1. Original pinned Hero/takeoff progression: calibration, rooms, quantities and export, with current messaging and CTAs.
2. From Plan to Quantities: upload → calibrate → mark → calculate → report.
3. Finishes: flooring/cladding, perimeter quantities, openings/deductions, waste, editable geometry.
4. Concrete & Reinforcement: three stable groups for concrete, mesh/bars and stirrups.
5. Original pinned Revision Compare progression: alignment, overlay, guided/user-controlled swipe, manual changes and PDF output.
6. At the Desk and On Site: complete desktop workspace, real tablet field editing, phone review/items/quantities/simple measurement and annotation.
7. Consolidated Reports / Audience / Final CTA: existing real PDF and Excel evidence, original numbered audience index, direct outcome-led invitation.

Core measurements, markups and project overview belong in the shared workflow. Do not create a separate major section for every feature.

## Structural truth

- Concrete: mark areas/elements, edit geometry, define dimensions, calculate volume and review plan/project quantities, with PDF/Excel output.
- Mesh & Bars: bottom/top reinforcement, procurement quantities, physical Mesh Layout, manual sheet placement, Straight Bars Area and Individual Bars.
- Stirrups: actual shapes, line/area distributions, quantities, actual shapes in report/Excel output.

The current text-led `ProductGroup` architecture accepts future real visuals. Do not substitute invented UI, generated mockups or unsupported engineering-design claims.

## Comparison truth

The existing apartment plans share a coordinate system. The website demonstration presents overlay and swipe. BetterCalc additionally provides alignment, page mapping, split/swipe, blink, annotations and measurements.

Users inspect differences and author their own markings. The example difference list is narration, not automatic detection. Existing comparison output evidence is PDF; do not claim comparison Excel output without additional evidence.

## Quantities and exports

The verified current demo flooring total is **49.46 m²**: 12.74 + 13.11 + 23.61, at 0% waste. The old doubled demo total must never be reused. Order quantities depend on configured work items, deductions and waste.

Use the existing real report detail and workbook excerpt together in the compact Reports section. The restored story export stages retain the original full report/stack visuals. The source report plan contains printed area labels that differ from the demonstrated takeoff values; those printed labels must not be used as quantity truth. Comparison marks are manually authored: demolition 0.75 m², construction 0.75 m².

General finishes/concrete/reinforcement PDF and Excel outputs can be described. Existing visual evidence currently covers finishes and comparison; actual Structural output assets remain for Package 2.

## Restored motion and responsive composition

The original `useStoryScroll`, `useCompareScroll` and `useWheelDamping` implementations are restored directly from git history, without timeline, camera, wheel-scale or easing changes. `App.css` retains the original takeoff/sticky/choreography rules, and `compare.css` restores the original guided presentation. Hero copy and CTA updates are integrated into the original composition rather than replacing it.

The pinned stories retain their original export stages. The added workflow, finishes, Structural, device and Reports/CTA sections, plus the original audience index, remain, with no large new animations. They separate the original two chapters in document flow but do not alter either chapter's internal motion.

Desktop retains the rich original experience. Reduced-motion visitors and phones below 640px use the original static figures, retaining readable explanations, report evidence and manual comparison controls. Tablet/phone jump navigation, touch targets, tablet-specific new-section layouts and the focused finishes crop remain. Responsive additions must not disable desktop story transforms or sticky stages.

Do not tune scroll speed, shorten sticky travel or redesign camera choreography yet. Final pacing evaluation comes after the new product content and real assets are complete.

## Package 2 — interactive product proof

The reusable ProductBrowser presents actual captured plan/inspector states in a neutral application frame. User selection switches Finishes / Concrete / Mesh & Bars / Stirrups; step buttons and replay reveal the fixed workflow without an embedded application or duplicate quantity engine. No continuous mode autoplay. CSS transitions explain selection, geometry and resulting inspector changes, and then settle.

Hero uses the original vector plan and camera composition throughout; Product Browser remains in the feature sections. This does not alter camera keys, sticky durations, stage thresholds or wheel behavior. Finishes uses a focused variant; Structural uses one shared browser and concise supporting group summaries. Compare retains its restored choreography.

Real tablet/phone touch-layout captures replace the text-only device visuals. Tablet editing is primary; phone Items/quantities/Show on Plan is secondary. Phone product-browser demonstrations use a focused static final state and readable result text. Reduced motion settles immediately. No fake device UI or synchronization imagery.

Source: the adjacent BetterCalc working tree (base commit `780447f` at capture), isolated browser data, existing repository apartment demo PDF only. Originals and state manifest are saved under `assets-source/product-demo/`; optimized WebP assets and provenance under `public/assets/product-demo/`. Capture and preparation scripts are saved under `scripts/`.

The newly captured sample records show 12.65 m² room area, 14.32 m perimeter, 32.47 m² net cladding, 2.53 m³ concrete, 12 mesh sheets and 17 stirrups. Preserve the separate **49.46 m²** legacy story/report dataset; never label it as the new interactive sample total. Printed source-plan room labels are drawing content, not calculated quantities.

Mesh playback focuses on physical sheets, bottom/top reinforcement, procurement and an actual manual placement adjustment. Dedicated Straight/Individual Bars playback and new Structural report/Excel captures remain deferred to avoid overcrowding this package. Existing copy retains those capabilities and the existing real report evidence remains.

Cloud/Auth/accounts, cloud projects, automatic sync, collaboration, billing, automatic AI quantities and automatic revision detection must not be marketed. Production PDF viewing uses PDFium primarily, with PDF.js fallback/export where appropriate; website SVG extraction remains an explanatory asset.

No build, tests or lint suites were run. Browser use was limited to product asset production, not broad QA. Final scroll/pacing decisions remain deferred until website content and visuals are complete.
