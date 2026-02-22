import { useRef, useState, useCallback } from 'react'

interface IUseDragScrollOptions {
  ignoreElements?: string
  speed?: number
  onScroll?: (scrollLeft: number) => void
}

export const useDragScroll = (options: IUseDragScrollOptions = {}) => {
  const { ignoreElements = 'button, select, a, input, textarea', speed = 1.5, onScroll } = options

  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftStart, setScrollLeftStart] = useState(0)

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    
    const target = e.target as HTMLElement
    if (target.closest(ignoreElements)) return

    e.preventDefault()
    setIsDragging(true)
    setStartX(e.clientX - (containerRef.current?.offsetLeft || 0))
    setScrollLeftStart(containerRef.current?.scrollLeft || 0)
    document.body.style.userSelect = 'none'
    containerRef.current?.setPointerCapture(e.pointerId)
  }, [ignoreElements])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()

    const x = e.clientX - (containerRef.current.offsetLeft || 0)
    const walk = (x - startX) * speed
    const newScrollLeft = scrollLeftStart - walk
    containerRef.current.scrollLeft = newScrollLeft
    onScroll?.(newScrollLeft)
  }, [isDragging, startX, scrollLeftStart, speed, onScroll])

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    document.body.style.userSelect = ''
    containerRef.current?.releasePointerCapture(e.pointerId)
  }, [isDragging])

  const handlePointerLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setIsDragging(false)
    document.body.style.userSelect = ''
    containerRef.current?.releasePointerCapture(e.pointerId)
  }, [isDragging])

  return {
    containerRef,
    isDragging,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerLeave
    }
  }
}