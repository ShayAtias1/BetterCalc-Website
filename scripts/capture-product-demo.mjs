// Asset production only: isolated browser, repository demo PDF, no application source changes.
import { createRequire } from 'node:module'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const appRoot = path.resolve(root, '../BetterCalc')
const require = createRequire(path.join(appRoot, 'package.json'))
const { chromium } = require('playwright')
const { LEGACY_PLAN } = await import(path.join(appRoot, 'demo/regression/fixtures.mjs'))
const url = 'http://127.0.0.1:5193'
const output = path.join(root, 'assets-source/product-demo')
await mkdir(output, { recursive: true })
const pdf = await readFile(path.join(appRoot, 'demo/assets/BetterCalc_Demo_Apartment_A_Floor_Plan.pdf'))
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1.5 })
const page = await context.newPage()
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(async ({ fixture, pdf }) => {
  const { useAppStore, createEmptyPlan } = await import('/src/store/appStore.ts')
  const db = await import('/src/db/database.ts')
  const plan = createEmptyPlan('Apartment A · Demo', 'BetterCalc_Demo_Apartment_A_Floor_Plan.pdf', 'marketing-demo')
  plan.id = 'marketing-demo-plan'
  plan.pages = fixture.pages
  plan.rooms = fixture.rooms.slice(0, 3).map((r, i) => ({ ...r, apartmentNumber: 'A', notes: '', openings: [], workItems: [{ id: `marketing-floor-${i}`, type: 'tiling', tilingCategory: 'regular', wastePercent: 0 }] }))
  await db.saveProject({ id: 'marketing-demo', name: 'BetterCalc · Demo', planIds: [plan.id], comparisonIds: [], createdAt: Date.now(), updatedAt: Date.now() })
  await db.savePlan(plan)
  await db.savePdfBlob(plan.id, new Blob([Uint8Array.from(atob(pdf), c => c.charCodeAt(0))], { type: 'application/pdf' }))
  await useAppStore.getState().openPlan(plan.id)
}, { fixture: LEGACY_PLAN, pdf: pdf.toString('base64') })
await page.locator('.pdf-viewport canvas').first().waitFor({ state: 'visible' })
await page.waitForTimeout(1600)

