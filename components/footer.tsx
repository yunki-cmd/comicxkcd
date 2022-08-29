import Link from "next/link";

export default function Footer() {
  return (    
    <footer className="flex flex-row content-center m-3 ">
    <div className="w-full text-center flex-row">
        <Link href={"https://xkcd.com/"}>
        <div className="inline-block">         
            <span className="px-2 font-medium capitalize text-xs text-gray-500">Source inspired page</span>
            <a className="text-blue-500 font-semibold uppercase" href={"https://xkcd.com/"} target={"_blank"} rel="noreferrer">
              xkcd
            </a>
        </div>
        </Link>
        <Link href={"https://www.youtube.com/c/midulive"} >
            <a className="px-2 text-blue-500 font-semibold uppercase" target={"_blank"} href={"https://www.youtube.com/c/midulive"} rel="noreferrer">
              midudev
            </a>
        </Link>
    </div>
  </footer>
  )
}