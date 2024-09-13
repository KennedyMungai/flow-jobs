import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/db/drizzle";
import { jobs } from "@/db/schema";
import { eq } from "drizzle-orm";
import Select from "./select";
import { jobTypes } from "@/lib/job-types";

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
                <option key={jobType} value={jobType}>
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
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default JobsFilterSidebar;
