import { useCookies } from "react-cookie"
import { Button } from "./ui/button"
import { NavLink } from "react-router-dom"

function Header() {
  const [cookie, removeCookie] = useCookies(["token"], {
    doNotUpdate: false,
  })

  return (
    <header className="flex h-[10svh] w-screen items-center justify-between px-[10%] text-slate-900">
      <NavLink
        to={"/"}
        className="font-sans text-2xl font-bold"
      >
        Job Tracker
      </NavLink>
      {/* NavLinks */}
      <div>
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <Button
              className={isActive ? "bg-slate-100" : ""}
              variant="ghost"
            >
              Dashboard
            </Button>
          )}
        </NavLink>
        <NavLink to="/jobs">
          {({ isActive }) => (
            <Button
              className={isActive ? "bg-slate-100" : ""}
              variant="ghost"
            >
              Jobs
            </Button>
          )}
        </NavLink>
        <NavLink to="/add-job">
          {({ isActive }) => (
            <Button
              className={isActive ? "bg-slate-100" : ""}
              variant="ghost"
            >
              Add Job
            </Button>
          )}
        </NavLink>
      </div>
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
          <NavLink to="/login">
            <Button variant="ghost">Login</Button>
          </NavLink>

          <NavLink to="/register">
            <Button variant="ghost">Register</Button>
          </NavLink>
        </div>
      )}
    </header>
  )
}

export default Header
