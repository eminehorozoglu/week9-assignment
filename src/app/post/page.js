
import { SignIn } from "@clerk/nextjs";
import {db} from "@/app/utils/dbConnection";
import Link from "next/link";


export const metadata = {
  title: "Social Network Posts",
  description: "You can see all posts this page.",
};





export default async function UserPostPage() {

  const postdata = await db.query(` SELECT posts.id,posts.post_text,posts.userforsocial_id, userforsocial.username from userforsocial join posts on userforsocial.id = posts.userforsocial_id order by posts.id desc`
       );
        console.log(postdata);
        const wrangleData = postdata.rows;
        console.log(wrangleData);      

 
    return(
        <>


        {
wrangleData.map((data)=><div key={data.id} className="flex flex-row items-center" >
<h2 className="text-2xl font-bold ">{data.username} says : </h2>
<p className="text-xl ">{data.post_text}</p>



</div>)
}

</>
    
  

)
}