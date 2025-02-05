import JobFilter from "@/components/general/JobFilter";
import { JobLists } from "@/components/general/JobLists";
import JobListingsLoading from "@/components/general/JobListsLoading";
import { Suspense } from "react";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const jobTypes = params.jobTypes?.split(",") || [];
  const location = params.location || "";

  const filterKey = `page=${currentPage};types=${jobTypes.join(
    ","
  )};location=${location}`;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <JobFilter />
      <div className="col-span-1 lg:col-span-2 flex-col gap-6">
        <Suspense fallback={<JobListingsLoading key={filterKey} />}>
          <JobLists
            currentPage={currentPage}
            jobTypes={jobTypes}
            location={location}
          />
        </Suspense>
      </div>
    </div>
  );
}
