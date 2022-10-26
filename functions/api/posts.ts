import { Client } from '@notionhq/client'
import { Env, getDatabase } from '../notion'

export const onRequestGet: PagesFunction<Env> = async ({ request, waitUntil, env }) => {
  let cache = await caches.open("custom:cache")
  let cacheKey = new Request(request.url, request)
  let response = await cache.match(cacheKey)
  if (!response) {
    const notion = new Client({ auth: env.NOTION_KEY })
    const posts = await getDatabase(env.NOTION_DATABASE_ID, notion)

    response = new Response(JSON.stringify(posts), {
      headers: { "Content-Type": "application/json", 'Cache-Control': 's-maxage=300' }
    })
    waitUntil(cache.put(cacheKey, response.clone()))
  }
  return response
};