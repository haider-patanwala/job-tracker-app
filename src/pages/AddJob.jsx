import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

import { useCookies } from "react-cookie"
import { Button } from "react-day-picker"
import { useForm } from "react-hook-form"

function AddJob() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const [cookiee] = useCookies(["token"])
  const { toast } = useToast()

  const onSubmit = async (data) => {
    const formdata = {
      companyName: data.company,
      jobTitle: data.job_title,
      applicationStatus: data.application_status,
      followUpDate: data.follow_up_date,
      applicationDate: data.application_date,
      notes: data.notes,
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}/job-application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: cookiee.token,
          },
          body: JSON.stringify(formdata),
        }
      )
      const data = await response.json()
      if (response.ok) {
        toast({
          title: "Success",
          description: "Job added successfully",
          type: "success",
        })
        // console.log("Success", data)
      }
    } catch (error) {
      // console.error(data)
      toast({
        title: "error",
        description: "There was some error occured",
        type: "destructive",
      })
    }
  }

  return (
    <div className="m-auto h-full">
      <Card className="flex w-[30rem] flex-col p-10">
        <CardHeader className="text-3xl font-bold">Add Job</CardHeader>
        <CardDescription className="mb-10 ml-5 text-slate-800">
          Add a job to your profile
        </CardDescription>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Label>Company Name</Label>
            <Input
              type="text"
              placeholder="Company Name"
              {...register("company", { required: "Company name is required" })}
            />

            <Label>Job Title</Label>
            <Input
              type="text"
              placeholder="Job Title"
              {...register("job_title", { required: "Job title is required" })}
            />
            <Label>Application Status</Label>
            <RadioGroup
              defaultValue="applied"
              {...register("application_status", {
                required: "Status is required",
              })}
              className="flex flex-wrap gap-5 text-black"
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
            <Label>Application Dates</Label>
            <input
              {...register("application_date", {
                required: "Please Select Date",
              })}
              type="date"
              className="w-full rounded-lg border bg-white px-4 py-2 text-black"
            />
            <Label>Follow Up Dates</Label>
            <input
              {...register("follow_up_date", {
                required: "Please Select Date",
              })}
              type="date"
              className="w-full rounded-lg border bg-white px-4 py-2 text-black"
            />

            <Label>Notes</Label>
            <Input
              {...register("description", {
                required: "Description is required",
              })}
              type="description"
              className="h-[10rem] w-full"
            />
            <Button
              type="submit"
              className="w-full rounded-lg bg-black text-white disabled:opacity-75"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddJob
