'use client'

import { useEffect, useRef, useState } from 'react'

// Plays the .anim-* children once the block scrolls into view.
// Without JS the attribute is never set, so content stays visible.
export function Reveal({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  let ref = useRef<HTMLDivElement>(null)
  let [state, setState] = useState<'pending' | 'in' | undefined>()

  useEffect(() => {
    let el = ref.current
    if (!el) return
    let observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('in')
          observer.disconnect()
        } else {
          setState((s) => s ?? 'pending')
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-reveal={state} className={className} {...props}>
      {children}
    </div>
  )
}
