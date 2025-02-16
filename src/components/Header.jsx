import Menu from "./Menu";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
  } from "@clerk/nextjs";
  import { auth } from "@clerk/nextjs/server";

  export default function Header() {
    const { userId } = auth();
    return (
      <>
     
        <div className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>

              <SignInButton />
              <SignUpButton signInFallbackRedirectUrl='/user/${userId}' fallbackRedirectUrl='/user/${userId}'/>
            </SignedOut>
            <SignedIn>
            
              <UserButton />
      
            </SignedIn>
            
            </div>
         
      </>
    );
  }

  