import { CompanyLogo } from 'app/components/company-logo'
import { Reveal } from 'app/components/reveal'
import { formatRange } from 'app/components/timeline'
import { schools } from 'app/data/profile'

export const metadata = {
  title: 'Education',
  description: 'École 42 Paris and the Audencia EMERGE entrepreneurship program.',
}

export default function Education() {
  return (
    <section>
      <h1 className="anim-rise font-serif text-4xl tracking-tight mb-3">Education</h1>
      <p className="anim-rise muted mb-10" style={{ ['--i' as string]: 1 }}>
        A peer-to-peer computer science school, then an entrepreneurship program to learn the
        business side.
      </p>

      {schools.map((school) => (
        <section key={school.slug} className="mb-12" aria-labelledby={school.slug}>
          <h2 id={school.slug} className="kicker">{school.program}</h2>
          <Reveal>
            <div className="anim-rise flex items-center gap-3 mb-1">
              <CompanyLogo company={school.name} logo={school.logo} size={28} />
              <h3 className="font-serif text-2xl">{school.name}</h3>
              <span className="ml-auto text-xs faint tabular-nums">
                {formatRange(school.start, school.end)}
              </span>
            </div>
            <p className="anim-rise mb-4" style={{ ['--i' as string]: 1 }}>
              {school.summary}
            </p>
            <ul className="mb-4">
              {school.facts.map((fact, i) => (
                <li
                  key={fact}
                  className="anim-rise py-2 rule-b text-sm muted"
                  style={{ ['--i' as string]: i + 2 }}
                >
                  {fact}
                </li>
              ))}
            </ul>

            {school.projects && (
              <>
                <h4 className="text-xs uppercase tracking-widest faint mt-6 mb-3">
                  Projects on GitHub
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {school.projects.map((project, i) => (
                    <li key={project.href} className="anim-rise" style={{ ['--i' as string]: i }}>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card group h-full"
                      >
                        <span className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold group-hover:text-[color:var(--accent)] transition-colors">
                            {project.name}
                          </span>
                          <span className="text-xs faint">{project.language}</span>
                          <span className="arrow ml-auto text-xs">↗</span>
                        </span>
                        <span className="block text-sm muted">{project.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="text-xs faint mt-4">
              Sources:{' '}
              {school.sources.map((source, i) => (
                <span key={source.href}>
                  {i > 0 && ', '}
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="link">
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
          </Reveal>
        </section>
      ))}

    </section>
  )
}
