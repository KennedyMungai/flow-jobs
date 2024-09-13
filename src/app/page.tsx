import H1 from "@/components/h1";
import JobResults from "@/components/job-results";
import JobsFilterSidebar from "@/components/jobs-filter-sidebar";
import { ModeToggle } from "@/components/mode-toggle";

const HomePage = async () => {
  return (
    <main className="mx-auto my-10 h-full max-w-4xl space-y-10 overflow-y-auto overflow-x-clip px-3">
      <div className="space-y-5 text-center">
        <div className="">
          <ModeToggle />
        </div>
        <H1>Developer Jobs</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobsFilterSidebar />
        <JobResults />
      </section>
    </main>
  );
};

export default HomePage;
