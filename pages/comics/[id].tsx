import { NextPage } from "next"
import { GetServerSideProps } from 'next'
import Head from "next/head"
import Header from "../../components/Header"
import { readFile, stat} from "fs/promises"
import Link from "next/link"
import Layout from "../../components/Layout"

interface Props{
  id: string
  content: {
    id: string,
    img: string,
    height: string,
    width: string,
    month: string,
    link?: string,
    year: string,
    safe_title: string,
    alt: string,
    title: string,
    day: string
  }
  prevID?: number
  nextId?: number
  PrevPage?: string
  nextPage?: string
}

const ComicId: NextPage<Props> = ({ id, content, prevID, nextId, PrevPage, nextPage }) => {

  return (
    <>
      <Head>
        <title>Detail Comic { id}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col justify-center items-center mt-24">
          <img src={content.img} alt={content.alt} />
          <div className="w-1/2 mt-12 flex flex-row justify-evenly gap-10">
            {PrevPage === 'fulfilled' &&
              <Link href={`/comics/${prevID}`}>
                <a>⬅ Previus</a>
              </Link>
            }
            {nextPage === 'fulfilled' &&
              <Link href={`/comics/${nextId}`}>
                <a>Next ➡</a>
              </Link>
            }
          </div>
        </div>
      </Layout>

    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const file = await readFile(`./comics/${id}.json`, "utf-8")
  const content = await JSON.parse(file)
  const idNumber = +id
  const prevID = idNumber - 1
  const nextId = idNumber + 1
  const [hasPrevPage, hasNextPage] = await Promise.allSettled([stat(`./comics/${prevID}.json`),stat(`./comics/${nextId}.json`)])
  const { status:PrevPage } = hasPrevPage
  const { status:nextPage} = hasNextPage
  return {
    props: { content, id, prevID, nextId, PrevPage, nextPage }
  }
}

export default ComicId