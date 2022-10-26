import { Client } from '@notionhq/client/build/src'
import { Env, searchDatabase } from '../../notion'

export const onRequestGet: PagesFunction<Env> = async ({
  env,
  request,
}) => {
  const notion = new Client({ auth: env.NOTION_KEY })
  const query = new URL(request.url).pathname.replace('/api/search/', '')
  const results = await searchDatabase(notion, query as string)

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' },
  })
};
