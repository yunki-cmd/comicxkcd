const algoliasearch = require('algoliasearch');

const client = algoliasearch('O4UAD24SWB', '375899b9899e56201c71217f578111d3');
const index = client.initIndex('comicsIndex');

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
