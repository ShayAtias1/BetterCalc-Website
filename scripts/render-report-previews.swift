// Renders web previews of the real QTO report export with PDFKit (macOS).
// Usage: swift scripts/render-report-previews.swift
// Output: public/assets/report-previews/*.{png,avif} — derived 1:1 from assets-source/reports/{qto,compare}-report.pdf.
import AppKit
import PDFKit

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let outDir = root.appendingPathComponent("public/assets/report-previews")
try? FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)

func open(_ name: String) -> PDFDocument {
  let url = root.appendingPathComponent("assets-source/reports/\(name)")
  guard let doc = PDFDocument(url: url) else { fatalError("Cannot open \(url.path)") }
  return doc
}

/// Render `region` (PDF points, origin top-left) of a page at `scale` into a PNG.
func render(_ doc: PDFDocument, page index: Int, scale: CGFloat, region: CGRect? = nil, name: String) {
  let page = doc.page(at: index)!
  let box = page.bounds(for: .mediaBox)
  let r = region ?? CGRect(x: 0, y: 0, width: box.width, height: box.height)
  // Even pixel dimensions: the system AVIF encoder writes undecodable files for odd sizes.
  let w = Int(r.width * scale) / 2 * 2, h = Int(r.height * scale) / 2 * 2
  // Opaque RGB (no alpha channel): AVIF encoders can otherwise emit a transparent alpha plane.
  let cg = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0,
                     space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
  cg.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
  cg.fill(CGRect(x: 0, y: 0, width: w, height: h))
  cg.scaleBy(x: scale, y: scale)
  // PDF space is bottom-left; shift so the requested top-left region lands at the origin.
  cg.translateBy(x: -r.minX, y: -(box.height - r.maxY))
  page.draw(with: .mediaBox, to: cg)
  let rep = NSBitmapImageRep(cgImage: cg.makeImage()!)
  let url = outDir.appendingPathComponent(name)
  try! rep.representation(using: .png, properties: [:])!.write(to: url)
  // Lightweight AVIF alongside the PNG fallback (served through <picture>).
  let avif = Process()
  avif.executableURL = URL(fileURLWithPath: "/usr/bin/sips")
  avif.arguments = ["-s", "format", "avif", "-s", "formatOptions", "80", url.path, "--out", url.deletingPathExtension().appendingPathExtension("avif").path]
  avif.standardOutput = FileHandle.nullDevice
  try! avif.run()
  avif.waitUntilExit()
  print(name, w, "x", h)
}

let qto = open("qto-report.pdf")
render(qto, page: 0, scale: 0.5, name: "qto-report-p1.png")
// Readable detail of page 2: title, room rows and the apartment total (right-hand, RTL columns).
render(qto, page: 1, scale: 2, region: CGRect(x: 1082, y: 14, width: 488, height: 412), name: "qto-report-p2-detail.png")

let compare = open("compare-report.pdf")
// Page 1: the documented comparison — both plans, legend and the two numbered change marks.
render(compare, page: 0, scale: 0.6, name: "compare-report-p1.png")
// Page 2: the change schedule (title, both items, per-type totals and the grand total).
render(compare, page: 1, scale: 1.6, region: CGRect(x: 36, y: 14, width: 1128, height: 278), name: "compare-report-p2-table.png")
