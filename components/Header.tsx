import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { PaginationContext } from "../context/paginationContext"
import { autoComplete } from "../services/servicesSearch"

interface results {
  id: string,
  img: string,
  alt: string,
  title: string
  objectID: string
}

const Header: NextPage = () => {
  const router = useRouter()
  const [result, setResult] = useState<results[]>([])
  const [queary, setQuery] = useState("")
  const setUpdatePagination = useContext(PaginationContext)?.update
  const infiniteScroll:boolean = useContext(PaginationContext)?.infiniteScroll!

  const handlerSearch = (e:React.ChangeEvent<HTMLInputElement>) => 
  {
    let query = e.target.value
    setQuery(query)
    autoComplete({ query })
      .then(resp => {
      setResult(resp.hits)
    })

  }

  const handlerCheckBox = () => 
  {
    if (typeof setUpdatePagination === "function") {
      setUpdatePagination()
    }
  }

  return (
    <header className="flex flex-row justify-between m-10">
      <div>
        <Link href={"/"}>
          <a href={"/"}>
            <span className="font-bold">next</span>
            <span className="font-light text-sm cursor-pointer">xkcd</span>
          </a>
        </Link>
        <div className="flex items-center justify-center w-full mb-12">
          <label htmlFor="toogleA"
            className="flex items-center cursor-pointer">
            <div className="relative">
              <input onChange={handlerCheckBox} id="toogleA" type="checkbox" className="sr-only" checked={ infiniteScroll} />
              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">
              Toggle Me!
            </div>
          </label>
        </div>
      </div>
      <nav>
        <ul className="flex flex-row gap-3 font-bold">
            <label htmlFor="search">Search</label>
          <div className="relative">
            <input name="search" id="search" type="text" onChange={handlerSearch} className="border rounded-md text-xs mx-2 outline-none pl-2 py-1" />
            <ul tabIndex={0} className={`absolute bg-white shadow-md rounded-md overflow-hidden p-2 ${result.length === 0 ? "hidden" : ''}`}>
              {Boolean(result.length > 0) && result.map(resul => {
                return (<li tabIndex={0}  key={resul.id} className="block cursor-pointer rounded-md px-1 hover:bg-slate-500">
                  <Link
                    href={`/comics/${resul.id}`}
                    className="block"
                  >
                    {resul.title}
                  </Link>
                  </li>)
              }) }
            </ul>
          </div>
          <button onClick={() => router.push(`/comics/search?q=${queary}`) }>🔍</button>
          {/* <li><Link href={"/comics/search"}><a className="text-sm">Search</a></Link></li> */}
        </ul>
      </nav>
    </header>
  )
}


export default Header