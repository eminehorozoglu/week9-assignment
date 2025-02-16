import { auth } from "@clerk/nextjs/server";
import {db} from "@/app/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewProfile(){
    const { userId } = await auth();
    console.log({userId})
    const oneuser = await db.query(`SELECT * FROM userforsocial WHERE user_id = $1`, [
        userId,
      ]);
      const wrangleduser = oneuser.rows[0];
      console.log(wrangleduser.id);

    

    async function handleSubmit(formValues) {
      "use server";
      const  firstName = formValues.get("firstname");   
      const  surName = formValues.get("surname");
  const  email = formValues.get("email");
  const  comment = formValues.get("comment");
  const userforsocial_id = wrangleduser.id ;
console.log(wrangleduser.id);

  
  db.query(`insert into profile (firstname, surname, email, comment, userforsocial_id) values ($1, $2,$3, $4 ,$5)`,[firstName,surName,email,comment,userforsocial_id]);
  revalidatePath(`/user/${userId}`);
  redirect("/profile");
  
  }
  
  
  
      return(<>
      
      <p>Hello {userId}</p>
      <p>Please fill in the form information for register this website</p>
      <form action={handleSubmit}  className="flex flex-col items-center">
      <label htmlFor="firstname">First Name:</label>
      <input type="text" name="firstname" id="firstname" className="text-amber-900 bg-amber-200" required defaultValue={wrangleduser.firstname} />
      <label htmlFor="surname">Sur Name:</label>
      <input type="text" name="surname" id="surname" className="text-amber-900 bg-amber-200" required defaultValue={wrangleduser.surname}/>
              <label htmlFor="email">Email Adress:</label>
              <input type="text" name="email" id="email" className="text-amber-900 bg-amber-200" required />
              <label htmlFor="comment">profile description:</label>
              <textarea name="comment" id="comment" rows="4" cols="50" className="text-amber-900 bg-amber-200" required />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit data</button>
          </form>

        
         
       
      </>)
      
}