import { getBlogPosts } from 'app/blog/utils'
import { piano, roles } from 'app/data/profile'

export const baseUrl = 'https://www.evansende.com'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = [
    '',
    '/career',
    ...roles.map((r) => `/career/${r.slug}`),
    '/education',
    ...(piano.length > 0 ? ['/piano'] : []),
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
