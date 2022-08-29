import type { NextPage } from 'next'
import ComicHome from '../components/ComicHome'
import fs from 'fs/promises'
import Layout from '../components/Layout'
import path from "path"
import Footer from '../components/footer'
import Head from 'next/head'

const Home: NextPage = ({ latestComics } ) => {

  return (
    <>
      <Head>
          <meta property="og:type" content="website" />
        <meta property="og:url" content="https://comicxkcd.vercel.app/" />
          <meta property="og:title" content="XKCD" />
          <meta property="og:description" content="Comics" />
        <meta property="og:image" content="https://imgs.xkcd.com/comics/cloud_swirls.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        <meta property="og:image" content="https://imgs.xkcd.com/comics/cloud_swirls.png" />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />
      </Head>
      <Layout>
        <ComicHome latestComics={latestComics} />
        <Footer></Footer>
      </Layout>
    </>
  )

}

export async function getServerSideProps() {
  path.resolve(process.cwd(), "comicsJson")
  const comics = await (await fs.readdir(process.cwd() + "/comicsJson"))
  const baseName = comics.map( element => element.split(".")[0]).sort((a, b) => a - b)
  const lastComics = baseName.slice(-10, comics.length).reverse()
  const promiseReadFiles = lastComics.map(async (file) => {
    const content = await JSON.parse((await fs.readFile(`${process.cwd()}/comicsJson/${file}.json`, 'utf-8')).toString())
    return { content }
  })
  const latestComics = await Promise.all(promiseReadFiles)
  return {
    props: {
      latestComics: latestComics
    }
  }
}

/* export async function getServerSideProps() {
  const response = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2022-07-24&sortBy=publishedAt&apiKey=294ae32e23c1408fbd66961150972ef8")
  const { articles } = await response.json()
  return {
    props: { articles }
  }
} */



export default Home