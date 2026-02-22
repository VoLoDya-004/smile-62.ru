import type { CSSProperties, PointerEvent } from 'react'

export interface IScrollHandlers {
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void
  onPointerLeave: (e: PointerEvent<HTMLDivElement>) => void
  onPointerUp: (e: PointerEvent<HTMLDivElement>) => void
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void
  style: CSSProperties
}