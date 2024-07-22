import { useCookies } from "react-cookie"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

function Header() {
  const [cookie, removeCookie] = useCookies(["token"], {
    doNotParseJSON: true,
    doNotUpdate: true,
    doNotParse: true,
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (cookie.token !== "undefined") {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [cookie, removeCookie])
  return (
    <header
      className="flex h-[10svh] w-screen items-center justify-between bg-slate-400 px-[20%]
        text-white"
    >
      <h1 className="font-serif text-2xl font-bold">Job Tracker</h1>
      {/* Links */}
      {isLoggedIn ? (
        <Button
          onClick={() => {
            removeCookie("token")
            setIsLoggedIn(false)
          }}
          variant="ghost"
        >
          Logout
        </Button>
      ) : (
        <div>
          <Button variant="ghost">
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="ghost">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      )}
    </header>
  )
}

export default Header
