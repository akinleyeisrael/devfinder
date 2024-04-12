"use client"
import { ModeToggle } from "@/components/mode-toggle";
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";



function AccountDropdown() {
    const session = useSession();
    const [open, setOpen] = useState(false);

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove your
                            account and any data your have.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        {/* <AlertDialogAction
                            onClick={async () => {
                                await deleteAccountAction();
                                signOut({ callbackUrl: "/" });
                            }}
                        >
                            Yes, delete my account
                        </AlertDialogAction> */}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"link"}>
                        <Avatar className="mr-2">
                            <AvatarImage src={session.data?.user?.image ?? ""} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        {session.data?.user?.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={() =>
                            signOut({
                                callbackUrl: "/",
                            })
                        }
                    >
                        <LogOutIcon className="mr-2" /> Sign Out
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <DeleteIcon className="mr-2" /> Delete Account
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export const Header = () => {
    const session = useSession();
    const isLoggedIn = !!session.data;

    return (
        <header className="bg-gray-100 py-2 dark:bg-gray-900 z-10 relative">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    href="/"
                    className="flex gap-2 items-center text-xl hover:underline"
                >
                    <Image
                        src="/icon.jpeg"
                        width="60"
                        height="60"
                        alt="the application icon of a magnifying glass"
                    />
                    DevFinder
                </Link>

                <nav className="flex gap-8">
                    {isLoggedIn && (
                        <>
                            <Link className="hover:underline" href="/browse">
                                Browse
                            </Link>

                            <Link className="hover:underline" href="/your-rooms">
                                Your Rooms
                            </Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-4">
                    {isLoggedIn && <AccountDropdown />}
                    {!isLoggedIn && (
                        <Button onClick={() => signIn()} variant="link">
                            <LogInIcon className="mr-2" /> Sign In
                        </Button>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
