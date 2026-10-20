import { ChartBlock } from 'app/components/charts'
import { PianoVideoPlayer } from 'app/components/piano-video'
import { Reveal } from 'app/components/reveal'
import { piano, tiktokProfile } from 'app/data/profile'

export const metadata = {
  title: 'Piano',
  description: 'Piano videos: Chopin, film music, jazz, covers and a recital.',
}

export default function Piano() {
  let onTikTok = piano.filter((v) => v.tiktok).sort((a, b) => b.tiktok!.plays - a.tiktok!.plays)
  let plays = onTikTok.reduce((sum, v) => sum + v.tiktok!.plays, 0)
  let likes = onTikTok.reduce((sum, v) => sum + v.tiktok!.likes, 0)
  let largeSeen = 0

  return (
    <section>
      <h1 className="anim-rise font-serif text-4xl tracking-tight mb-3">Piano</h1>
      <p className="anim-rise muted mb-8" style={{ ['--i' as string]: 1 }}>
        What I play when I’m not coding. Short clips are on{' '}
        <a href={tiktokProfile} target="_blank" rel="noopener noreferrer" className="link">
          TikTok
        </a>
        .
      </p>

      <Reveal className="mb-14">
        {/* Every cell is 9:16; large ones span 2×2, which keeps the rows aligned */}
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 [grid-auto-flow:dense]">
          {piano.map((video, i) => {
            let large = video.size === 'lg'
            // Alternate large cells left, then right
            let right = large && largeSeen++ % 2 === 1
            return (
              <li
                key={video.title}
                className={`anim-rise relative aspect-[9/16] ${
                  large ? `col-span-2 row-span-2 ${right ? 'sm:col-start-3' : ''}` : ''
                }`}
                style={{ ['--i' as string]: i }}
              >
                <PianoVideoPlayer video={video} />
              </li>
            )
          })}
        </ul>
      </Reveal>

      <section className="mb-12" aria-labelledby="plays">
        <h2 id="plays" className="kicker">On TikTok</h2>
        <Reveal>
          <dl className="grid grid-cols-3 gap-6 mb-8">
            {[
              { value: onTikTok.length, label: 'Clips' },
              { value: plays, label: 'Plays' },
              { value: likes, label: 'Likes' },
            ].map((stat, i) => (
              <div key={stat.label} className="anim-rise flex flex-col" style={{ ['--i' as string]: i }}>
                <dt className="text-sm mt-1">{stat.label}</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight tabular-nums">
                  {stat.value.toLocaleString('en-US')}
                </dd>
              </div>
            ))}
          </dl>
          <div className="anim-rise">
            <ChartBlock
              chart={{
                kind: 'bars',
                label: 'Plays per clip, as of 20 Oct 2026',
                items: onTikTok.map((v) => ({
                  label: v.title,
                  value: v.tiktok!.plays,
                  display: v.tiktok!.plays.toLocaleString('en-US'),
                  href: `${tiktokProfile}/video/${v.tiktok!.id}`,
                })),
              }}
            />
          </div>
        </Reveal>
      </section>
    </section>
  )
}
