# BetterCalc Website Blueprint — Package 1

This replaces the earlier scroll-story blueprint. The older room-only scope, doubled demo quantity, long pinned chapters and wheel damping are superseded. The current product facts and this document govern future website work.

## Positioning and identity

BetterCalc turns architectural/construction PDF plans into usable quantities in the browser, without a CAD-heavy workflow. Preserve the existing brand, Hebrew RTL direction, Heebo/IBM Plex typography, paper/ink/blue palette and plan-based visual language.

Hero headline: **מתוכנית PDF לכמויות.** Supporting copy covers finishes, concrete, reinforcement, revision comparison and PDF/Excel output. Application CTA: **פתחו את BetterCalc**. Secondary CTA links to the workflow.

## Seven-section architecture

1. Hero in normal flow, with existing plan evidence.
2. From Plan to Quantities: upload → calibrate → mark → calculate → report.
3. Finishes: flooring/cladding, perimeter quantities, openings/deductions, waste, editable geometry.
4. Concrete & Reinforcement: three stable groups for concrete, mesh/bars and stirrups.
5. Revision Compare: one stable aligned plan example, overlay opacity and user-controlled swipe.
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

Use the existing real report detail and workbook excerpt together. The full old report plan contains printed area labels that differ from the demonstrated takeoff; Package 1 shows its quantity detail rather than that ambiguous full-plan preview. Comparison marks are manually authored: demolition 0.75 m², construction 0.75 m².

General finishes/concrete/reinforcement PDF and Excel outputs can be described. Existing visual evidence currently covers finishes and comparison; actual Structural output assets remain for Package 2.

## Native scrolling and responsive composition

All sections are in normal document flow. No scroll-linked camera movement, pinned timelines or wheel interception. Product information and controls remain available while the section is visible.

Keep transitions subtle, typically 180–280 ms. Respect reduced motion. User-directed dragging and range controls remain usable without automated movement.

Tablet/phone navigation uses a compact jump menu. Phone composition follows copy → plan/example → result. Retain explanatory text and report evidence rather than removing content to fit a viewport-height stage. Tablets use their own intermediate grid composition; tablet field editing receives visual emphasis.

## Package boundaries

Package 1 uses existing assets only. Future Hero/workspace, finishes, concrete, Mesh Layout, stirrup/output and device screenshots belong to Package 2. `Structural` and `Devices` expose keyed visual slots; their default workflow content remains useful without images.

Cloud/Auth/accounts, cloud projects, automatic sync, collaboration, billing, automatic AI quantities and automatic revision detection must not be marketed. Production PDF viewing uses PDFium primarily, with PDF.js fallback/export where appropriate; do not present website SVG extraction as the live viewer.

No build, tests, lint, browser QA or screenshots were run during Package 1. The user will review manually. Keep future verification scoped and separately authorized.
