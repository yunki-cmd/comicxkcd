
interface props{
  children?: React.ReactNode
  title?: string
}

export default function PageLayout({children}: props) {
  return (
    <>
      <main>
        {children}
      </main>
    </>
  )
}