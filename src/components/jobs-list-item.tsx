import { readJobsSchema } from "@/db/schema";
import { formatMoney, relativeDate } from "@/lib/utils";
import {
  BanknoteIcon,
  BriefcaseIcon,
  ClockIcon,
  Globe2Icon,
  MapPinIcon,
} from "lucide-react";
import Image from "next/image";
import z from "zod";
import Badge from "./badge";

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
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl ?? "/company-logo-placeholder.png"}
        alt={companyName}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <BriefcaseIcon size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPinIcon size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2Icon size={16} className="shrink-0" />
            {location ?? "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <BanknoteIcon size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <ClockIcon size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <ClockIcon size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
};

export default JobsListItem;
