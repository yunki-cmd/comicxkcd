import { NextApiRequest, NextApiResponse } from "next";

const fs = require('fs/promises');


export default async function paginastiones(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { pagination } = req.query
  if (typeof pagination !== 'number' && pagination !== undefined) {
    pagination = parseInt(pagination)
  }
  if (pagination) {    
    const comics = await fs.readdir("./comics")
    let finalPages = comics.length - (pagination - 10)
    if (finalPages <= 0) return res.status(204).end()
    const lastComics = comics.slice(-pagination, finalPages).reverse()
    try {
      const promiseReadFiles = lastComics.map(async (file) => {
        const content = await JSON.parse((await fs.readFile(`./comics/${file}`, 'utf-8')).toString())
        return { content }
      })
      const latestComics = await Promise.all(promiseReadFiles)
      return res.json(latestComics)
    } catch (error) {
      
    }
  }
  return res.status(204).end()
}