import Link from 'next/link'
import { roles } from 'app/data/profile'
import { CompanyLogo } from 'app/components/company-logo'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function toIndex(ym: string) {
  let [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}

function formatMonth(ym: string) {
  let [y, m] = ym.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

export function formatRange(start: string, end?: string) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'present'}`
}

export function firstRoleYear() {
  return Math.min(...roles.map((r) => Number(r.start.slice(0, 4))))
}

export function Timeline() {
  let now = new Date()
  let today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  let min = Math.min(...roles.map((r) => toIndex(r.start)))
  let max = toIndex(today) + 1
  let span = max - min
  let pct = (i: number) => ((i - min) / span) * 100

  let firstYear = Math.ceil(min / 12)
  let lastYear = Math.floor(max / 12)
  let years: number[] = []
  for (let y = firstYear; y <= lastYear; y++) years.push(y)

  return (
    <figure>
      <div className="flex gap-4 mb-3 text-xs muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-2 rounded-[2px] bg-[var(--series-current)]" />
          Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-2 rounded-[2px] bg-[var(--series-past)]" />
          Past
        </span>
      </div>

      <div className="relative">
        {/* Year gridlines sit behind the tracks, offset by the label column */}
        <div className="absolute inset-y-0 left-[8.5rem] right-0 pointer-events-none" aria-hidden>
          {years.map((y) => (
            <div
              key={y}
              className="absolute inset-y-0 border-l border-[var(--rule)]"
              style={{ left: `${pct(y * 12)}%` }}
            />
          ))}
        </div>

        <ul className="dim-siblings">
          {roles.map((role, i) => {
            let left = pct(toIndex(role.start))
            let right = pct(role.end ? toIndex(role.end) + 1 : max)
            let current = !role.end
            return (
              <li key={role.company} className="flex items-center h-9">
                <Link
                  href={`/career/${role.slug}`}
                  className="w-[8.5rem] shrink-0 pr-2 flex items-center gap-2 text-sm min-w-0 hover:text-[color:var(--accent)] transition-colors"
                >
                  <CompanyLogo company={role.company} logo={role.logo} size={18} />
                  <span className="truncate">{role.company}</span>
                </Link>
                <div className="relative flex-1 h-full">
                  <div
                    tabIndex={0}
                    className="group absolute top-1/2 -translate-y-1/2 h-3.5 outline-none"
                    style={{ left: `${left}%`, width: `${right - left}%` }}
                    aria-label={`${role.company}, ${role.title}, ${formatRange(role.start, role.end)}`}
                  >
                    <span
                      className="bar anim-grow block h-full rounded-r-[4px] group-focus-visible:ring-2 ring-[var(--ink)]"
                      style={{
                        background: current ? 'var(--series-current)' : 'var(--series-past)',
                        ['--i' as string]: roles.length - 1 - i,
                      }}
                    />
                    {/* Taller invisible hit area */}
                    <span className="absolute -inset-y-2 inset-x-0" />
                    <div
                      role="tooltip"
                      className="tooltip hidden group-hover:block group-focus:block absolute z-10 top-full mt-2 w-64 max-w-[70vw] p-3 text-xs bg-[var(--paper)] border border-[var(--rule)] shadow-sm"
                      style={left > 30 ? { right: 0 } : { left: 0 }}
                    >
                      <p className="font-semibold text-[color:var(--ink)]">{role.title}</p>
                      <p className="muted tabular-nums mb-1">{formatRange(role.start, role.end)}</p>
                      <p className="faint">{role.stack.join(' · ')}</p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="flex h-5 ml-[8.5rem] relative text-xs faint tabular-nums" aria-hidden>
          {years.map((y) => (
            <span key={y} className="absolute -translate-x-1/2" style={{ left: `${pct(y * 12)}%` }}>
              {y}
            </span>
          ))}
        </div>
      </div>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer faint text-xs hover:text-[color:var(--ink)] transition-colors">
          Show as table
        </summary>
        <table className="mt-2 w-full text-left text-sm">
          <thead className="faint text-xs">
            <tr>
              <th className="py-1 pr-4 font-normal">Company</th>
              <th className="py-1 pr-4 font-normal">Role</th>
              <th className="py-1 font-normal">Dates</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.company} className="border-t border-[var(--rule)]">
                <td className="py-1 pr-4">{role.company}</td>
                <td className="py-1 pr-4 muted">{role.title}</td>
                <td className="py-1 muted tabular-nums">{formatRange(role.start, role.end)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  )
}
