import { useCookies } from "react-cookie"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

function Header() {
  const [cookie, removeCookie] = useCookies(["token"], {
    doNotUpdate: false,
  })

  return (
    <header
      className="flex h-[10svh] w-screen items-center justify-between bg-slate-400 px-[20%]
        text-white"
    >
      <h1 className="font-serif text-2xl font-bold">Job Tracker</h1>
      {/* Links */}
      {cookie && cookie.token && cookie.token !== "undefined" ? (
        <Button
          onClick={() => {
            removeCookie("token")
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
