/* eslint-disable @next/next/no-img-element */

type props = {
  query: Comics[]
}

interface Comics {
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

const Search = ({ query }: props) => {

  return (
    <div>
      {query.map(comics => {
        return (
          <div key={comics.id} className="flex flex-row gap-3 my-4 justify-center content-center items-center">
            <img width={"150px"} height={"150px"} src={comics.img} alt={ comics.alt} className="rounded-full" />
            <span>
              {comics.title}
            </span>
          </div>)
      })}
    </div>
  )
}

export default Search