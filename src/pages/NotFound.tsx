import React from "react"

type NotFoundProps = {}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p className="text-5xl font-semibold">404</p>
    </div>
  )
}
export default NotFound
