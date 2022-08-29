import { NextApiRequest, NextApiResponse } from "next";
import { searchAlgoria } from "../../services/servicesSearch"
const algoliasearch = require('algoliasearch');

const appID = process.env.APP_ID
const appSearchKey = process.env.SEARCH_KEY
const Index = process.env.INDEX_KEY

const client = algoliasearch(appID, appSearchKey);
const index = client.initIndex(Index);

type Data = {
  hits : any
}

export default async function search(req: NextApiRequest,
  res: NextApiResponse<Data>) {
  const query = req.query.q
  const { hits } = await searchAlgoria({ query } )
  return res.status(200).json(hits);
}

