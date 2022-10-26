import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

type BlogPosts = QueryDatabaseResponse["results"];

const Blog: NextPage = () => {
  const [posts, setPosts] = useState<BlogPosts>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/posts");
      const posts: BlogPosts = await response.json<BlogPosts>();
      setPosts(posts);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>HDUHELP - Blog</title>
        <meta name="description" content="HDUHELP" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>

      <div className="flex flex-col min-h-screen dark:bg-dark-900">
        <Navbar />

        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="font-bold text-xl mb-8 heading-text flex items-center justify-between">
            <span>Blog</span>
          </h1>
          {loading && <div>Loading...</div>}
          {posts.map((post: any) => (
            <Link
              key={post.id}
              href={`/blog/${post.properties.slug.rich_text[0].text.content}`}
              passHref
            >
              <div className="border-none rounded cursor-pointer -mx-2 mb-2 p-2 hover:bg-light-200 hover:opacity-80 dark:hover:bg-dark-700">
                <h2 className="flex space-x-2 text-lg mb-2 justify-between heading-text">
                  <span>{post.properties.name.title[0].text.content}</span>
                  <span>{post.icon.emoji}</span>
                </h2>

                <p className="text-sm primary-text">
                  {post.properties.preview.rich_text[0].text.content}
                </p>

                <div className="flex flex-wrap space-x-2 text-sm secondary-text items-center">
                  <span>
                    {new Date(post.properties.date.date.start).toDateString()}
                  </span>
                  <span>·</span>
                  {post.properties.author.people.map(
                    (person: { name: string }) => (
                      <span key={person.name}>{person.name.toLowerCase()}</span>
                    )
                  )}
                  <span>·</span>
                  {post.properties.tags.multi_select.map(
                    (tag: { name: string }) => (
                      <span key={tag.name}>{tag.name.toLowerCase()}</span>
                    )
                  )}
                </div>
              </div>
            </Link>
          ))}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
