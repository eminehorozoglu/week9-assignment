import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function UsereNotFound() {
  return (
    <>
    <div className="flex flex-col items-center">
      <h1 className="text-3xl">Sorry, Please Sing In. If you do not have an account, please Sing Up.
      </h1>
      <Link href={"/sign-in"}>
      <button className="bg-orange-500 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full">Please Sign In</button>
      </Link>
      </div>
    </>
  );
}