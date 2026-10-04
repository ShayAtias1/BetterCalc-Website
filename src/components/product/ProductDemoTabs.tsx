import type { KeyboardEvent } from 'react'
import { PRODUCT_DEMOS, type DemoLocale, type DemoMode } from '../../data/productDemo'

type Props = { modes: readonly DemoMode[]; selected: DemoMode; locale: DemoLocale; panelId: string; onSelect: (mode: DemoMode) => void }

export function ProductDemoTabs({ modes, selected, locale, panelId, onSelect }: Props) {
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = event.key === 'ArrowRight' ? (locale === 'he' ? -1 : 1) : event.key === 'ArrowLeft' ? (locale === 'he' ? 1 : -1) : 0
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? modes.length - 1 : delta ? (index + delta + modes.length) % modes.length : null
    if (next === null) return
    event.preventDefault()
    onSelect(modes[next])
    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    buttons?.[next]?.focus()
  }
  return (
    <div className="product-demo-tabs" role="tablist" aria-label={locale === 'he' ? 'בחרו הדגמת מוצר' : 'Choose a product workflow'}>
      {modes.map((mode, index) => <button key={mode} type="button" role="tab" id={`${panelId}-${mode}`} aria-selected={selected === mode} aria-controls={panelId} tabIndex={selected === mode ? 0 : -1} onClick={() => onSelect(mode)} onKeyDown={(event) => navigate(event, index)}>{PRODUCT_DEMOS[mode].label[locale]}</button>)}
    </div>
  )
}
