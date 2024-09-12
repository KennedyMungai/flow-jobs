import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Badge = ({ children }: Props) => {
  return (
    <span className="rounded-full border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
      {children}
    </span>
  );
};

export default Badge;
