import Head from "next/head";
import Sidebar from "@/components/sidebar/Sidebar";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>CRM - Ecommerce</title>
        <meta property="Emanuel Lopez" content="My page title" key="Agencia Software" />
      </Head>
      <div className="">
        <Sidebar />
        <div className="">
          { children }
        </div>
      </div>
    </>
  )
}

export default Layout;