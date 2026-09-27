# BetterCalc Marketing Website

Standalone React + TypeScript + Vite marketing site for BetterCalc.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Story: Hero → Calibration → Rooms → Quantities → Export → Revision Compare

- Source files live untouched in `assets-source/` (plans + real exports); nothing there is deployed.
- `src/components/PlanDrawing.tsx` and `RevisionDrawing.tsx` are generated from the two vector PDFs:
  `python3 scripts/extract-plan.py > src/components/PlanDrawing.tsx` and
  `python3 scripts/extract-plan.py assets-source/plans/BetterCalc_Demo_Apartment_A_Revision_B.pdf RevisionDrawing > src/components/RevisionDrawing.tsx`. Geometry is copied 1:1 and grouped into
  layers (walls, fixtures, labels, dimensions, reference, sheet meta). Printed room-area numerals are omitted
  because they conflict with the verified BetterCalc demo values.
- `src/hooks/useStoryScroll.ts` drives the single pinned story with native scroll: one rAF-throttled listener,
  transform/opacity writes only, no React state during scroll. Story beats are published as `data-stage`
  (`hero → handoff → marking → measured → calibrated`) for short CSS transitions.
- Phase 3B (rooms, quantities, export) continues on the same pinned plan and panel. Beats are measured in
  viewport heights (`V` in `useStoryScroll.ts`); the whole story pins for 240svh.
- `src/data/qto.ts` holds every room rectangle and quantity. At module load it asserts that the rows sum to
  the total and that each value matches the real Excel export.
- Real exports live in `assets-source/reports/`. `compare-report.pdf` is copied from `BetterCalc/demo/output/reports/`; the two QTO
  exports were re-exported from BetterCalc on 2026-09-27 with one regular-tiling item per room (the older demo run added
  tiling twice per room, doubling every area to 98.91 m²; the correct total is 49.46 m²). Derived assets:
  - `swift scripts/render-report-previews.swift` → `public/assets/report-previews/*.{avif,png}` (from `qto-report.pdf` and
    `compare-report.pdf`; opaque, even-sized renders — the system AVIF encoder produces undecodable files otherwise)
  - `python3 scripts/extract-xlsx.py > src/data/qtoWorkbook.ts` (from `qto-quantities.xlsx`)
  Re-run both whenever the demo exports are regenerated.
- Reduced motion renders the story as composed static figures (hero, calibrated plan, marked rooms + total, export).
- Revision Compare (`src/components/CompareStory.tsx`, `src/hooks/useCompareScroll.ts`, `src/compare.css`) is a second
  pinned chapter (285svh) on the same architecture. A-101 and A-101-B share one coordinate system; the revision
  sheet uses `mix-blend-mode: multiply`, so walls register exactly. Swipe = counter-translated clip wrappers
  (compositor-only) driven by `useSwipeControl` (pointer, touch `pan-y`, keyboard slider). All compare geometry
  and values live in `src/data/compare.ts` (verified against the PDF diff and `compare-report.pdf`, page 2).
- Shared motion tokens live in `src/index.css` (`--beat-*`): room marks and change marks use one choreography
  (drag → resolve → value → ledger row). Product links come from `APP_URL` in `src/data/site.ts`.
