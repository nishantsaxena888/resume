import { useMemo, useState } from 'react'
import type { UrlObject } from 'url'

export type MenuItem = {
  key: string
  label?: string
  href?: string | UrlObject
  icon?: React.ReactNode
}

export type MenuPlacement = 'left' | 'right' | 'top' | 'bottom'

export function useMenu(options: {
  items: MenuItem[]
  activeKey?: string
  placement?: MenuPlacement
}) {
  const [open, setOpen] = useState(false)
  const placement = options.placement ?? 'left'
  const activeKey = options.activeKey

  const pretty = (s: string) =>
    s.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())

  const items = useMemo(
    () =>
      (options.items || []).map((it) => ({
        ...it,
        label: it.label ?? pretty(it.key),
      })),
    [options.items]
  )

  const layout = useMemo(() => {
    if (placement === 'left') {
      return {
        container: 'w-60 border-r p-4',
        list: 'space-y-1',
        item: 'block rounded px-2 py-1 text-sm transition-colors hover:bg-muted',
        active: 'bg-muted font-medium',
        direction: 'vertical' as const,
      }
    }
    if (placement === 'right') {
      return {
        container: 'w-60 border-l p-4',
        list: 'space-y-1',
        item: 'block rounded px-2 py-1 text-sm transition-colors hover:bg-muted text-right',
        active: 'bg-muted font-medium',
        direction: 'vertical' as const,
      }
    }
    if (placement === 'top') {
      return {
        container: 'w-full border-b px-4 py-2 flex items-center gap-2 overflow-x-auto',
        list: 'flex items-center gap-1',
        item: 'rounded px-3 py-1.5 text-sm transition-colors hover:bg-muted whitespace-nowrap',
        active: 'bg-muted font-medium',
        direction: 'horizontal' as const,
      }
    }
    return {
      container: 'w-full border-t px-4 py-2 flex items-center gap-2 overflow-x-auto',
      list: 'flex items-center gap-1',
      item: 'rounded px-3 py-1.5 text-sm transition-colors hover:bg-muted whitespace-nowrap',
      active: 'bg-muted font-medium',
      direction: 'horizontal' as const,
    }
  }, [placement])

  return {
    items,
    activeKey,
    placement,
    open,
    setOpen,
    layout,
  }
}
