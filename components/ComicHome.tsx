/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { PaginationContext } from "../context/paginationContext"

interface content {
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
}

interface propsComics {
  latestComics: content[]
}
const ComicHome: NextPage<propsComics> = ({ latestComics }) => {

  const infiniteScroll = useContext(PaginationContext)?.infiniteScroll
  
  const comicsImages = useRef<HTMLDivElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const checkInfinite = useRef<HTMLDivElement>(null)
  const page = useRef<number>(20)

  const [allcomics, setAllcomics] = useState<content[]>(latestComics)
  const [visible, setVisble] = useState<boolean>(true)


  const hanlderUPTop = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    /* let position = Math.abs(comicsImages.current?.getBoundingClientRect().y!) */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  const handlerLoadingMore = () => {
    fetch(`/api/pagination?pagination=${page.current}`)
      .then(resp => resp.json())
      .then(resp => {
        resp.forEach((element: content) => {
          allcomics.push(element)
        })
        return Promise.all(allcomics)
      })
      .then(resp => {
        page.current =  page.current + 10
        return resp
      })
      .then(resp => { 
        setAllcomics(resp)
      })
      .catch(err => {
      console.log(err)
    })
  }

  const callbackFunction = (entries: any) => {
    const [entry] = entries
    setVisble(entry.isIntersecting)
  }

  const options = {
    root: null,
    rootMargin: "50px",
    threshold: 0
  }
  const options2 = {
    root: checkInfinite.current,
    rootMargin: "50px",
    threshold: 0.5
  }

  const handlerInfiniteScroll = debounce((entries: any) => {
    const [entry] = entries
    if (entry.isIntersecting) {      
      fetch(`/api/pagination?pagination=${page.current}`)
        .then(resp => resp.json())
        .then(resp => {
          resp.forEach((element: content) => {
            allcomics.push(element)
          })
          return Promise.all(allcomics)
        })
        .then(resp => {
          setAllcomics(resp)
          page.current = page.current + 10
        })
        .catch(err => {
          console.log(err)
        })
    }
  })

  // function debounce
  // se pasa el callback y el timing entre llamadas
  function debounce(this:any,func:Function, timeout = 500) {
    // se crea una variable para el setTimeout
    let timer: any;
    // se devuelve una funcion con los mismos argumentos
    return (...args: any) => {
      // se limpia el timing
      clearTimeout(timer);
      // y se crea una nueva que se ejecuta despues del timeout
      // con esto por cada llamada solo habra una setimeout
      // por cada llamada se reinica el timeout
      // solo se ejecutarta la ultima llamada
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
      // el this solo funcionan en las funciones normales
    };
  }

  useEffect(() => {

    const observer = new IntersectionObserver(callbackFunction, options)
    const observer2 = new IntersectionObserver(handlerInfiniteScroll, options2)

    const element = firstLink.current
    const element2 = checkInfinite.current

    if (element) observer.observe(element)
    /* window.addEventListener("scroll", scroll) */

    if (infiniteScroll) {
      if (element2) observer2.observe(element2)
    } else {
      if (element2) observer2.unobserve(element2)
    }

    return () => {
      /* window.removeEventListener("scroll", scroll) */
      if (element) observer.unobserve(element)
      if (element2) observer2.unobserve(element2)
    }
  }, [infiniteScroll])
  
  return (
    <>
      <h2 className='font-bold text-3xl my-3 text-center'>últimos comics</h2>
      <div ref={comicsImages} className='grid sm:grid-cols-1 xl:grid-cols-1 place-content-center place-items-center  gap-20 min-h-[1230px]'>
        {allcomics.map((comics,index) => {
          return (
            <Link href={`/comics/${comics.content.id}`}
              key={comics.content.id}
            >
              <a href={`/comics/${comics.content.id}`} ref={index === 0 ? firstLink : null} className="text-center font-semibold capitalize text-lg">
                <span className='mb-5'>
                {comics.content.title}
                </span>
                <img className={`max-h-[${comics.content.height}px] max-w-[${comics.content.width}px] my-4`}
                  src={comics.content.img}
                  alt={comics.content.alt}
                />
              </a>
            </Link>
          )
        })
      }
      </div>
      {infiniteScroll
      ?
      <div ref={checkInfinite} className="flex justify-center items-center p-2 m-4">
        <button className="border rounded-md px-2 py-1 hidden"></button>
      </div>
      :
      <div className="flex justify-center items-center p-2 m-4">
      <button onClick={handlerLoadingMore} className="border rounded-md px-2 py-1">Loading More</button>
      </div>
    }
      <div className={`flex justify-end p-2 m-4 fixed bottom-0 left-[90%] ${visible ? 'hidden' : null}`}>
        <button type='button' onClick={hanlderUPTop} className="border rounded-full px-4 py-4 ">UP</button>
      </div>
    </>
  )
}

export default ComicHome

