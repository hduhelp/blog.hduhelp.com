import type { NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { renderNotionBlock } from '../../components/NotionBlockRenderer'

import Link from 'next/link'
import { ArrowLeft, Bookmark, MessageCircle } from 'react-feather'
import BlogCopyright from '../../components/BlogCopyright'
import BlogToc from '../../components/BlogToc'

const Post: NextPage = () => {
  const router = useRouter()
  const hostname = typeof window !== 'undefined' ? window.location.origin : 'https://blog.hduhelp.com'
  const { slug } = router.query

  const [data, setData] = useState<{page: any, blocks: any[]}>({page: null, blocks: []});

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/blog/${slug}`);
      const data = await response.json<{page: any, blocks: any[]}>();
      setData(data);
    })();
  }, [slug]);

  const {page, blocks} = data

  if (!page || !blocks) return <div></div>

  return (
    <div>
      <Head>
        <title>{page.properties.name.title[0].plain_text} - HDUHELP&apos;s Blog</title>
        <meta name="description" content="HDUHELP" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <div className="flex flex-col min-h-screen dark:bg-dark-900">
        <Navbar />

        <main className="container mx-auto max-w-3xl lg:max-w-5xl gap-8 px-6 grid grid-cols-10 relative">
          <div className="flex flex-col col-span-10 lg:col-span-7">
            <div className="rounded border-gray-400/30 -mx-4 p-4 md:border">
              <h1 className="flex space-x-2 text-xl mb-2 justify-between">
                <span className="font-bold">{page.properties.name.title[0].plain_text}</span>
                <span>{page.icon.emoji}</span>
              </h1>
              <div className="flex flex-wrap space-x-2 h-8 mb-8 secondary-text items-center">
                <span>{new Date(page.properties.date.date.start).toDateString()}</span>
                <span>·</span>
                {page.properties.author.people.map((person: { name: string }) => (
                  <span key={person.name}>{person.name.toLowerCase()}</span>
                ))}
                <span>·</span>
                <div className="inline-flex items-center space-x-1">
                  <Bookmark size={18} />
                  {page.properties.tags.multi_select.map((tag: { name: string }) => (
                    <span key={tag.name}>{tag.name.toLowerCase()}</span>
                  ))}
                </div>
                <span>·</span>
                <Link href="#comments-section" passHref>
                  <div className="inline-flex items-center space-x-1 cursor-pointer">
                    <MessageCircle size={18} />
                    <a>comments</a>
                  </div>
                </Link>
              </div>

              {blocks.map(block => (
                <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
              ))}

              <BlogCopyright page={page} absoluteLink={`${hostname}/blog/${router.query.slug}`} />
            </div>

            <Link href="/" passHref>
              <div className="border rounded cursor-pointer flex border-gray-400/30 mt-4 p-4 items-center justify-between md:-mx-4 hover:(bg-light-200 opacity-80) dark:hover:bg-dark-700 ">
                <span>cd /index</span>
                <ArrowLeft />
              </div>
            </Link>

          </div>

          <BlogToc blocks={blocks} />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Post
