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
7. Consolidated Reports / Audience / Final CTA: existing real PDF and Excel evidence, compact audience statement, direct outcome-led invitation.

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

The pinned stories retain their original export stages. The added workflow, finishes, Structural, device and compact Reports/Audience/CTA sections remain, with no large new animations. They separate the original two chapters in document flow but do not alter either chapter's internal motion.

Desktop retains the rich original experience. Reduced-motion visitors and phones below 640px use the original static figures, retaining readable explanations, report evidence and manual comparison controls. Tablet/phone jump navigation, touch targets, tablet-specific new-section layouts and the focused finishes crop remain. Responsive additions must not disable desktop story transforms or sticky stages.

Do not tune scroll speed, shorten sticky travel or redesign camera choreography yet. Final pacing evaluation comes after the new product content and real assets are complete.

## Package boundaries

Package 1 uses existing assets only. Future Hero/workspace, finishes, concrete, Mesh Layout, stirrup/output and device screenshots belong to Package 2. `Structural` and `Devices` expose keyed visual slots; their default workflow content remains useful without images.

Cloud/Auth/accounts, cloud projects, automatic sync, collaboration, billing, automatic AI quantities and automatic revision detection must not be marketed. Production PDF viewing uses PDFium primarily, with PDF.js fallback/export where appropriate; do not present website SVG extraction as the live viewer.

No build, tests, lint, browser QA or screenshots were run during Package 1. The user will review manually. Keep future verification scoped and separately authorized.
