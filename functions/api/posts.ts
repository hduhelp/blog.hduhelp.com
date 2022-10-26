import { Client } from '@notionhq/client'
import { Env, getDatabase } from '../utils/notion'

export const onRequestGet: PagesFunction<Env> = async ({ request, waitUntil, env }) => {
  const url = new URL(request.url)
  let cache = await caches.open("custom:cache")
  let response = await cache.match(url.pathname)
  if (!response) {
    const notion = new Client({ auth: env.NOTION_KEY })
    const posts = await getDatabase(env.NOTION_DATABASE_ID, notion)

    response = new Response(JSON.stringify(posts), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 's-maxage=10' }
    })
    waitUntil(cache.put(url.pathname, response.clone()))
  }
  return response
};