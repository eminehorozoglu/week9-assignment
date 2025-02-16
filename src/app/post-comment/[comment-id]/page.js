import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import {db} from "@/app/utils/dbConnection";
import { notFound } from "next/navigation";


export default async function PostComment(){
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

  const post = await db.query(`select * from posts where id = $1`,[wrangleDataId.id])  ;
  console.log(post) ;
  const PostText = post.rows;
  console.log(PostText) ;    

    return(
        <h1>Post Comment Page</h1>
    )
}