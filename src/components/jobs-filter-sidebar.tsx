import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/db/drizzle";
import { jobs } from "@/db/schema";
import { jobTypes } from "@/lib/job-types";
import { eq } from "drizzle-orm";
import Select from "./select";

const filterJobs = async (formData: FormData) => {
  "use server";
};

const JobsFilterSidebar = async () => {
  const distinctLocations = (await db
    .selectDistinctOn([jobs.location], { location: jobs.location })
    .from(jobs)
    .where(eq(jobs.approved, true))
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              type="search"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="job-type">Job Type</Label>
            <Select id="job-type" name="job-type" defaultValue={""}>
              <option value="">All types</option>
              {jobTypes.map((jobType) => (
                <option
                  key={jobType}
                  value={jobType}
                  className="p-2 font-medium"
                >
                  {jobType}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={""}>
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option
                  key={location}
                  value={location}
                  className="p-2 font-medium"
                >
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-primary"
            />
            <Label htmlFor="remote">Remote Jobs</Label>
          </div>
          <Button type="submit" className="w-full">
            Filter Jobs
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default JobsFilterSidebar;
