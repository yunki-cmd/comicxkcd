import React, { createContext, useState } from "react";



interface paginationScroll {
  infiniteScroll: boolean
  update?: Function
}

const PaginationContext = createContext<paginationScroll | null>({
  infiniteScroll: false,
});

interface props {
  children: React.ReactNode
}

function ConsumeContextPagination({ children } : props) {

  const [infinite, setInfinite] = useState(false)
  
  const ToggleInfinite = () => {
    setInfinite(!infinite);
  }

  return (
    <>
      <PaginationContext.Provider value={{ infiniteScroll: infinite, update: ToggleInfinite }} >
        {children}
      </PaginationContext.Provider>
    </>
  )
  
}

export { ConsumeContextPagination, PaginationContext}
