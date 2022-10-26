import { Client } from '@notionhq/client'
import { Env, getDatabase } from '../utils/notion'
import { jsonResponse } from '../utils/response';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const notion = new Client({ auth: env.NOTION_KEY })
  const posts = await getDatabase(env.NOTION_DATABASE_ID, notion)
  return jsonResponse(posts)
};