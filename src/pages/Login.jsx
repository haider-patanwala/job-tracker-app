import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import React from "react"
import { useCookies } from "react-cookie"

function Login() {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  })
  const [cookies, setCookie, removeCookie] = useCookies(["token"])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      )
      const data = await response.json()

      if (response.ok) {
        console.log("Login successful!", data)
        setCookie("token", data.data.token)
      } else {
        console.log("Login failed.", data)
      }
    } catch (error) {
      console.log("Error:", error)
    }
  }
  return (
    <Card className="m-auto w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login using email and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <label>Email</label>
          <Input
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }}
            type="email"
          />
          <label>Password</label>
          <Input
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }}
            type="password"
          />
          <Button type="submit">Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login
