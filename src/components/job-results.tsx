import "server-only";

import { db } from "@/db/drizzle";
import { jobs, readJobsSchema } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import JobsListItem from "./jobs-list-item";

const JobResults = async () => {
  const availableJobsQuery = await db
    .select()
    .from(jobs)
    .where(eq(jobs.approved, true))
    .orderBy(desc(jobs.createdAt));

  const availableJobs = readJobsSchema.array().parse(availableJobsQuery);

  return (
    <div className="mb-4 grow space-y-8">
      {availableJobs.map((job) => (
        <JobsListItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobResults;
