import {db} from "@/app/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";




export default async function ChangeData({params}){
    const slug = await params;
  console.log (slug);
  const updateData = await db.query(`select * from posts where id = $1`,[slug.id]);
  console.log(updateData);
  const wrangleData = updateData.rows;
  const onedata = updateData.rows[0];
  console.log(onedata);
  async function handleUpdate(formValues) {
    "use server";

    const  postText = formValues.get("post_text");

    await db.query(
      `UPDATE posts SET post_text = $1 WHERE id = $2`,
      [postText, slug.id]
    );


    revalidatePath("/profile");
    redirect("/profile");
  }
  async function handleDelete() {
    "use server";

    //query the db
    await db.query(`DELETE FROM posts WHERE id = $1`, [slug.id]);

    revalidatePath("/profile");
    redirect("/profile");
  }


  return(
    <>


    {
wrangleData.map((data)=><div key={data.id} className="flex flex-col items-center " >
<p className="text-2xl text-red-400">{data.post_text}</p>
</div>)
}

<form action={handleUpdate} className="flex flex-col items-center">
        <label htmlFor="post_text">New Post : </label>
        <textarea
          name="post_text"
          id="post_text"
          rows={3}
          cols={50}
          className="text-amber-900 bg-amber-200"
          defaultValue={onedata.post_text}
        />
<button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full">Update Post</button>
</form>

<form action={handleDelete} className="flex flex-col items-center">
<button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full">Delete Post</button>
</form>
</>)
}