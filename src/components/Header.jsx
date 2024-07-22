import { Button } from "./ui/button"
import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="flex justify-between h-[10svh] w-screen items-center px-[20%] bg-slate-400 ">
      <h1 className="font-bold font-serif text-2xl text-white">Job Tracker</h1>
      {/* Links */}
      <div>
        <Button variant="ghost" ><Link to="/login">Login</Link></Button>
        <Button variant="ghost"><Link to="/register">Register</Link></Button>
      </div>
    </header>
  )
}

export default Header