const base = await page.evaluate(async () => {
  const { useAppStore } = await import('/src/store/appStore.ts')
  return useAppStore.getState().project
})
const manifest = { productUrl: url, plan: 'demo/assets/BetterCalc_Demo_Apartment_A_Floor_Plan.pdf', viewport: { width: 1440, height: 960 }, states: {} }
await page.locator('.top-bar').screenshot({ path: path.join(output, 'application-header.png') })
async function capture(mode, stage) {
  await page.waitForTimeout(500)
  await page.mouse.move(1430, 945)
  const name = `${mode}-${stage}`
  await page.locator('.viewer-area').screenshot({ path: path.join(output, `${name}-plan.png`) })
  if (mode === 'stirrups' && stage === 2) await page.locator('.rebar-level svg[aria-label]').first().screenshot({ path: path.join(output, 'stirrups-true-shape.png') })
  if ((mode === 'finishes' || mode === 'stirrups') && stage === 2) await page.locator('.sidebar-content').evaluate(el => { el.scrollTop = el.scrollHeight })
  await page.locator('.sidebar').screenshot({ path: path.join(output, `${name}-inspector.png`) })
  manifest.states[name] = { canvas: await page.locator('.pdf-viewport canvas').first().boundingBox(), viewer: await page.locator('.viewer-area').boundingBox(), text: await page.locator('.sidebar-content').innerText(), plan: await page.evaluate(async () => { const { useAppStore } = await import('/src/store/appStore.ts'); return useAppStore.getState().project }) }
  console.log('Captured', name, manifest.states[name].text.slice(-500))
}
async function show(mode, phase) {
  await page.evaluate(async ({ base, mode, phase }) => {
    const { useAppStore } = await import('/src/store/appStore.ts')
    const { newConcreteElement, newRebarMesh, newRebarStirrup } = await import('/src/lib/structuralMutations.ts')
    const { stirrupTemplate } = await import('/src/lib/stirrupShape.ts')
    const store = useAppStore.getState()
    const room = structuredClone(base.rooms[0])
    const plan = { ...structuredClone(base), rooms: [], concreteElements: [], rebarItems: [] }
    let selectedRoomId = null, selectedConcreteId = null, selectedRebarId = null
    if (mode === 'finishes' && phase > 0) {
      room.workItems = phase === 1 ? [] : [{ id: 'demo-floor', type: 'tiling', tilingCategory: 'regular', wastePercent: 0 }, { id: 'demo-clad', type: 'cladding', heightM: 2.4, wastePercent: 0 }]
      room.openings = phase === 1 ? [] : [{ id: 'demo-door', type: 'door', widthM: 0.9, heightM: 2.1, quantity: 1 }]
      plan.rooms = [room]; selectedRoomId = room.id
    }
    if (mode === 'concrete' && phase > 0) {
      const item = newConcreteElement(plan, 1, 'slab', room.points)
      item.id = 'demo-concrete'; item.mark = 'תקרה · דמו'; item.markManual = true
      if (phase === 2) { item.depthM = 0.2; item.grade = 'B30' }
      plan.concreteElements = [item]; selectedConcreteId = item.id
    }
    if (mode === 'mesh' && phase > 0) {
      const item = newRebarMesh(plan, 1, base.rooms[2].points)
      item.id = 'demo-mesh'; item.mark = 'רשת · דמו'; item.markManual = true
      if (phase === 2) {
        item.bottom = { mode: 'uniform', spec: { diameterMm: 8, spacingM: 0.2 } }
        item.top = { mode: 'uniform', spec: { diameterMm: 8, spacingM: 0.2 } }
        item.sheets = { lengthM: 3, widthM: 2, overlapM: 0.25 }
      }
      plan.rebarItems = [item]; selectedRebarId = item.id
    }
    if (mode === 'stirrups' && phase > 0) {
      const item = newRebarStirrup(plan, 1)
      item.id = 'demo-stirrups'; item.mark = 'חישוק · דמו'; item.markManual = true
      item.diameterMm = 8; item.shape = stirrupTemplate('rectangle', 0.3, 0.5)
      if (phase === 2) item.placements = [{ id: 'demo-distribution', kind: 'line', pageNumber: 1, quantityMode: 'automatic', start: { x: 410, y: 400 }, end: { x: 610, y: 400 }, spacingM: 0.2 }]
      plan.rebarItems = [item]; selectedRebarId = item.id
    }
    useAppStore.setState({ project: plan, drawTarget: mode === 'finishes' ? 'room' : mode === 'concrete' ? 'concrete' : 'rebar', selectedRoomId, selectedConcreteId, selectedRebarId, selectedStirrupPlacementId: null, selectedDrawnBarId: null, toolMode: 'select', quantitiesOpen: false })
    if (mode === 'mesh') {
      const { useMeshLayoutPreviewStore } = await import('/src/store/meshLayoutPreviewStore.ts')
      useMeshLayoutPreviewStore.getState().setEnabled(plan.id, 'demo-mesh', phase === 2)
    }
  }, { base, mode, phase })
  await page.waitForTimeout(200)
  await page.locator('.sidebar-content').evaluate(el => { el.scrollTop = 0 })
  if (mode === 'finishes' && phase > 0) {
    const row = page.locator('.room-list li').filter({ hasText: 'חדר הורים' })
    if (await row.count()) await row.first().click()
  }
}
for (const mode of ['finishes', 'concrete', 'mesh', 'stirrups']) {
  for (const phase of [0, 1, 2]) { await show(mode, phase); await capture(mode, phase) }
  if (mode === 'mesh') {
    await page.evaluate(async () => {
      const { useAppStore } = await import('/src/store/appStore.ts')
      const { calculateMeshSheetPlacements } = await import('/src/lib/meshSheetPlacement.ts')
      const s = useAppStore.getState(), mesh = s.project.rebarItems[0]
      const layout = calculateMeshSheetPlacements(mesh, s.project.pages[1].calibration)
      const first = layout.placementsByLevel.bottom[0]
      s.editMeshLayout(mesh.id, 'bottom', { type: 'move', id: first.id, x: first.x + 0.25, y: first.y })
    })
    await capture(mode, 3)
  }
}
// Device images are the actual adaptive UI, in fresh touch contexts, never desktop crops.
await show('finishes', 2)
const devicePlan = await page.evaluate(async () => { const { useAppStore } = await import('/src/store/appStore.ts'); return useAppStore.getState().project })
for (const [device, width, height] of [['tablet', 1024, 768], ['phone', 390, 844]]) {
  const deviceContext = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, hasTouch: true, isMobile: device === 'phone' })
  const devicePage = await deviceContext.newPage()
  await devicePage.goto(url, { waitUntil: 'networkidle' })
  await devicePage.evaluate(async ({ plan, pdf }) => {
    const db = await import('/src/db/database.ts')
    await db.savePlan(plan)
    await db.savePdfBlob(plan.id, new Blob([Uint8Array.from(atob(pdf), c => c.charCodeAt(0))], { type: 'application/pdf' }))
    const { useAppStore } = await import('/src/store/appStore.ts')
    await useAppStore.getState().openPlan(plan.id)
    useAppStore.getState().setSelectedRoomId('r-master')
  }, { plan: devicePlan, pdf: pdf.toString('base64') })
  await devicePage.locator('.pdf-viewport canvas').first().waitFor({ state: 'visible' })
  await devicePage.waitForTimeout(1800)
  if (device === 'tablet') {
    await devicePage.getByRole('button', { name: 'פריטים', exact: true }).first().click()
  } else {
    await devicePage.locator('.mobile-destinations').getByRole('button', { name: 'פריטים', exact: true }).click()
    await devicePage.locator('.phone-review-item').first().click()
  }
  await devicePage.waitForTimeout(400)
  if (device === 'tablet') {
    await devicePage.evaluate(async () => {
      const { useAppStore } = await import('/src/store/appStore.ts')
      const { usePlanFocusStore } = await import('/src/store/planFocusStore.ts')
      const plan = useAppStore.getState().project, room = plan.rooms[0]
      usePlanFocusStore.getState().focus({ planId: plan.id, pageNumber: 1, domain: 'room', itemId: room.id, points: room.points })
    })
    await devicePage.waitForTimeout(300)
  } else {
    await devicePage.locator('.sidebar-content').evaluate(el => { el.scrollTop = el.scrollHeight })
  }
  await devicePage.screenshot({ path: path.join(output, `${device}-real-ui.png`) })
  manifest[device] = { viewport: { width, height }, touch: true, text: await devicePage.locator('body').innerText() }
  console.log('Captured device', device)
  await deviceContext.close()
}
await writeFile(path.join(output, 'capture-manifest.json'), JSON.stringify(manifest, null, 2))
await browser.close()
