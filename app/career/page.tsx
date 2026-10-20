import Link from 'next/link'
import { CompanyLogo } from 'app/components/company-logo'
import { Reveal } from 'app/components/reveal'
import { StackMatrix } from 'app/components/stack-matrix'
import { Timeline, firstRoleYear, formatRange } from 'app/components/timeline'
import { roles, stages } from 'app/data/profile'

export const metadata = {
  title: 'Career',
  description: 'Six years of frontend work at DAFi, Accor, Crédit Agricole, Back Market, Matchem and Fifteen.',
}

export default function Career() {
  return (
    <section>
      <h1 className="anim-rise font-serif text-4xl tracking-tight mb-3">Career</h1>
      <p className="anim-rise muted mb-10" style={{ ['--i' as string]: 1 }}>
        Six companies since {firstRoleYear()}, from startups to a group with 160,000 employees,
        in six sectors. Each page has the use cases, the numbers and screens of the product.
      </p>

      <section className="mb-12" aria-labelledby="range">
        <h2 id="range" className="kicker">Range</h2>
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--rule)] border border-[var(--rule)] rounded-md overflow-hidden">
            {stages.map((stage, i) => (
              <div key={stage} className="anim-rise bg-[var(--paper)] p-3" style={{ ['--i' as string]: i }}>
                <p className="text-xs uppercase tracking-widest faint mb-2">{stage}</p>
                <ul className="space-y-2">
                  {roles
                    .filter((role) => role.stage === stage)
                    .map((role) => (
                      <li key={role.slug}>
                        <Link
                          href={`/career/${role.slug}`}
                          className="group flex items-center gap-2 text-sm"
                        >
                          <CompanyLogo company={role.company} logo={role.logo} size={18} />
                          <span className="min-w-0">
                            <span className="block leading-tight group-hover:text-[color:var(--accent)] transition-colors">
                              {role.company}
                            </span>
                            <span className="block text-xs faint">{role.sector}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mb-12" aria-labelledby="roles">
        <h2 id="roles" className="kicker">Roles</h2>
        <Reveal>
          <ul className="grid sm:grid-cols-2 gap-3">
            {roles.map((role, i) => (
              <li key={role.slug} className="anim-rise" style={{ ['--i' as string]: i }}>
                <Link href={`/career/${role.slug}`} className="card group h-full">
                  <span className="flex items-center gap-2 mb-2">
                    <CompanyLogo company={role.company} logo={role.logo} size={22} />
                    <span className="font-serif text-xl group-hover:text-[color:var(--accent)] transition-colors">
                      {role.company}
                    </span>
                    <span className="arrow-right ml-auto">→</span>
                  </span>
                  <span className="block text-sm">{role.title}</span>
                  <span className="block text-xs faint tabular-nums mb-2">
                    {formatRange(role.start, role.end)} · {role.stage} · {role.sector}
                  </span>
                  <span className="block text-sm">
                    <span className="font-semibold tabular-nums">{role.headline.value}</span>{' '}
                    <span className="muted">{role.headline.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mb-12" aria-labelledby="timeline">
        <h2 id="timeline" className="kicker">Timeline</h2>
        <Reveal>
          <Timeline />
        </Reveal>
      </section>

      <section className="mb-12" aria-labelledby="stack">
        <h2 id="stack" className="kicker">Stack by role</h2>
        <Reveal>
          <StackMatrix />
        </Reveal>
      </section>
    </section>
  )
}
