import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts({ exclude }: { exclude?: string }) {
  let allBlogs = getBlogPosts().filter((post) => post.slug !== exclude)
  let isDev = process.env.NODE_ENV === 'development'

  return (
    <div className="dim-siblings">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="faint text-sm w-s tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="tracking-tight hover:text-[color:var(--accent)] transition-colors">
                {post.metadata.title}
              </p>
              {isDev && (
                <span className="inline-flex items-center rounded border border-[var(--rule)] px-2 py-0.5 text-xs uppercase faint">
                  {post.metadata.status ?? 'public'}
                </span>
              )}
            </div>
          </Link>
        ))}
    </div>
  )
}
