import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Toaster } from "@/components/ui/toaster"

function Layout() {
  return (
    <main className="flex min-h-screen w-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </main>
  )
}

export default Layout
