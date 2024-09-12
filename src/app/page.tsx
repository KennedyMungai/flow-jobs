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
    <main className="mx-auto my-10 h-full max-w-4xl space-y-10 overflow-y-auto overflow-x-clip px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer Jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section>
        <div className="space-y-4">
          {availableJobs.map((job) => (
            <JobsListItem key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
