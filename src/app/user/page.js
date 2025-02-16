import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import {db} from "@/app/utils/dbConnection";
import { notFound } from "next/navigation";
import Link from "next/link";



export const metadata = {
  title: "Social Network Profile",
  description: "Your profile page",
};



export default async function UserProfilePage() {
    const { userId } = await auth();
    console.log({userId});
   
  
  
    const profiledata = await db.query(` SELECT * from userforsocial where user_id =$1`, [
       userId,
          ]);
          console.log(profiledata);
          const wrangleData = profiledata.rows;
          console.log(wrangleData); 
       const wrangleDataId = wrangleData[0];
          if (userId === null) {
              notFound();
            }

  return(
    <Link href={`/user/${userId}`} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full text-4xl flex flex-col items-center "> Create user </Link>
  )
}