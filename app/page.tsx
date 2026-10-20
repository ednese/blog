import Image from 'next/image'
import Link from 'next/link'
import { CompanyLogo } from 'app/components/company-logo'
import { Reveal } from 'app/components/reveal'
import { formatRange } from 'app/components/timeline'
import { getBlogPosts } from 'app/blog/utils'
import { featuredPostSlug, links, piano, roles, schools, strengths } from 'app/data/profile'

export default function Page() {
  let featured = getBlogPosts().find((post) => post.slug === featuredPostSlug)

  return (
    <section>
      <header className="flex flex-col-reverse sm:flex-row gap-6 mb-12">
        <div className="flex-1">
          <h1 className="anim-rise font-serif text-4xl tracking-tight mb-3">Evan Sende</h1>
          <p className="anim-rise mb-3 text-lg leading-snug" style={{ ['--i' as string]: 1 }}>
            Frontend engineer with 6 years of experience. Freelance at Accor on the
            all.accor.com booking funnel, and founding frontend engineer at DAFi, an AI
            note-taking app for students.
          </p>
          <p className="anim-rise mb-4 muted" style={{ ['--i' as string]: 2 }}>
            I build the tooling around AI models so teams get more out of them.
            Based in Paris, moving to Toronto in January 2027.
          </p>
          <ul
            className="anim-rise flex flex-wrap gap-x-4 gap-y-1 text-sm"
            style={{ ['--i' as string]: 3 }}
          >
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="link"
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="/profilepicture.jpeg"
          alt="Evan Sende"
          width={112}
          height={112}
          className="anim-rise portrait rounded-full w-[112px] h-[112px] object-cover shrink-0"
          priority
        />
      </header>

      <section className="mb-12" aria-labelledby="profile">
        <h2 id="profile" className="kicker">The profile</h2>
        <Reveal>
          <ul className="dim-siblings">
            {strengths.map((item, i) => (
              <li key={item.title} className="anim-rise" style={{ ['--i' as string]: i }}>
                <Link href={item.href} className="group flex items-baseline gap-4 py-2.5 rule-b text-sm">
                  <span className="w-28 shrink-0 font-semibold group-hover:text-[color:var(--accent)] transition-colors">
                    {item.title}
                  </span>
                  <span className="muted flex-1">{item.text}</span>
                  <span className="arrow-right">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mb-12" aria-labelledby="career">
        <h2 id="career" className="kicker flex justify-between">
          Career
          <Link href="/career" className="link normal-case tracking-normal font-normal">
            Timeline and stack <span className="arrow-right inline-block">→</span>
          </Link>
        </h2>
        <Reveal>
          <ul className="dim-siblings">
            {roles.map((role, i) => (
              <li key={role.slug} className="anim-rise" style={{ ['--i' as string]: i }}>
                <Link
                  href={`/career/${role.slug}`}
                  className="group flex items-center gap-3 py-2.5 rule-b text-sm"
                >
                  <CompanyLogo company={role.company} logo={role.logo} size={22} />
                  <span className="flex-1 min-w-0">
                    <span className="block">
                      <span className="font-medium group-hover:text-[color:var(--accent)] transition-colors">
                        {role.company}
                      </span>{' '}
                      <span className="muted">{role.title}</span>
                    </span>
                    <span className="block text-xs faint tabular-nums">
                      {formatRange(role.start, role.end)}
                    </span>
                  </span>
                  <span className="text-right shrink-0">
                    <span className="block font-semibold tabular-nums">{role.headline.value}</span>
                    <span className="block text-xs faint">{role.headline.label}</span>
                  </span>
                  <span className="arrow-right">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mb-12" aria-labelledby="more">
        <h2 id="more" className="kicker">More</h2>
        <Reveal>
          <ul className="grid sm:grid-cols-2 gap-3 [&>li]:min-w-0">
            {featured && (
              <li className="anim-rise sm:col-span-2">
                <Link href={`/blog/${featured.slug}`} className="card group">
                  <span className="block text-xs uppercase tracking-widest faint mb-1">Latest essay</span>
                  <span className="block font-serif text-2xl leading-tight group-hover:text-[color:var(--accent)] transition-colors">
                    {featured.metadata.title} <span className="arrow-right text-lg">→</span>
                  </span>
                  <span className="block text-sm muted mt-1">{featured.metadata.summary}</span>
                </Link>
              </li>
            )}
            <li className="anim-rise" style={{ ['--i' as string]: 1 }}>
              <Link href="/education" className="card group h-full">
                <span className="block text-xs uppercase tracking-widest faint mb-2">Education</span>
                <span className="flex flex-col gap-1.5">
                  {schools.map((school) => (
                    <span key={school.slug} className="flex items-center gap-2 text-sm">
                      <CompanyLogo company={school.name} logo={school.logo} size={18} />
                      <span className="group-hover:text-[color:var(--accent)] transition-colors">
                        {school.name}
                      </span>
                      <span className="faint truncate">{school.program}</span>
                    </span>
                  ))}
                </span>
              </Link>
            </li>
            <li className="anim-rise" style={{ ['--i' as string]: 2 }}>
              {piano.length > 0 ? (
                <Link href="/piano" className="card group h-full">
                  <span className="block text-xs uppercase tracking-widest faint mb-2">Outside work</span>
                  <span className="block text-sm group-hover:text-[color:var(--accent)] transition-colors">
                    Piano videos <span className="arrow-right">→</span>
                  </span>
                </Link>
              ) : (
                <Link href="/blog" className="card group h-full">
                  <span className="block text-xs uppercase tracking-widest faint mb-2">Writing</span>
                  <span className="block text-sm group-hover:text-[color:var(--accent)] transition-colors">
                    All posts <span className="arrow-right">→</span>
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </Reveal>
      </section>

      <footer className="text-xs faint pb-12">
        Company figures are public, with a source link for each one on its career page.
        What I did comes from my CV (an earlier version for Fifteen), the education dates
        from{' '}
        <a
          href="https://www.linkedin.com/in/evan-sende/"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          LinkedIn
        </a>
        , and DAFi usage from its admin dashboard.
      </footer>
    </section>
  )
}
