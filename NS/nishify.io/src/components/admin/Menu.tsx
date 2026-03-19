'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useMenu, type MenuPlacement, type MenuItem } from '@/hooks/use-menu'

export default function Menu({
  items,
  activeKey,
  placement = 'left',
  mobile = true,
  title = 'Entities',
  onItemClick,
}: {
  items: MenuItem[]
  activeKey?: string
  placement?: MenuPlacement
  mobile?: boolean
  title?: string
  onItemClick?: (key: string) => void
}) {
  const m = useMenu({ items, activeKey, placement })

  const renderItems = () => (
    <nav className={m.layout.list}>
      {m.items.map((it) => {
        const active = it.key === m.activeKey
        const className = [
          m.layout.item,
          active ? m.layout.active : '',
        ].join(' ')
        const content = (
          <span className="inline-flex items-center gap-2">
            {it.icon}
            {it.label}
          </span>
        )
        if (it.href) {
          return (
            <Link
              key={it.key}
              href={it.href as any}
              className={className}
              onClick={() => onItemClick?.(it.key)}
            >
              {content}
            </Link>
          )
        }
        return (
          <button
            key={it.key}
            className={className + ' w-full text-left'}
            onClick={() => onItemClick?.(it.key)}
          >
            {content}
          </button>
        )
      })}
    </nav>
  )

  // Desktop rails (left/right) or bars (top/bottom)
  const Desktop = (
    <aside
      className={
        (placement === 'left' || placement === 'right'
          ? 'hidden md:block '
          : '') + m.layout.container
      }
    >
      {(placement === 'left' || placement === 'right') && (
        <div className="mb-2 text-sm font-semibold">{title}</div>
      )}
      {renderItems()}
    </aside>
  )

  // Mobile overlay for vertical placements only
  const Mobile =
    mobile && (placement === 'left' || placement === 'right') ? (
      <>
        <div className="md:hidden px-4 py-2">
          <Button size="sm" variant="outline" onClick={() => m.setOpen(true)}>
            Menu
          </Button>
        </div>
        {m.open && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => m.setOpen(false)}
            />
            <div
              className={
                'relative z-50 h-full w-72 transform border-r bg-background p-4 shadow-lg transition-transform'
              }
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold">{title}</div>
                <Button size="sm" variant="ghost" onClick={() => m.setOpen(false)}>
                  Close
                </Button>
              </div>
              {renderItems()}
            </div>
          </div>
        )}
      </>
    ) : null

  // For top/bottom placements, we render a full-width bar
  if (placement === 'top' || placement === 'bottom') {
    return (
      <div className={m.layout.container}>
        {renderItems()}
      </div>
    )
  }

  return (
    <>
      {Mobile}
      {Desktop}
    </>
  )
}
