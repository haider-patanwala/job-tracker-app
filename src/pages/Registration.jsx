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

function Register() {
  const [credentials, setCredentials] = React.useState({
    // TODO: Add username in backend
    username: "",
    email: "",
    password: "",
  })
  const [cookie, setCookie] = useCookies(["token"])
  const navigate = useNavigate()

  const { toast } = useToast()
  useEffect(() => {
    if (cookie && cookie.token && cookie.token !== "undefined") {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(credentials)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}/auth/register`,
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
        console.log("Registration successful!", data)
        setTimeout(() => {
          navigate("/")
        }, 2000)
        setCookie("token", data.data.token)
        toast({
          title: "Registration successful!",
          description: "You have successfully logged in.",
          variant: "success",
        })
      } else {
        console.log("Registration failed.", data)
        toast({
          title: "Registration unsuccessful!",
          description: "There was an error registering you.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log("Error:", error)
    }
  }

  return (
    <Card className="m-auto w-96">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Please enter your details to register.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <label>Username</label>
          <Input
            required={true}
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, username: e.target.value }))
            }}
            type="text"
          />
          <label>Email</label>
          <Input
            required={true}
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }}
            type="email"
          />
          <label>Password</label>
          <Input
            required={true}
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }}
            type="password"
          />
          <Button type="submit">Register</Button>
          <p>
            Already have an account?{" "}
            <Link
              className="font-semibold underline hover:text-blue-600"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default Register
