import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import {db} from "@/app/utils/dbConnection";
import { notFound } from "next/navigation";
import "@radix-ui/themes/styles.css";
import { Theme, Button } from "@radix-ui/themes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";



export default async function UserProfilePage() {
  const { userId } = await auth();
  console.log({userId});
 


  const profiledata = await db.query(` SELECT profile.id,profile.firstname,profile.surname,profile.email,profile.comment,profile.userforsocial_id from userforsocial join profile on userforsocial.id = profile.userforsocial_id where userforsocial.user_id =$1`, [
     userId,
        ]);
        console.log(profiledata);
        const wrangleData = profiledata.rows;
        console.log(wrangleData); 
     const wrangleDataId = wrangleData[0];
        if (wrangleData.length === 0) {
            notFound();
          }
 
          const postdata = await db.query(` SELECT posts.id,posts.post_text,posts.userforsocial_id, userforsocial.username from userforsocial join posts on userforsocial.id = posts.userforsocial_id where userforsocial.user_id =$1 order by posts.id desc`, [
    userId,
       ]);
       console.log(postdata);
       const wrangleDataPost = postdata.rows;
       console.log(wrangleDataPost);      

async function handleSubmit(formValues) {
    "use server";
 const  post = formValues.get("post"); 


db.query(`insert into posts (post_text,userforsocial_id) values ($1, $2)`,[post,wrangleDataId.userforsocial_id]);
revalidatePath("/profile");
redirect("/profile");

}

        return(
            <>
             {
  wrangleData.map((data)=><div key={data.id} className="flex flex-col items-center"  >
    <h2 className="text-5xl ">{data.firstname} {data.surname}</h2>
    <p className="text-xl">{data.email}</p>
    <p className="text-xl">{data.comment}</p>
    <Link href={`/profile/${data.id}`} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full">Update profile</Link>

  
   
  </div>)
  
}

<form action={handleSubmit} className="flex flex-col items-center" >

    <label htmlFor="post" className="text-3xl">Do you want to share something? Just do it !</label>
    <textarea name="post" id="post" className="text-amber-900 bg-amber-200 rounded-xl" rows="3" cols="50"  />
		<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Submit 👋</button>

</form>


        {
wrangleDataPost.map((datapost)=><div key={datapost.id} >
<h2 className="text-3xl font-bold ">{datapost.username}</h2>
<p className="text-2xl ">{datapost.post_text}</p>
<Link href={`/change-post/${datapost.id}`} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full">Change or Delete Posts</Link>

</div>)
}
            </>
        )
}

