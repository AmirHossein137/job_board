"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserTypeForm from "./UserTypeForm";
import CompanyForm from "./CompanyForm";
import JobSeekerForm from "./JobSeekerForm";

type UserSelectionType = "company" | "jobSeeker" | null;

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSelection(type: UserSelectionType) {
    setUserType(type);
    setStep(2);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <UserTypeForm onSelect={handleUserTypeSelection} />;

      case 2:
        return userType === "company" ? <CompanyForm /> : <JobSeekerForm />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-10">
        <Link href="/" className="flex items-center gap-5 justify-center">
          <Image src={"/logo.svg"} alt="Job Logo" width={50} height={50} />
          <span className="text-4xl text-blue-500 font-bold">
            Job<span className=" text-white">Board</span>
          </span>
        </Link>
      </div>

      <Card className="max-w-lg w-full">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
};
export default OnboardingForm;
