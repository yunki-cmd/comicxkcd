
import React from "react";
import Header from "./Header";
import PageLayout from "./PageLayout";

interface props{
  children: React.ReactNode
}

export default function Layout({ children}: props) {
  return (
    <>
      <Header />
      <PageLayout>
        { children}
      </PageLayout>
    </>
  )
}

