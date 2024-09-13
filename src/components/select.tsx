import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { forwardRef, HTMLProps } from "react";

const Select = forwardRef<HTMLSelectElement, HTMLProps<HTMLSelectElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          {...props}
          className={cn(
            "h-10 w-full appearance-none truncate rounded-md border border-input bg-background py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
        />
        <ChevronDownIcon className="absolute right-3 top-3 size-4 opacity-50" />
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
