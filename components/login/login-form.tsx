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
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
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
});

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "test4",
      password: "Azerty12345",
    },
  });

  const { login } = useLogin();
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      login(data.username, data.password).then(() => {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        router.push("/");
      });
    } catch (error) {
      // TODO FIX TOAST ERROR ON LOGIN
      console.log(error);
      toast({
        title: "Erreur",
        description: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Nom d'utilisateur"}</FormLabel>
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
        <Button className="w-full" type="submit">
          Se connecter
        </Button>
      </form>
    </Form>
  );
}
