import Link from "next/link";
import { Flex, Badge } from "@radix-ui/themes";
import styling from "@/components/component.module.css";


export default async function Menu() {


  return (
    <>

     <nav className={styling.menu} >

  <Flex align="center" gap="5" >
	<Badge variant="solid" radius="full" color="indigo" size="3"> <Link href={"/"}>Home   </Link></Badge>
	<Badge variant="solid" radius="full" color="cyan" size="3"><Link href={"/profile"}>My Profile  </Link></Badge>
	<Badge variant="solid" radius="full" color="crimson" size="3"><Link href={"/all-profile"}>All Users Profile</Link></Badge>
  <Badge variant="solid" radius="full" color="orange" size="3"><Link href={"/post"}>All Post  </Link></Badge>
  <Badge variant="solid" radius="full" color="green" size="3"><Link href={"/user"}>New user  </Link></Badge>
  </Flex>
  </nav>

       

        

       


    </>
  );
}