import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export const Header = () => {
    const session = useSession();
    return (
        <header>
            <div>
                {session.data ? (
                    <Button onClick={() => signOut()}>SignOut</Button>
                ) : (
                    <Button onClick={() => signIn("google")}>SignIn</Button>
                )}
            </div>
        </header>
    );
};

export default Header;
