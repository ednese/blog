import { stackRows, type Tech } from 'app/data/profile'

// "Nuxt 4" -> "Nuxt", "Vue 3" -> "Vue", "Expo / React Native" -> "React Native"
export function findTech(tool: string): Tech | undefined {
  let names = tool.split(' / ').map((t) => t.replace(/ \d+$/, ''))
  return stackRows.find((tech) => names.includes(tech.name))
}

// Monochrome icons are drawn as a mask so they take the brand color
// (darkened in light mode for contrast, see .brand in global.css)
export function TechIcon({ tech, size = 14 }: { tech: Tech; size?: number }) {
  if (tech.multicolor) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={tech.icon} alt="" width={size} height={size} className="shrink-0" />
  }
  return (
    <span
      aria-hidden
      className="brand-fill inline-block shrink-0"
      style={{
        width: size,
        height: size,
        ['--brand' as string]: tech.color === 'ink' ? 'var(--ink)' : tech.color,
        WebkitMask: `url(${tech.icon}) center / contain no-repeat`,
        mask: `url(${tech.icon}) center / contain no-repeat`,
      }}
    />
  )
}
