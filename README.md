# BetterCalc Marketing Website

Standalone Hebrew RTL React + TypeScript + Vite marketing site. Package 1 preserves the existing paper/ink/blue identity and uses existing plans and export assets.

## Page structure

1. Hero / Takeoff story — original pinned calibration, rooms, quantities and export choreography, with current product positioning and CTAs.
2. From Plan to Quantities — upload, calibrate, mark, calculate, report.
3. Finishes — flooring/cladding, perimeter quantities, openings/deductions, waste and editable geometry.
4. Concrete & Reinforcement — concrete, mesh/bars, stirrups.
5. Revision Compare — original pinned alignment, overlay, guided/user-controlled swipe, manual markings and report story.
6. At the Desk and On Site — desktop authoring, tablet field editing, phone review/simple tools.
7. Reports / Audience / Final CTA — consolidated real output evidence.

`src/App.tsx` composes focused section components. Shared design tokens remain in `src/index.css`; added product section layouts live in `src/landing.css`. The original motion infrastructure is restored from `df01201` (immediately before Package 1): `useStoryScroll`, `useCompareScroll`, `useWheelDamping`, the original comparison CSS and stage composition. Hero/takeoff composition now lives in `TakeoffStory.tsx`, with updated copy in `Hero.tsx`. Desktop retains the original camera keyframes, stage thresholds, sticky travel, transitions and wheel damping without tuning. Structural/device sections remain stable.

Reduced-motion visitors and phones below 640px use the original static story figures with readable explanatory content and manually operated comparison controls. Tablet/phone navigation and Package 1 intermediate layouts remain. The broader workflow/finishes/Structural sections now separate the original two story chapters; each story retains its internal timing and choreography. Decisions on final pacing and motion redesign are deferred until content and real assets are complete.

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
- Report preview PNG/AVIF files in `public/assets/report-previews/` come from real PDF exports. The compact Reports section uses the quantity detail excerpt and comparison table, alongside the existing workbook excerpt. The restored animated stories also use the original full report/stack compositions from the same existing assets; printed room-area labels on the source report plan are not the demonstrated takeoff values.
- `src/data/compare.ts` contains the plan pair, authored observations and manual demo markings. Demolition and construction marks each measure 0.75 m² in the comparison report.

The existing extraction/render scripts are asset maintenance tools. Use them only when asset regeneration is separately authorized and source reports have been updated.

## Package 2 interactive product proof

`src/components/product/ProductBrowser.tsx` is one reusable visual demonstration. `ProductDemoTabs` supplies keyboard-accessible user selection; `src/data/productDemo.ts` defines Hebrew/English-ready mode labels, fixed workflow steps and captured result descriptions. Separate real plan/inspector layers reveal geometry and update the inspector over a short user-triggered sequence. Step buttons and Replay give explicit control; no mode cycling, embedded product, website quantity engine or new animation dependency is involved.

Four modes: Finishes, Concrete, Mesh & Bars and Stirrups. Mesh additionally switches between actual captured automatic and manually adjusted sheet layouts; this example changes placement, not the sheet count. The actual rectangular stirrup editor shape remains visible with the line-distribution result. Dedicated Bars playback is intentionally not included: the Mesh mode demonstrates one clear reinforcement workflow while existing copy retains Straight Bars Area and Individual Bars coverage.

The Hero uses the original `PlanSheet` visual throughout its original camera choreography; Product Browser demonstrations remain in the feature sections. The original scroll hooks, timings, wheel behavior and Compare choreography are unchanged. Finishes uses a focused crop of the same demonstration; Structural has one browser switching between its three groups. Small phones receive a stable focused final state and readable results, rather than a squeezed desktop inspector. Reduced motion disables transitions and settles directly on the selected result.

Device proof consists of real touch-layout captures: tablet at 1024×768 with a selected editable room and open inspector, and phone at 390×844 with the Items review, quantities and Show on Plan action. These are actual adaptive product layouts, not desktop mockups. The tablet is the primary visual. No synchronization imagery or claims are added.

### Capture provenance

- Source product: the adjacent `../BetterCalc` working tree, based on commit `780447f` at capture time.
- Source drawing: `demo/assets/BetterCalc_Demo_Apartment_A_Floor_Plan.pdf` only. No customer/project files were used.
- `scripts/capture-product-demo.mjs` opens isolated Playwright contexts against the BetterCalc dev server on port 5193. It seeds a clean demo using current product store/constructors/mutations and the known sample outline, then captures the real renderer, UI and adaptive device states. It does not change BetterCalc source or calculations.
- Capture originals and state/quantity provenance live in `assets-source/product-demo/`; optimized WebP fragments and focused crops are in `public/assets/product-demo/`.
- `scripts/prepare-product-assets.py` uses Pillow for faithful crops and WebP optimization. It does not retouch/reconstruct product UI.
- New interactive sample quantities are 12.65 m² area, 14.32 m perimeter, 32.47 m² net cladding, 2.53 m³ concrete, 12 mesh sheets and 17 stirrups. These are taken from the currently rendered product state. The **49.46 m²** legacy takeoff story and report remain a separate existing dataset; do not combine its totals with this newly seeded demonstration.
- Existing PDF/Excel report evidence remains unchanged. No new Structural exports or fake report/spreadsheet interfaces were created.

No build, tests or lint suites were run. Browser use was confined to producing and inspecting product capture assets; no broad browser QA was performed. Nothing was pushed.

## Local development

Run `npm install` and `npm run dev` when needed. Standard project scripts remain `npm run build`, `npm run lint` and `npm run preview`; they were not run during Package 1.
