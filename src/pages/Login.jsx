import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import React from "react"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Login() {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  })
  const [cookie, setCookie] = useCookies(["token"])
  const navigate = useNavigate()

  useEffect(() => {
    if (cookie && cookie.token && cookie.token !== "undefined") {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { toast } = useToast()

  async function Submit(e) {
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
        setTimeout(() => {
          navigate("/")
        }, 2000)
        toast({
          title: "Login successful!",
          description: "You have successfully logged in.",
          variant: "success",
        })
      } else {
        toast({
          title: "Login failed!",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        })
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
          onSubmit={Submit}
          className="flex flex-col gap-4"
        >
          <label>Email</label>
          <Input
            required={true}
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }}
            type="email"
            placeholder="john@doe.com"
          />

          <label>Password</label>
          <Input
            required={true}
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }}
            type="password"
          />

          <Button type="submit">Login</Button>
          <p>
            Don't have an account?{" "}
            <Link
              className="font-semibold underline hover:text-blue-600"
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login
