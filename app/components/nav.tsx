'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { piano } from 'app/data/profile'

const navItems = {
  '/': {
    name: 'home',
  },
  '/career': {
    name: 'career',
  },
  '/education': {
    name: 'education',
  },
  ...(piano.length > 0 ? { '/piano': { name: 'piano' } } : {}),
  '/blog': {
    name: 'blog',
  },
}

function isActive(pathname: string, path: string) {
  return path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`)
}

// Full-width sticky bar; the translucent paper + blur lets content scroll under it
export function Navbar() {
  let pathname = usePathname()

  return (
    <header className="nav-blur sticky top-0 z-40 mb-10">
      <nav
        id="nav"
        className="max-w-2xl mx-4 md:mx-auto px-2 md:px-0 h-14 flex items-center tracking-tight text-sm"
      >
        <ul className="flex -ml-2">
          {Object.entries(navItems).map(([path, { name }]) => {
            let active = isActive(pathname, path)
            return (
              <li key={path}>
                <Link
                  href={path}
                  aria-current={active ? 'page' : undefined}
                  className={`nav-link block py-1 px-2 transition-colors hover:text-[color:var(--accent)] ${
                    active ? 'nav-link-active' : 'muted'
                  }`}
                >
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
