'use client'

import { useEffect, useRef, useState } from 'react'
import type { PianoVideo } from 'app/data/profile'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatMonth(ym: string) {
  let [y, m] = ym.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

function safeParse(text: string) {
  try {
    return JSON.parse(text)
  } catch {
    return undefined
  }
}

// Poster first; the TikTok player (or the local file) loads only on click.
// Fills its grid cell, so large and small cells share one component.
export function PianoVideoPlayer({ video }: { video: PianoVideo }) {
  let [playing, setPlaying] = useState(false)
  let frame = useRef<HTMLIFrameElement>(null)
  let large = video.size === 'lg'

  // The TikTok player starts muted; unmute it once it says it's ready.
  // The click that opened it counts as the user gesture for sound.
  useEffect(() => {
    if (!playing || !video.tiktok) return
    let send = (type: string) =>
      frame.current?.contentWindow?.postMessage({ type, 'x-tiktok-player': true }, '*')
    let onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return
      let data = typeof event.data === 'string' ? safeParse(event.data) : event.data
      if (data?.['x-tiktok-player'] && data.type === 'onPlayerReady') {
        send('unMute')
        send('play')
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [playing, video.tiktok])

  if (playing && video.tiktok) {
    return (
      <iframe
        ref={frame}
        src={`https://www.tiktok.com/player/v1/${video.tiktok.id}?autoplay=1&description=0&music_info=0&rel=0`}
        title={video.title}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full rounded-md bg-black"
      />
    )
  }

  if (playing && video.src) {
    return (
      <video
        src={video.src}
        poster={video.poster}
        controls
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full rounded-md bg-black object-cover"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 overflow-hidden rounded-md bg-black text-left"
      aria-label={`Play ${video.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={video.poster}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex items-center justify-center rounded-full bg-white/90 text-black shadow opacity-90 transition-all duration-200 group-hover:scale-110 group-hover:opacity-100 ${
            large ? 'w-16 h-16' : 'w-11 h-11'
          }`}
        >
          <svg width={large ? 20 : 14} height={large ? 20 : 14} viewBox="0 0 16 16" aria-hidden>
            <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
          </svg>
        </span>
      </span>
      <span className={`absolute inset-x-0 bottom-0 text-white ${large ? 'p-4' : 'p-2.5'}`}>
        <span className="block text-[10px] uppercase tracking-widest opacity-75">{video.genre}</span>
        <span className={`block leading-snug ${large ? 'font-serif text-2xl' : 'text-sm'}`}>
          {video.title}
        </span>
        <span className="block text-[11px] opacity-75">
          {[video.composer, formatMonth(video.date)].filter(Boolean).join(' · ')}
          {video.tiktok && ` · ${video.tiktok.plays.toLocaleString('en-US')} plays`}
        </span>
      </span>
    </button>
  )
}
