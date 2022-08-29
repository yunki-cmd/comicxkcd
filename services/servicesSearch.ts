const algoliasearch = require('algoliasearch');

const appID = process.env.APP_ID
const appSearchKey = process.env.SEARCH_KEY
const Index = process.env.INDEX_KEY


const client = algoliasearch("O4UAD24SWB", "b3336fe61bee949c1a479b94396a233c");
const index = client.initIndex("comicsIndex");


type data = {
  query: string
}

export async function searchAlgoria({ query }:data) {
  
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['title', 'id', 'img', 'alt'],
    hitsPerPage: 5,
  })
  return { hits: hits }
}

export async function autoComplete({ query }: data) {
  if (query === '') return {hits: []}
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['title','img',"id","alt"],
    hitsPerPage: 10,
  })
  return { hits: hits }
}
