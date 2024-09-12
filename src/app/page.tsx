import { db } from "@/db/drizzle";
import { jobs } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const HomePage = async () => {
  const availableJobs = await db
    .select()
    .from(jobs)
    .where(eq(jobs.approved, true))
    .orderBy(desc(jobs.createdAt));

  return (
    <main className="h-full overflow-y-auto overflow-x-clip">
      {JSON.stringify(availableJobs)}
    </main>
  );
};

export default HomePage;
