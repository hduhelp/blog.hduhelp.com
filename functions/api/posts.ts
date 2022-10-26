import { Client } from '@notionhq/client'
import { Env, getDatabase } from '../utils/notion'
import { jsonResponse } from '../utils/response';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url)
  let cache = await caches.open("custom:cache")
  const cached = await cache.match(url.pathname)
  if (cached) {
    return cached
  }

  const notion = new Client({ auth: env.NOTION_KEY })
  const posts = await getDatabase(env.NOTION_DATABASE_ID, notion)
  const response = jsonResponse(posts, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300",
    }
  })
  await cache.put(url.pathname, response.clone())
  return response
};