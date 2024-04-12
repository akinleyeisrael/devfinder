import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getRooms } from "@/data-access/rooms";
import { db } from "@/db";
import { Room } from "@/db/schema";
import { PencilIcon, GithubIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



export function UserRoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader className="relative">
        <Button className="absolute top-2 right-2" size="icon">
          <Link href={`/edit-room/${room.id}`}>
            <PencilIcon />
          </Link>
        </Button>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* <TagsList tags={splitTags(room.tags)} /> */}
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <TrashIcon className="w-4 h-4 mr-2" /> Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id);
                }}
              >
                Yes, delete
              </AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}


export default async function Home() {
  const rooms = await getRooms()
  return (
    <div className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">

        {rooms.map(room => (
          <UserRoomCard room={room} key={room.id} />
        ))}
      </div>

    </div>
  );
}
