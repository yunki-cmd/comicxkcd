import { NextApiRequest, NextApiResponse } from "next";
import { searchAlgoria } from "../../services/servicesSearch"
const algoliasearch = require('algoliasearch');


const client = algoliasearch('O4UAD24SWB', '375899b9899e56201c71217f578111d3');
const index = client.initIndex('comicsIndex');

type Data = {
  hits : any
}

export default async function search(req: NextApiRequest,
  res: NextApiResponse<Data>) {
  const query = req.query.q
  const { hits } = await searchAlgoria({ query } )
  return res.status(200).json(hits);
}

