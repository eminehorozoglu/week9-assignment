
import {db} from "@/app/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function UpdateProfile({params}){
  const { userId } = await auth();
  console.log(userId)
  const slug = await params;
  console.log (slug);
  const oneProfile = await db.query(`SELECT * FROM profile WHERE id = $1`, [
    slug.id,
  ]);
  console.log(oneProfile);
  const wrangledProfile = oneProfile.rows[0];
  console.log(wrangledProfile);
  const userforsocial_id = await db.query(`SELECT * FROM userforsocial WHERE user_id = $1`, [
    userId,
  ]);
  console.log(userforsocial_id);
  const usersocial_id = userforsocial_id.rows[0];
  console.log(usersocial_id.id)

  async function handleUpdate(formValues) {
    "use server";

    const  firstName = formValues.get("firstname");   
    const  surName = formValues.get("surname");
const  email = formValues.get("email");
const  comment = formValues.get("comment");
const userId = usersocial_id.id;




    await db.query(
      `UPDATE profile SET firstname = $1, surname = $2, email = $3, comment = $4, userforsocial_id = $5 WHERE id = $6`,
      [firstName, surName, email, comment, userId, slug.id]
    );

    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <>
      <form action={handleUpdate} className="flex flex-col items-center">
        <label htmlFor="firstname">First name: </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          className="text-amber-900 bg-amber-200"
          defaultValue={wrangledProfile.firstname}
        />

        <label htmlFor="surname">Sur name: </label>
        <input
          type="text"
          name="surname"
          id="surname"
          className="text-amber-900 bg-amber-200"
          defaultValue={wrangledProfile.surname}
        />

        <label htmlFor="email">email: </label>
        <input
          type="text"
          name="email"
          id="email"
          className="text-amber-900 bg-amber-200"
          defaultValue={wrangledProfile.email}
        />

        <label htmlFor="comment">Imformation: </label>
        <textarea
          name="comment"
          id="comment"
          rows="3" cols="50"
          className="text-amber-900 bg-amber-200"
          defaultValue={wrangledProfile.comment}
        />


       

<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit data</button>

    
      </form>
    </>
  );
}