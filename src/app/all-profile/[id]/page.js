import { SignIn } from "@clerk/nextjs";
import {db} from "@/app/utils/dbConnection";

export default async function OneUserProfile({params}){
    const slug = await params;
    console.log(slug);


    const profiledata = await db.query(` SELECT * from profile where id =$1 `,[
    slug.id
    ]);
           console.log(profiledata);
           const wrangleData = profiledata.rows;
           console.log(wrangleData); 
           const oneData = wrangleData[0];
           console.log (oneData.userforsocial_id);

           const postdata = await db.query(` SELECT * from posts where userforsocial_id=$1 order by posts.id desc`, [
            oneData.userforsocial_id]);
                   console.log(postdata);
                   const wrangleDataPost = postdata.rows;
                   console.log(wrangleDataPost);       
          
    
           return(
               <>
                {
     wrangleData.map((data)=><div key={data.id} className="flex flex-col items-center"  >
       <h2 className="text-5xl ">{data.firstname} {data.surname}</h2>
       <p className="text-xl">{data.email}</p>
       <p className="text-xl text-lime-700">{data.comment}</p>
      
     </div>)
     
    }
<h2 className="flex flex-col items-center text-2xl" >------------------------------------------------------------------------------------------------------------------</h2>
    <h2 className="text-4xl font-bold flex flex-col items-center bg-amber-600 text-amber-50">Posts</h2>
    {

     wrangleDataPost.map((data)=><div key={data.id} className="flex flex-row items-center"  >
        
       <h2 className="text-2xl ">* {data.post_text}</h2>
     
      
     </div>)
     
    }
    
    
    
    
    
               </>
           )
    
    
    
    
}