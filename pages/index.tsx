import type { NextPage } from 'next'
import ComicHome from '../components/ComicHome'
import fs from 'fs/promises'
import Layout from '../components/Layout'

const Home: NextPage = ({ latestComics } ) => {

  return (
    <>
      <Layout>
        <ComicHome latestComics={latestComics}  />
      </Layout>
    </>
  )

}

export async function getServerSideProps() {
  const comics = await fs.readdir(process.cwd() + "/comics")
  const lastComics = comics.slice(-10, comics.length).reverse()
  const promiseReadFiles = lastComics.map(async (file) => {
    const content = await JSON.parse((await fs.readFile(`${process.cwd()}/comics/${file}`, 'utf-8')).toString())
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