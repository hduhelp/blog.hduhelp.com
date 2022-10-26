import { Client } from '@notionhq/client'
import { Feed } from 'feed'
import { Env, getDatabase } from './notion'

const domain = 'https://blog.hduhelp.com'
const year = new Date().getFullYear()

const generateRSS = (posts: any) => {
  // Create new feed object
  const feed = new Feed({
    id: domain,
    link: domain,
    title: "HDUHELP - HDUHELP's Blog (@_@;)",
    description: 'Thoughts, ideas, and more.',
    copyright: `All rights reserved ${year}, HDUHELP`,
    image: `${domain}/favicon.png`,
    favicon: `${domain}/favicon.ico`,
    author: {
      name: 'HDUHELP',
      email: 'i@hduhelp.com',
      link: 'https://blog.hduhelp.com',
    },
  })

  // Add posts to feed based on queried data from Notion
  posts.forEach((post: any) => {
    feed.addItem({
      title: post.properties.name.title[0].text.content,
      id: post.id,
      link: `${domain}/blog/${post.properties.slug.rich_text[0].text.content}`,
      description: post.properties.preview.rich_text[0].text.content,
      date: new Date(post.properties.date.date.start),
    })
  })

  return feed.rss2()
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  let cache = await caches.open("custom:cache")
  let cacheKey = new Request(request.url, request)
  let response = await cache.match(cacheKey)
  if (!response) {
    const notion = new Client({ auth: env.NOTION_KEY })
    const posts = await getDatabase(env.NOTION_DATABASE_ID, notion)
    const xmlFeed = generateRSS(posts)

    response = new Response(xmlFeed, {
      headers: {
        "Content-Type": "text/xml",
        "Cache-Control": "max-age=0, s-maxage=300, stale-while-revalidate",
      },
    })
    waitUntil(cache.put(cacheKey, response.clone()))
  }
  return response
};