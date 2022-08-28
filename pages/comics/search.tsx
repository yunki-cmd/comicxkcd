import { NextPage } from "next"
import Layout from "../../components/Layout"
import SearchComponent from "../../components/Search"
import { searchAlgoria } from "../../services/servicesSearch"

const Search: NextPage = ({q}) => {
  return (
    <Layout>
      <SearchComponent query={q} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { q: query = "" } = context.query
  const { hits } = await searchAlgoria({query})
  return {
    props: {
      q: hits
    }
  }
}

export default Search
