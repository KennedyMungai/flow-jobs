import "server-only";

import { db } from "@/db/drizzle";
import { jobs, readJobsSchema } from "@/db/schema";
import { jobsFilterValues } from "@/lib/validation";
import { and, desc, eq, not, sql } from "drizzle-orm";
import JobsListItem from "./jobs-list-item";

type Props = {
  filterValues: jobsFilterValues;
};

const JobResults = async ({
  filterValues: { q, location, remote, type },
}: Props) => {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const conditions = [eq(jobs.approved, true)];

  if (searchString) {
    conditions.push(
      sql`to_tsvector('english', ${jobs.title}) @@ to_tsquery('english', ${sql`${searchString}`})`,
    );
  }

  if (location) {
    conditions.push(eq(jobs.location, location));
  }

  if (type) {
    conditions.push(eq(jobs.type, type));
  }

  if (remote !== undefined) {
    if (remote === true) {
      conditions.push(eq(jobs.locationType, "Remote"));
    } else if (remote === false) {
      conditions.push(not(eq(jobs.locationType, "Remote")));
    }
  }

  const availableJobsQuery = await db
    .select()
    .from(jobs)
    .where(and(...conditions))
    .orderBy(desc(jobs.createdAt));

  const availableJobs = readJobsSchema.array().parse(availableJobsQuery);

  return (
    <div className="mb-4 grow space-y-8">
      {availableJobs.length ? (
        availableJobs.map((job) => <JobsListItem key={job.id} job={job} />)
      ) : (
        <p className="mx-auto mt-12 text-center text-xl font-medium text-muted-foreground">
          No jobs found
        </p>
      )}
    </div>
  );
};

export default JobResults;
