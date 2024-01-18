import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useAppSelector } from "@/hooks/redux/useStore";
import autoAnimate from "@formkit/auto-animate";

export function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer ">Mon compte</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editer son profil</DialogTitle>
            <DialogDescription>
              Effectuer des changements sur votre profil ici. Cliquez sur
              enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="p-1 cursor-pointer">Mon compte</div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editer son profil</DrawerTitle>
          <DrawerDescription>
            Effectuer des changements sur votre profil ici. Cliquez sur
            enregistrer lorsque vous avez terminé.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
//TODO SEND EDIT PROFILE FORM
function ProfileForm({ className }: React.ComponentProps<"form">) {
  const me = useAppSelector((state) => state.users.user);
  const [showFileInput, setShowFileInput] = React.useState(false);
  const parent = React.useRef(null);
  React.useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  return (
    <>
      {me && (
        <>
          <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                defaultValue={me.email}
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input id="username" defaultValue={me.username} name="username" />
            </div>
            {/* profilePicture */}
            <div className="grid gap-2" ref={parent}>
              <Label htmlFor="imageUrl">Image de profil</Label>
              {!showFileInput && (
                <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + me.imageUrl}
                  alt={me.username}
                  className="w-20"
                />
              )}
              <Button
                variant={showFileInput ? "destructive" : "outline"}
                onClick={() => setShowFileInput(!showFileInput)}
              >
                {showFileInput ? "Annuler" : "Changer"}
              </Button>
              {showFileInput && (
                <Input type="file" id="imageUrl" name="imageUrl" />
              )}
            </div>
            <Button type="submit">Sauvegarder les changements</Button>
          </form>
        </>
      )}
    </>
  );
}
