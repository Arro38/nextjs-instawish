"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(4, {
      message: "Nom d'utilisateur doit contenir au moins 4 caractères",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre"
      ),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre"
      ),
    profilePicture: z.any(),
    // TODO : Fix profile picture validation
    // .refine((files) => files?.length == 1, "Image is required.")
    // .refine(
    //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //   `Max file size is 5MB.`
    // )
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   ".jpg, .jpeg, .png and .webp files are accepted."
    // ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
      });
    }
  });

export function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profilePicture", profilePicture!);

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "register",
        formData
      );
    } catch (err) {
      console.log(err);
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="Nom d'utilisateur ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="Mot de passe ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="Confirmer le mot de passe ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo de profil</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  onChange={(e) => {
                    setProfilePicture(e.target.files![0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Se connecter
        </Button>
      </form>
    </Form>
  );
}
