import JobFilter from "@/components/general/JobFilter";
import { JobLists } from "@/components/general/JobLists";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />
      <div className="flex col-span-2 flex-col gap-6">
        <JobLists />
      </div>
    </div>
  );
}
