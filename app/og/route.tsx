import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'Evan Sende'

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
        <div tw="flex flex-col w-full py-12 px-4 items-center justify-center p-8">
          <h2 tw="flex flex-col text-4xl font-bold tracking-tight text-left text-white mb-4">
            {title}
          </h2>
          <p tw="text-xl text-gray-300">Software Engineer | React, Vue, Node.js</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
