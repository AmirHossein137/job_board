/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/app/utils/db";
import { inngest } from "@/app/utils/inngest/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const handleJobExpiration = inngest.createFunction(
  { id: "job-expiration" },
  { event: "job/created" },

  async ({ event, step }) => {
    const { jobId, expirationDats } = event.data;
    await step.sleep("wait-for-expiration", `${expirationDats}d`);
    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: {
          id: jobId,
        },
        data: {
          status: "EXPIRED",
        },
      });
    });

    return { jobId, message: "Job marked as expired" };
  }
);

export const sendPeriodicJobListings = inngest.createFunction(
  { id: "send-job-listings" },
  { event: "jobseeker/created" },

  async ({ event, step }) => {
    const { userId, email } = event.data;
    const totalDays = 30;
    const intervalDays = 2;
    let currentDay = 0;

    while (currentDay < totalDays) {
      await step.sleep("wait-interval", `${intervalDays}d`);
      currentDay += intervalDays;

      const recentJobs = await step.run("fetch-recent-jobs", async () => {
        return await prisma.jobPost.findMany({
          where: {
            status: "DRAFT",
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
          include: {
            company: {
              select: {
                name: true,
              },
            },
          },
        });
      });

      if (recentJobs.length > 0) {
        await step.run("send-email", async () => {
          const jobListingsHtml = recentJobs
            .map(
              (job) =>
                `
            <div style="margin-bottom:20px; padding : 15px; border: 1px solid #eee; border-radius: 5px;">
            <h3 style="margin : 0;">${job.jobTitle}</h3>
            <p style="margin:5px 0;">
              ${job.company.name} . ${job.location}
            </p>
            <p style="margin:5px 0;">
              $${job.salaryFrom.toString()} - $${job.salaryTo.toString()}
            </p>
            </div> `
            )
            .join("");

          await resend.emails.send({
            from: "JobBoard <onboarding@resend.dev>",
            to: ["amirhossein.hossseiini1372@gmail.com"],
            subject: "Latest Job Opportniues for you",
            html: `
              <div style="font-family : Arial, sans-serif; max-width:600px; margin: 0 auto;">
              <h2>Lastest Job Opportunities</h2>
              ${jobListingsHtml}
              <div style="margin-top : 30px; text-align:center;">
                <a href=${process.env.NEXT_PUBLIC_URL}>
                View More</a>
              </div>
              </div>
            `,
          });
        });
      }
    }

    return { userId, message: "Compeleted 30 day job listing notifications" };
  }
);
