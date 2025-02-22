import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/app/utils/auth";
import UserDropdown from "./UserDropdown";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-5 justify-center">
        <Image src={"/logo.svg"} alt="Job Logo" width={50} height={50} />
        <span className="text-4xl text-blue-500 font-bold hidden md:flex">
          Job<span className=" text-black dark:text-white">Board</span>
        </span>
      </Link>
      {/* <div className="flex items-center gap-6">
        <ThemeToggle />
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button>LogOut</Button>
          </form>
        ) : (
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div> */}
      {/* Desktop Navigation */}
      <div className="flex items-center gap-5">
        <ThemeToggle />
        <Link className={buttonVariants({ size: "lg" })} href="/post-job">
          Post Job
        </Link>
        {session?.user ? (
          <UserDropdown
            email={session?.user?.email as string}
            name={session?.user?.name as string}
            image={session?.user?.image as string}
          />
        ) : (
          <Link
            className={buttonVariants({ size: "lg", variant: "outline" })}
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
