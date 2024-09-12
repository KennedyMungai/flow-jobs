import JobsListItem from "@/components/jobs-list-item";
import { db } from "@/db/drizzle";
import { jobs, readJobsSchema } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const HomePage = async () => {
  const availableJobsQuery = await db
    .select()
    .from(jobs)
    .where(eq(jobs.approved, true))
    .orderBy(desc(jobs.createdAt));

  const availableJobs = readJobsSchema.array().parse(availableJobsQuery);

  return (
    <main className="h-full overflow-y-auto overflow-x-clip">
      {availableJobs.map((job) => (
        <JobsListItem key={job.id} job={job} />
      ))}
    </main>
  );
};

export default HomePage;
