"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux/useStore";
import autoAnimate from "@formkit/auto-animate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { ApiService } from "@/services/api.service";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileForm({
  className,
}: React.ComponentProps<"form">) {
  const me = useAppSelector((state) => state.users.user);
  const [showFileInput, setShowFileInput] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const parent = useRef(null);
  const token = Cookies.get("token")!;
  const api = new ApiService(token);
  const router = useRouter();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
      setFormData(formData);
    }
  }, [profilePicture, formData]);

  useEffect(() => {
    if (username) {
      formData.append("username", username);
      setFormData(formData);
    }
  }, [username, formData]);

  useEffect(() => {
    if (email) {
      formData.append("email", email);
      setFormData(formData);
    }
  }, [email, formData]);

  const handleSave = async () => {
    // e.preventDefault();
    const response = await api.editProfile(formData);
    if (response) {
      Cookies.remove("token");
      router.push("/login");
      setTimeout(() => {
        toast({
          title: "Profil mis à jour",
          description: "Veuillez vous reconnecter",
        });
      }, 1000);
    }
  };

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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">{"Nom d'utilisateur"}</Label>
              <Input
                id="username"
                defaultValue={me.username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* profilePicture */}
            <div className="grid gap-2" ref={parent}>
              <Label htmlFor="imageUrl">Image de profil</Label>
              {!showFileInput && (
                <Image
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
                <Input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  onChange={(e) => setProfilePicture(e.target.files![0])}
                />
              )}
            </div>
            <Button onClick={() => handleSave()}>
              Sauvegarder les changements
            </Button>
          </form>
        </>
      )}
    </>
  );
}
