
import { SignIn } from "@clerk/nextjs";
import {db} from "@/app/utils/dbConnection";
import Link from "next/link";
export default async function AllUserProfilePage() {

  const profiledata = await db.query(` SELECT * from profile order by firstname asc`);
        console.log(profiledata);
        const wrangleData = profiledata.rows;
        console.log(wrangleData);      

    return(
        <>


{
  wrangleData.map((data)=><div key={data.id} className="flex flex-col items-center"  >
    <Link href={`/all-profile/${data.id}`} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full text-4xl ">{data.firstname} {data.surname}</Link>
   
  </div>)
  
}

</>
    
  

)
}