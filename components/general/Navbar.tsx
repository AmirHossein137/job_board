import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="flex items-center justify-between py-5">
      <Link href={"/"}>Logo</Link>
      <div className="flex items-center gap-6">
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
      </div>
    </div>
  );
};

export default Navbar;
