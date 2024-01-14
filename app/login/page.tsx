import { LoginForm } from "@/components/login/login-form";
import { Separator } from "@/components/ui/separator";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

const dancing_script = Dancing_Script({ subsets: ["latin"], weight: "700" });

export default function Login() {
  return (
    <>
      <h1 className={`${dancing_script.className} text-4xl my-4`}>Instawish</h1>
      {/* Form Login */}
      <LoginForm />
      {/* Separator */}
      <div className="flex items-center justify-center gap-4 w-full">
        <Separator className="w-1/3 bg-slate-950" />
        <span className="text-slate-950">OU</span>
        <Separator className="w-1/3 bg-slate-950" />
      </div>
      {/* Forgot Password */}
      <a
        href="#"
        className="text-primary text-sm pointer-events-none line-through"
      >
        Mot de passe oublié ?
      </a>

      {/* Register */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-slate-950">Vous n'avez pas de compte ?</span>
        <Link href="/register" className="text-sm">
          Inscrivez-vous
        </Link>
      </div>
    </>
  );
}
