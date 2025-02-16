import { auth } from "@clerk/nextjs/server";
import { SignUp } from "@clerk/nextjs";
import {db} from "@/app/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";


export const metadata = {
  title: "New User",
  description: "You can create new account",
};

export default async function UserProfilePage() {
  const { userId } = await auth();
  async function handleSubmit(formValues) {
    "use server";
    const  firstName = formValues.get("firstname");   
    const  surName = formValues.get("surname");
const  userName = formValues.get("username");
const  date = formValues.get("date");
const  phoneNumber = formValues.get("phone");
const UserId ={ userId };
console.log(UserId)

if (UserId.length === 0) {
  notFound();
}

db.query(`insert into userforsocial (firstname, surname, username, date,phone, user_id) values ($1, $2,$3, $4 ,$5,$6)`,[firstName,surName,userName,date,phoneNumber,userId]);
revalidatePath(`/user/${userId}`);
redirect(`/create-profile/${userId}`);

}



    return(<>
    <div className="flex flex-col items-center">
    <p className="text-2xl">Hello {userId}</p>
    <p className="text-2xl">Please fill in the form information for register this website</p>
    </div>
    <form action={handleSubmit}  className="flex flex-col items-center">
    <label htmlFor="firstname">First Name:</label>
    <input type="text" name="firstname" id="firstname" className="text-amber-900 bg-amber-200" required />
    <label htmlFor="surname">Sur Name:</label>
    <input type="text" name="surname" id="surname" className="text-amber-900 bg-amber-200" required/>
            <label htmlFor="username">User Name:</label>
            <input type="text" name="username" id="username" className="text-amber-900 bg-amber-200" required />
            <label htmlFor="date">Date of Birth:</label>
            <input type="date" name="date" id="date" className="text-amber-900 bg-amber-200" />
            <label htmlFor="phone">Phone Number:</label>
            <input type="number" name="phone" id="phone" className="text-amber-900 bg-amber-200" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit data</button>
        </form>
       
       
     
    </>)
    }