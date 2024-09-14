import H1 from "@/components/h1";
import JobResults from "@/components/job-results";
import JobsFilterSidebar from "@/components/jobs-filter-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { jobsFilterValues } from "@/lib/validation";
import { Metadata } from "next";

type Props = {
  searchParams: {
    q?: string;
    location?: string;
    type?: string;
    remote?: string;
  };
};

const getTitle = ({ q, location, type, remote }: jobsFilterValues) => {
  const titlePrefix = q
    ? `${q} developer jobs `
    : type
      ? `${type} developer jobs - `
      : remote
        ? "Remote developer jobs "
        : "All developer jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`.trim();
};

export const generateMetadata = ({
  searchParams: { q, location, remote, type },
}: Props): Metadata => {
  return {
    title: `${getTitle({
      q,
      location,
      type,
      remote: remote === "true",
    })} | Flow Jobs`,
  };
};

const HomePage = async ({
  searchParams: { location, q, remote, type },
}: Props) => {
  const filterValues: jobsFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="mx-auto my-10 h-full max-w-4xl space-y-10 overflow-y-auto overflow-x-clip px-3">
      <div className="space-y-5 text-center">
        <div className="">
          <ModeToggle />
        </div>
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobsFilterSidebar />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
};

export default HomePage;
