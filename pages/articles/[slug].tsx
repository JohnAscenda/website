import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import "prismjs";
import Prism from "prismjs";
import "prismjs/components/prism-dart";
import React, { useEffect, useRef } from "react";
import { TOC } from "../../components/headings/toc";
import Layout from "../../components/layout/layout";
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from "../../core/mdx";
import { getHeadings } from "../../core/utils";
import styles from "../../styles/blog_post.module.scss";

interface FrontmatterProps {
  title: string;
  description: string;
  image: string;
  youtube: string;
  author: string;
  date: string;
  github: string;
  slug: any;
  wordCount: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  fileName: string;
}

interface ArticleProps {
  frontMatter: FrontmatterProps;
  content: MDXRemoteSerializeResult<Record<string, unknown>>;
  rawContent: string;
  slug: string;
}

export default function Article({
  frontMatter,
  content,
  rawContent,
  slug,
}: ArticleProps) {
  const articleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const headings = getHeadings(rawContent);

  return (
    <Layout>
      <Head>
        <title>{frontMatter.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://robertbrunhage.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description} />
        <meta
          property="og:image"
          content={`https://robertbrunhage.com${frontMatter.image}`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@robertbrunhage" />
        <meta property="twitter:title" content={frontMatter.title} />
        <meta
          property="twitter:description"
          content={frontMatter.description}
        />
        <meta
          property="twitter:image"
          content={`https://robertbrunhage.com${frontMatter.image}`}
        />
        <link
          rel="canonical"
          href={`https://robertbrunhage.com/articles/${slug}`}
        />
      </Head>
      <div ref={articleRef} className={`max_width ${styles.content}`}>
        <header>
          <h1 className={styles.title}>{frontMatter.title}</h1>
          <h4 className={styles.quote}>
            {"🕑 " + frontMatter.readingTime.text}
          </h4>
        </header>
        <div className={styles.article_container}>
          <article className={styles.markdown}>
            <MDXRemote {...content} />
          </article>
          <aside>
            <TOC headings={headings} />
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles("articles");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const allPosts = await getAllFilesFrontMatter("articles");
  const postIndex = allPosts.findIndex((post) => post.slug === slug);
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("articles", slug);

  const content = post.mdxSource;
  const rawContent = post.content;
  const { frontMatter } = post;

  return { props: { frontMatter, content, rawContent, slug } };
}
