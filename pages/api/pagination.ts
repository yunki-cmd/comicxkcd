import { NextApiRequest, NextApiResponse } from "next";

const fs = require('fs/promises');
const path = require('path');


export default async function paginastiones(
  req: NextApiRequest,
  res: NextApiResponse
) {
  path.resolve(process.cwd(), "comicsJson")
  let { pagination } = req.query
  if (typeof pagination !== 'number' && pagination !== undefined) {
    pagination = parseInt(pagination)
  }
  if (pagination) {
    const comics = await fs.readdir(process.cwd() + "/comicsJson")

    const baseName = comics.map(element => element.split(".")[0]).sort((a, b) => a - b)

    let finalPages = comics.length - (pagination - 10)
    if (finalPages <= 0) return res.status(204).end()
    const lastComics = baseName.slice(-pagination, finalPages).reverse()
    try {
      const promiseReadFiles = lastComics.map(async (file) => {
        const content = await JSON.parse((await fs.readFile(`${process.cwd()}/comicsJson/${file}.json`, 'utf-8')).toString())
        return { content }
      })
      const latestComics = await Promise.all(promiseReadFiles)
      return res.json(latestComics)
    } catch (error) {
      
    }
  }
  return res.status(204).end()
}