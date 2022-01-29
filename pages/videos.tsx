import Head from "next/head";
import React from "react";
import VideoCard from "../components/cards/videoCard/videoCard";
import Layout from "../components/layout/layout";
import { getAllFilesFrontMatter } from "../core/mdx";
import styles from "../styles/videos.module.scss";

interface FrontmatterProps {
  title: string;
  description: string;
  image: string;
  slug: any;
}

const videos = ({ videos }: any) => {
  return (
    <Layout>
      <Head>
        <title>Robert Brunhage - Flutter, Dart, Firebase | Videos</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index" />
        <meta
          name="description"
          content="Video lesson on topics such as Flutter, Dart, Firebase and more | Robert Brunhage"
        />
        <meta property="og:url" content="https://robertbrunhage.com/videos" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={videos[0].title} />
        <meta property="og:description" content={videos[0].description} />
        <meta property="og:image" content={videos[0].image} />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@robertbrunhage" />
        <meta property="twitter:title" content={videos[0].title} />
        <meta property="twitter:description" content={videos[0].description} />
        <meta
          property="twitter:image"
          content={`https://robertbrunhage.com${videos[0].image}`}
        />
        <link rel="canonical" href="https://robertbrunhage.com/videos" />
      </Head>
      <div className="max_width">
        <h1 className={styles.title}>Video Lessons :)</h1>
        <div className={styles.card_container}>
          {videos.map(
            ({ title, description, image, slug }: FrontmatterProps) => (
              <VideoCard
                key={slug}
                slug={slug}
                title={title}
                description={description}
                image={image}
              />
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default videos;

export async function getStaticProps() {
  const videos = await getAllFilesFrontMatter("lessons");

  return { props: { videos } };
}
