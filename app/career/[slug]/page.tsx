import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BrowserFrame } from 'app/components/browser-frame'
import { ChartBlock, StatGrid } from 'app/components/charts'
import { CompanyLogo } from 'app/components/company-logo'
import { Reveal } from 'app/components/reveal'
import { formatRange } from 'app/components/timeline'
import { TechIcon, findTech } from 'app/components/tech-icon'
import { roles } from 'app/data/profile'

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }))
}

export async function generateMetadata({ params }) {
  let { slug } = await params
  let role = roles.find((r) => r.slug === slug)
  if (!role) {
    return
  }

  return {
    title: `${role.company} · ${role.title}`,
    description: role.summary,
  }
}

export default async function Role({ params }) {
  let { slug } = await params
  let index = roles.findIndex((r) => r.slug === slug)
  if (index === -1) {
    notFound()
  }
  let role = roles[index]
  // Roles are newest first: "next" goes back in time
  let newer = roles[index - 1]
  let older = roles[index + 1]

  return (
    <article>
      <Link href="/career" className="anim-rise text-xs faint link mb-6 inline-block">
        ← Career
      </Link>

      <header className="mb-10">
        <div className="anim-rise flex items-center gap-3 mb-2" style={{ ['--i' as string]: 1 }}>
          <CompanyLogo company={role.company} logo={role.logo} size={32} />
          <h1 className="font-serif text-4xl tracking-tight">{role.company}</h1>
        </div>
        <p className="anim-rise text-sm muted mb-4" style={{ ['--i' as string]: 2 }}>
          {role.title} · {role.contract} · {role.stage}, {role.sector.toLowerCase()} · {role.location} ·{' '}
          <span className="tabular-nums">{formatRange(role.start, role.end)}</span>
        </p>
        <p className="anim-rise text-lg leading-snug" style={{ ['--i' as string]: 3 }}>
          {role.summary}
        </p>
      </header>

      {role.scale && (
        <section className="mb-10" aria-labelledby="company">
          <h2 id="company" className="kicker">The company</h2>
          <Reveal>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
              {role.scale.map((fact, i) => (
                <div key={fact.label} className="anim-rise flex flex-col" style={{ ['--i' as string]: i }}>
                  <dt className="text-sm leading-snug mt-1">{fact.label}</dt>
                  <dd className="order-first text-2xl font-semibold tracking-tight tabular-nums">
                    {fact.value}
                  </dd>
                  <dd className="text-xs mt-0.5">
                    <a
                      href={fact.source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link faint"
                    >
                      {fact.source.label}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>
      )}

      {(role.stats.length > 0 || role.charts) && (
        <section className="mb-10" aria-labelledby="numbers">
          <h2 id="numbers" className="kicker">My work, in numbers</h2>
          <Reveal>
            <StatGrid stats={role.stats} />
            {role.charts && (
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8 mt-8">
                {role.charts.map((chart) => (
                  <div
                    key={chart.label}
                    className={`anim-rise ${chart.kind === 'compare' ? 'sm:col-span-2' : ''}`}
                  >
                    <ChartBlock chart={chart} />
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </section>
      )}

      {role.screens && (
        <section className="mb-10" aria-labelledby="screens">
          <h2 id="screens" className="kicker">Product</h2>
          <Reveal className="space-y-6">
            {role.screens.map((screen) => (
              <BrowserFrame key={screen.src} screen={screen} />
            ))}
          </Reveal>
        </section>
      )}

      <section className="mb-10" aria-labelledby="use-cases">
        <h2 id="use-cases" className="kicker">Use cases</h2>
        <Reveal>
          <ul className="grid sm:grid-cols-2 gap-x-6">
            {role.useCases.map((useCase, i) => (
              <li
                key={useCase.title}
                className="anim-rise row-hover py-3 rule-b"
                style={{ ['--i' as string]: i }}
              >
                <h3 className="font-semibold text-sm mb-1">{useCase.title}</h3>
                <p className="text-sm muted">{useCase.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        {role.note && <p className="text-xs faint mt-3">{role.note}</p>}
      </section>

      <section className="mb-10" aria-labelledby="stack">
        <h2 id="stack" className="kicker">Stack</h2>
        <ul className="flex flex-wrap gap-2">
          {role.stack.map((tool) => {
            let tech = findTech(tool)
            return (
              <li
                key={tool}
                className="flex items-center gap-1.5 text-xs px-2 py-1 rounded border border-[var(--rule)] transition-colors hover:border-[var(--ink-3)]"
              >
                {tech && <TechIcon tech={tech} size={12} />}
                {tool}
              </li>
            )
          })}
        </ul>
        {role.links && (
          <p className="text-sm mt-4 flex gap-4">
            {role.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="link">
                {link.label} <span className="arrow">↗</span>
              </a>
            ))}
          </p>
        )}
      </section>

      <nav className="flex justify-between gap-4 text-sm pt-4 border-t-2 border-[var(--ink)] mb-6">
        {newer ? (
          <Link href={`/career/${newer.slug}`} className="group">
            <span className="block text-xs faint">Newer</span>
            <span className="group-hover:text-[color:var(--accent)] transition-colors">← {newer.company}</span>
          </Link>
        ) : (
          <span />
        )}
        {older && (
          <Link href={`/career/${older.slug}`} className="group text-right">
            <span className="block text-xs faint">Older</span>
            <span className="group-hover:text-[color:var(--accent)] transition-colors">{older.company} →</span>
          </Link>
        )}
      </nav>

      <p className="text-xs faint pb-12">
        {role.slug === 'fifteen' ? (
          <>
            Details from an earlier version of my CV.
          </>
        ) : (
          <>
            Figures from my CV.{role.sourceNote && ` ${role.sourceNote}`}
          </>
        )}
      </p>
    </article>
  )
}
