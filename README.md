# BetterCalc Marketing Website

Standalone Hebrew RTL React + TypeScript + Vite marketing site. Package 1 preserves the existing paper/ink/blue identity and uses existing plans and export assets.

## Page structure

1. Hero — PDF-to-quantities positioning, application CTA and workflow link.
2. From Plan to Quantities — upload, calibrate, mark, calculate, report.
3. Finishes — flooring/cladding, perimeter quantities, openings/deductions, waste and editable geometry.
4. Concrete & Reinforcement — concrete, mesh/bars, stirrups.
5. Revision Compare — stable aligned overlay and user-controlled swipe.
6. At the Desk and On Site — desktop authoring, tablet field editing, phone review/simple tools.
7. Reports / Audience / Final CTA — consolidated real output evidence.

`src/App.tsx` composes focused section components. Shared design tokens remain in `src/index.css`; normal-flow section layouts live in `src/landing.css`. Comparison is in `src/components/CompareStory.tsx` and `src/compare.css`, with pointer/touch/keyboard interaction in `src/hooks/useSwipeControl.ts`. There are no pinned story stages, scroll-linked cameras, or custom wheel damping. Reduced-motion visitors receive the same content and manually operated controls without animation.

All application CTAs use `APP_URL` in `src/data/site.ts` and the label “פתחו את BetterCalc”. Navigation uses normal anchors with fixed-header scroll offsets and a compact tablet/phone menu.

## Product truth

BetterCalc works with architectural/construction PDFs in the browser: viewing, calibration, measurements, markups, quantity takeoff, project overview and PDF/Excel output. Finishes, concrete and reinforcement are current capabilities. Mesh Layout includes physical sheet layout and manual placement. Stirrups support shapes and line/area distributions, including actual shapes in reports/Excel.

Revision Compare supports alignment, page mapping, overlay, split/swipe, blink, measurements and annotations. The website demonstrates overlay/swipe using the existing apartment plan pair; it does not automatically identify changes. Its explanatory difference list is authored demo narration. Comparison PDF output is evidenced; do not claim comparison Excel export without evidence.

Desktop is the complete workspace; tablet supports real field editing; phone supports review, items/quantities, simple measurements and annotations. Do not imply phone authoring parity or automatic cross-device project transfer.

Cloud/Auth/accounts, sync, collaboration, billing, automatic AI quantities and automatic revision detection are outside current marketing scope. Production viewing uses PDFium as the primary renderer; PDF.js remains fallback/export infrastructure where applicable. The marketing SVG plans are extracted illustrations, not evidence of the live viewer implementation.

## Existing asset provenance

- `assets-source/` contains the source demo plans and real reports; these originals are not deployed.
- `PlanDrawing.tsx` and `RevisionDrawing.tsx` are extracted from the two existing vector demo PDFs. Plan geometry is preserved; conflicting printed room-area numerals are omitted from the website drawing.
- `src/data/qto.ts` and `src/data/qtoWorkbook.ts` contain the verified demo quantities. The correct flooring total is **49.46 m²**, with **0% waste**: 12.74 + 13.11 + 23.61. A previous demo added tiling twice per room; its doubled total is obsolete.
- Report preview PNG/AVIF files in `public/assets/report-previews/` come from real PDF exports. Package 1 uses the quantity detail excerpt and comparison table, alongside the existing workbook excerpt.
- `src/data/compare.ts` contains the plan pair, authored observations and manual demo markings. Demolition and construction marks each measure 0.75 m² in the comparison report.

The existing extraction/render scripts are asset maintenance tools. Use them only when asset regeneration is separately authorized and source reports have been updated.

## Package 2 asset slots

`ProductGroup` accepts a `visual` React node. `Structural` and `Devices` accept keyed `visuals` maps for concrete / mesh-bars / stirrups and desktop / tablet / phone. Until real screenshots are supplied, those areas show useful workflow text, not fake UI or visible implementation placeholders. The Hero and Finishes use existing plan components and can later receive real workspace screenshots.

No new screenshots, illustrations or mockups were created for Package 1. No build, tests, lint, screenshots or browser QA were run for this package, as requested. Manual review is pending.

## Local development

Run `npm install` and `npm run dev` when needed. Standard project scripts remain `npm run build`, `npm run lint` and `npm run preview`; they were not run during Package 1.
