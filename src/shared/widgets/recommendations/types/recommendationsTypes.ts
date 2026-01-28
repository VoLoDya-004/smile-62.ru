import type { CSSProperties, PointerEvent } from 'react'


export interface IScrollHandlers {
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void
  onPointerLeave: () => void
  onPointerUp: () => void
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void
  style: CSSProperties
}