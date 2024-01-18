import { Button } from "@/components/ui/button";
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
import { PlusIcon } from "@radix-ui/react-icons";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ApiService } from "@/services/api.service";
import Cookies from "js-cookie";
import { useToast } from "../ui/use-toast";

type FormData = {
  description: string;
  picture: FileList;
};

export function AddPost() {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const api = new ApiService(Cookies.get("token")!);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onSubmit = handleSubmit(async ({ description, picture }) => {
    setOpen(false);
    const formData = new FormData();
    formData.append("description", description);
    formData.append("picture", picture[0]);
    await api.addPost(formData);
    setTimeout(() => {
      toast({
        title: "Post ajouté",
        description: "Votre post a bien été ajouté",
      });
    }, 1000);
  });

  return (
    <Drawer open={open}>
      <DrawerTrigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
        className="cursor-pointer"
      >
        <PlusIcon
          className="border-2 border-primary rounded-lg size-7 p-1"
          scale={3}
        />
      </DrawerTrigger>
      <DrawerContent>
        {loading ? (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">Loading...</div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Créer un post</DrawerTitle>
              <DrawerDescription>
                Renseigner une image et une description.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <form onSubmit={onSubmit} className=" space-y-2 ">
                <Input
                  type="file"
                  {...register("picture")}
                  accept="image/*"
                  className="w-full"
                />
                {/* Description */}
                <Input
                  type="text"
                  {...register("description")}
                  placeholder="Description"
                />
                <Button type="submit" className="w-full">
                  Créer
                </Button>
              </form>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Annuler
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
