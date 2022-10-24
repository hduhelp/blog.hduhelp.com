import { Client } from "@notionhq/client";

export interface Env {
  NOTION_KEY: string;
  NOTION_DATABASE_ID: string;
}

export const getDatabase = async (databaseId: string ,notion: Client, slug?: string) => {
  let dbQuery: any = {
    database_id: databaseId,
    filter: { and: [{ property: 'published', checkbox: { equals: true } }] },
    sorts: [{ property: 'date', direction: 'descending' }],
  }

  if (slug) {
    dbQuery.filter.and.push({ property: 'slug', rich_text: { equals: slug } })
  }

  const response = await notion.databases.query(dbQuery)
  return response.results
}

export const getPage = async (notion: Client, pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (notion: Client, blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  })
  return response.results
}

export const searchDatabase = async (notion: Client, query: string) => {
  const response = await notion.search({
    query: query,
    filter: { value: 'page', property: 'object' },
    page_size: 10,
  })
  return response.results
}
