import '../styles/globals.css'
import '../styles/togle.css'
import type { AppProps } from 'next/app'
import { ConsumeContextPagination} from "../context/paginationContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ConsumeContextPagination>
        <Component {...pageProps} />
     </ConsumeContextPagination>
    </>
  )
}

export default MyApp
