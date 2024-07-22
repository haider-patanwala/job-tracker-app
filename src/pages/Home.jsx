import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="my-auto flex w-screen items-center justify-between gap-5">
      <div className="flex h-[60vh] w-[60%] flex-col justify-center bg-slate-800 pl-[10rem] pr-[10rem]">
        <p className="text-6xl font-bold text-white">
          One step closer to your dream job
        </p>
        <Link to={"/jobs"}>
          <Button className="mt-14 w-52 py-4 text-xl">Explore</Button>
        </Link>
      </div>
      <div className="flex w-[40%] flex-col justify-center">
        <img
          src="/hero-image.jpg"
          alt="hero-image"
          className="aspect-video w-full -translate-x-[25%] rounded-xl object-cover"
        />
      </div>
    </div>
  )
}

export default Home
