import type { CSSProperties } from 'react'

type PreviewProps = {
  /** File name without extension in /assets/report-previews (rendered from the real report PDFs). */
  name: string
  width: number
  height: number
  alt: string
  className?: string
  style?: CSSProperties
}

/** A report page preview: AVIF with a PNG fallback, never competing with the first render. */
export function Preview({ name, width, height, alt, className, style }: PreviewProps) {
  const base = `/assets/report-previews/${name}`
  return (
    <picture className="preview">
      <source srcSet={`${base}.avif`} type="image/avif" />
      <img className={className} style={style} src={`${base}.png`} width={width} height={height} alt={alt} loading="lazy" decoding="async" fetchPriority="low" />
    </picture>
  )
}
