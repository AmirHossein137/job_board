import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-5 justify-center">
          <Image src={"/logo.svg"} alt="Job Logo" width={50} height={50} />
          <span className="text-4xl text-blue-500 font-bold">
            Job<span className=" text-white">Board</span>
          </span>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
