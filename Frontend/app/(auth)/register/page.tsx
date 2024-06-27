import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import RegisterForm  from "./Components/RegisterForm"; 

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};



export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image
          src="/regi.jpg"
          alt="Bled"
          fill={true}
        />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex items-center justify-center mb-3">
              <Link
                href="/"
                className="flex h-9 items-center gap-2 rounded-xl px-2 mb-6"
              >
            
              </Link>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              Registration
            </h1>
            <p className="text-sm text-muted-foreground">Create your account</p>
          </div>
                  <RegisterForm />
        </div>
      </div>
    </div>
  );
}