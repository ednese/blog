import Image from 'next/image'
import type { Screen } from 'app/data/profile'

export function BrowserFrame({ screen, priority }: { screen: Screen; priority?: boolean }) {
  let host = screen.href ? new URL(screen.href).host : undefined
  let frame = (
    <div className="screen-frame overflow-hidden rounded-md border border-[var(--rule)] bg-[var(--paper)]">
      <div className="flex items-center gap-1.5 px-3 h-7 border-b border-[var(--rule)]" aria-hidden>
        <span className="w-2 h-2 rounded-full bg-[var(--rule)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--rule)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--rule)]" />
        {host && <span className="ml-2 text-[11px] faint truncate">{host}</span>}
      </div>
      <Image
        src={screen.src}
        alt={screen.alt}
        width={1265}
        height={800}
        sizes="(min-width: 768px) 672px, 100vw"
        className="w-full h-auto"
        priority={priority}
      />
    </div>
  )

  return (
    <figure className="anim-rise">
      {screen.href ? (
        <a href={screen.href} target="_blank" rel="noopener noreferrer" className="block group">
          {frame}
        </a>
      ) : (
        frame
      )}
      <figcaption className="text-xs faint mt-2">{screen.caption}</figcaption>
    </figure>
  )
}
