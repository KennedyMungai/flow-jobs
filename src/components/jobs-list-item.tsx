import z from "zod";
import { readJobsSchema } from "@/db/schema";

type Props = {
  job: z.infer<typeof readJobsSchema>;
};

const JobsListItem = ({
  job: {
    applicationEmail,
    title,
    applicationUrl,
    slug,
    approved,
    companyLogoUrl,
    companyName,
    createdAt,
    description,
    id,
    location,
    locationType,
    salary,
    type,
  },
}: Props) => {
  return <article className="">{title}</article>;
};

export default JobsListItem;
