import type { Chart, Stat } from 'app/data/profile'

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl
      className={`grid grid-cols-2 gap-x-6 gap-y-5 ${
        stats.length === 4 ? 'sm:grid-cols-4' : stats.length < 3 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
      }`}
    >
      {stats.map((stat, i) => (
        <div key={stat.label} className="anim-rise flex flex-col" style={{ ['--i' as string]: i }}>
          <dt className="text-sm leading-snug mt-1">{stat.label}</dt>
          <dd className="order-first text-2xl font-semibold tracking-tight tabular-nums">
            {stat.value}
          </dd>
          {stat.source && <dd className="text-xs faint mt-0.5">{stat.source}</dd>}
        </div>
      ))}
    </dl>
  )
}

function Meter({ chart }: { chart: Extract<Chart, { kind: 'meter' }> }) {
  return (
    <figure>
      <figcaption className="flex justify-between gap-4 text-sm mb-2">
        <span className="muted">{chart.label}</span>
        <span className="font-semibold tabular-nums">{chart.display}</span>
      </figcaption>
      <div
        className="relative h-2.5 rounded-[4px] bg-[color-mix(in_oklab,var(--series-past)_18%,transparent)]"
        role="img"
        aria-label={`${chart.label}: ${chart.display}`}
      >
        <div
          className="anim-grow absolute inset-y-0 left-0 rounded-[4px] bg-[var(--series-past)]"
          style={{ width: `${chart.value}%` }}
        />
        {chart.from !== undefined && (
          <div
            className="absolute -inset-y-1 w-0.5 bg-[var(--ink)]"
            style={{ left: `${chart.from}%` }}
            title={`Before: ${chart.from}%`}
          />
        )}
      </div>
      <div className="flex justify-between text-xs faint mt-1 tabular-nums" aria-hidden>
        <span>0%</span>
        {chart.from !== undefined && <span>marker = before ({chart.from}%)</span>}
        <span>100%</span>
      </div>
    </figure>
  )
}

function Bars({ chart }: { chart: Extract<Chart, { kind: 'bars' }> }) {
  let max = Math.max(...chart.items.map((item) => item.value))
  // Label column fits the longest label, capped so bars keep room
  let labelWidth = `${Math.min(Math.max(...chart.items.map((item) => item.label.length)), 24) * 0.6}rem`
  return (
    <figure>
      <figcaption className="text-sm muted mb-2">{chart.label}</figcaption>
      <ul className="dim-siblings space-y-1.5">
        {chart.items.map((item, i) => {
          let row = (
            <>
              <span
                className="shrink-0 truncate text-[color:var(--ink-2)] group-hover:text-[color:var(--accent)] transition-colors"
                style={{ width: labelWidth, maxWidth: '40%' }}
                title={item.label}
              >
                {item.label}
              </span>
              <span className="flex-1 flex items-center gap-2">
                <span
                  className="bar anim-grow block h-3.5 rounded-r-[4px] bg-[var(--series-past)]"
                  style={{ width: `${(item.value / max) * 85}%`, ['--i' as string]: i }}
                />
                <span className="font-semibold tabular-nums">{item.display}</span>
                {item.href && <span className="arrow text-xs faint">↗</span>}
              </span>
            </>
          )
          return (
            <li key={item.label} className="text-sm">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 hover:text-[color:var(--accent)] transition-colors"
                >
                  {row}
                </a>
              ) : (
                <span className="flex items-center gap-3">{row}</span>
              )}
            </li>
          )
        })}
      </ul>
    </figure>
  )
}

// Two periods side by side on one shared scale
function Compare({ chart }: { chart: Extract<Chart, { kind: 'compare' }> }) {
  let max = Math.max(...chart.items.flatMap((item) => [item.a, item.b]))
  let width = (v: number) => `max(2px, ${(v / max) * 80}%)`
  return (
    <figure>
      <figcaption className="text-sm muted mb-2">{chart.label}</figcaption>
      <div className="flex gap-4 mb-3 text-xs muted">
        {chart.series.map((name, i) => (
          <span key={name} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-2 rounded-[2px]"
              style={{ background: i === 0 ? 'var(--series-past)' : 'var(--series-current)' }}
            />
            {name}
          </span>
        ))}
      </div>
      <ul className="dim-siblings space-y-3">
        {chart.items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-3 text-sm">
            <span className="w-24 shrink-0 muted">{item.label}</span>
            <span className="flex-1 flex flex-col gap-0.5">
              {[item.a, item.b].map((v, j) => (
                <span key={j} className="flex items-center gap-2">
                  <span
                    className="anim-grow block h-2.5 rounded-r-[4px]"
                    style={{
                      width: width(v),
                      background: j === 0 ? 'var(--series-past)' : 'var(--series-current)',
                      ['--i' as string]: i * 2 + j,
                    }}
                    title={`${item.label}, ${chart.series[j]}: ${v.toLocaleString('en-US')}`}
                  />
                  <span className={`text-xs tabular-nums ${j === 1 ? 'font-semibold' : 'faint'}`}>
                    {v.toLocaleString('en-US')}
                  </span>
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  )
}

export function ChartBlock({ chart }: { chart: Chart }) {
  if (chart.kind === 'meter') return <Meter chart={chart} />
  if (chart.kind === 'compare') return <Compare chart={chart} />
  return <Bars chart={chart} />
}
