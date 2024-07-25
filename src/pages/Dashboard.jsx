import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Edit } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"

function Dashboard() {
  const [data, setData] = useState()
  const [cookiee] = useCookies(["token"])
  const { toast } = useToast()

  async function getdata() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}/job-application`,
        {
          headers: {
            authorization: cookiee.token,
          },
        }
      )
      const Data = await response.json()
      if (response.ok) {
        setData(Data)
        // console.log(Data)
      } else {
        toast({
          title: "Error while getting data",
          description: "Please try again",
          type: "destructive",
        })
      }
    } catch {
      console.error("Error while getting data")
    }
  }
  useEffect(() => {
    getdata()
  }, [])

  if (data) {
    return (
      <ul className="flex flex-col gap-20">
        {data.data.map((item, index) => {
          // console.log(item)
          return (
            <Card
              key={index}
              className="relative flex w-[40rem] flex-col px-[5%] py-[2%] text-xl font-medium
                text-slate-900"
            >
              <CardTitle className="text-2xl font-medium text-slate-900">
                {item.companyName}
              </CardTitle>
              <span className="text-xl font-medium text-slate-900">
                {item.jobTitle}
              </span>
              <span className="text-base text-slate-800">{item._id}</span>
              <span className="text-base font-bold text-slate-800">
                {item.applicationStatus}
              </span>
              <Dialog className="relative min-w-fit">
                <DialogTrigger asChild>
                  <Edit className="absolute right-5 top-5 size-5 cursor-pointer text-orange-400" />
                </DialogTrigger>
                <DialogTitle></DialogTitle>
                <DialogContent className="h-[80dvh] min-w-fit overflow-y-scroll">
                  <JobApplication id={item._id} />
                </DialogContent>
              </Dialog>
            </Card>
          )
        })}
      </ul>
    )
  } else {
    return <div>Loading...</div>
  }
}

function JobApplication({ id }) {
  const [cookiee] = useCookies(["token"])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}/${id}`,
        {
          headers: {
            authorization: cookiee.token,
          },
          method: "PATCH",
          body: JSON.stringify(data),
        }
      )
    } catch {
      console.log("Some Error Occured")
    }
    console.log(data)
  }

  return (
    <Card className="flex w-[30rem] flex-col border-none p-6">
      <CardHeader className="text-2xl font-bold">Edit Job</CardHeader>
      <CardDescription className="mb-10 ml-4 text-slate-800">
        Edit Job Details
      </CardDescription>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Label>Company Name</Label>
          <Input
            type="text"
            // className={`${errors.company && "border-red-500"} `}
            placeholder="Company Name"
            {...register("companyName", {
              required: "Company name is required",
            })}
          />

          {errors.companyName && (
            <p className="text-red-500">{errors.companyName.message}</p>
          )}
          <Label>Job Title</Label>
          <Input
            // className={errors.job_title ? "border-red-500" : ""}
            type="text"
            placeholder="Job Title"
            {...register("jobTitle", { required: "Job title is required" })}
          />
          {errors.jobTitle && (
            <p className="text-red-500">{errors.jobTitle.message}</p>
          )}
          <Label>Application Status</Label>
          <RadioGroup
            // defaultValue="Applied"
            {...register("applicationStatus", {
              required: "Application Status is required",
            })}
            // onChange={(e) => {
            //   console.log(e.target.value)
            // }}
            // className={`flex flex-wrap gap-5 text-black ${errors.application_status && "border-red-500"}`}
          >
            <div className="flex gap-4">
              <Label>Applied</Label>
              <RadioGroupItem value="Applied" />
            </div>
            <div className="flex gap-4">
              <Label>Interviewing</Label>
              <RadioGroupItem value="Interviewing" />
            </div>
            <div className="flex gap-4">
              <Label>Offered</Label>
              <RadioGroupItem value="Offer" />
            </div>
            <div className="flex gap-4">
              <Label>Rejected</Label>
              <RadioGroupItem value="Rejected" />
            </div>
          </RadioGroup>
          {errors.applicationStatus && (
            <p className="text-red-500">{errors.applicationStatus.message}</p>
          )}
          <Label>Application Dates</Label>
          <input
            {...register("applicationDate", {
              required: "Please Select Date",
            })}
            type="date"
            className={"w-full rounded-lg border bg-white px-4 py-2 text-black"}
          />
          {errors.applicationDate && (
            <p className="text-red-500">{errors.applicationDate.message}</p>
          )}

          <Label>Follow Up Dates</Label>
          <input
            {...register("followUpDate", {
              required: "Please Select Date",
            })}
            type="date"
            className={"w-full rounded-lg border bg-white px-4 py-2 text-black"}
          />
          {errors.followUpDate && (
            <p className="text-red-500">{errors.followUpDate.message}</p>
          )}

          <Button
            type="submit"
            className="w-full rounded-lg bg-black text-white disabled:opacity-75"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Edit Job"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Dashboard
