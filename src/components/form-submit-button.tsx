"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

const FormSubmitButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full"
      disabled={props.disabled || pending}
      {...props}
    >
      <span className="flex items-center justify-center gap-1">
        {pending ? <Loader2Icon className="size-4 animate-spin" /> : children}
      </span>
    </Button>
  );
};

export default FormSubmitButton;
