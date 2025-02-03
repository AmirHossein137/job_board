import { prisma } from "@/app/utils/db";
import EmptyState from "./EmptyState";
import JobCard from "./JobCard";

async function getData() {
  const data = await prisma.jobPost.findMany({
    where: {
      status: "DRAFT",
    },
    select: {
      jobTitle: true,
      id: true,
      salaryFrom: true,
      salaryTo: true,
      employmentType: true,
      location: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          logo: true,
          location: true,
          about: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function JobLists() {
  const data = await getData();
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Jobs Found"
          description="Try searching for a diffrent job title or location"
          buttonText="Clear all filters"
          href="/"
        />
      )}
    </>
  );
}
