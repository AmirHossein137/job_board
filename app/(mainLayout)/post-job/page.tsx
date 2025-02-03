/* eslint-disable react/no-unescaped-entities */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import ArjectLogo from "@/public/arcjet.jpg";
import IngestLogo from "@/public/inngest-locale.png";
import Image from "next/image";
import CreateJobForm from "@/components/forms/CreateJobForm";
import { prisma } from "@/app/utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "@/app/utils/requireUser";

const companies = [
  { id: 0, name: "Arject", logo: ArjectLogo },
  { id: 1, name: "Inngest", logo: IngestLogo },
  { id: 2, name: "Arject", logo: ArjectLogo },
  { id: 3, name: "Inngest", logo: IngestLogo },
  { id: 4, name: "Arject", logo: ArjectLogo },
  { id: 5, name: "Inngest", logo: IngestLogo },
];

const testimonials = [
  {
    quote:
      "We found our ideal candidate within 48 hours of posting. the quality of applicants was exceptional!",
    author: "Sarah Chen",
    company: "TechCrop",
  },
  {
    quote:
      "We found our ideal candidate within 48 hours of posting. the quality of applicants was exceptional!",
    author: "Mark Johnson",
    company: "StartupX",
  },
  {
    quote:
      "We found our ideal candidate within 48 hours of posting. the quality of applicants was exceptional!",
    author: "Emily Rodriguez",
    company: "InnovateNow",
  },
];

const stats = [
  { id: 0, value: "10k+", label: "Monthly active job seekers" },
  { id: 1, value: "48h", label: "Average time to hire" },
  { id: 2, value: "95%", label: "Employer satisfaction rate" },
  { id: 3, value: "500+", label: "Companies hiring remotely" },
];

async function getCompany(userId: string) {
  const data = await prisma.company.findUnique({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      location: true,
      about: true,
      logo: true,
      xAccount: true,
      website: true,
    },
  });

  if (!data) {
    return redirect("/");
  }
  return data;
}

const PostJobPage = async () => {
  const session = await requireUser();
  const data = await getCompany(session.id as string);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <CreateJobForm
        companyAbout={data.about}
        companyLocation={data.location}
        companyLogo={data.logo}
        companyName={data.name}
        companyWebsite={data.website}
        companyXAccount={data.xAccount}
      />

      <div className="col-span-1">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Trusted by Industry Leaders</CardTitle>
            <CardDescription>
              Join thousands of compaines hiring top talent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Logos */}
            <div className="grid grid-cols-3 gap-4">
              {companies?.map((company) => (
                <div key={company?.id}>
                  <Image
                    src={company?.logo}
                    alt={company?.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {testimonials?.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm text-muted-foreground">
                    "{testimonial?.quote}"
                  </p>
                  <footer className="mt-2 text-sm font-medium">
                    - {testimonial?.author}, {testimonial?.company}
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats?.map((stat) => (
                <div key={stat?.id} className="rounded-lg bg-muted p-4">
                  <h4 className="text-2xl font-bold">{stat?.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat?.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;
