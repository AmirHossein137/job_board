import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  buttonText,
  description,
  href,
  title,
}) => {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-bold">{title}</h2>
      <p className="mb-8 mt-2 text-center text-sm leading-tight text-muted-foreground">
        {description}
      </p>
      <Link href={href} className={buttonVariants()}>
        <PlusCircle /> {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;
