import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CircleAvatar({
  src,
  alt,
  size = "lg",
  avatarFallback,
}: {
  src?: string;
  alt: string;
  avatarFallback?: React.ReactNode;
  size?: "sm" | "lg" | "md";
}) {
  return (
    <Avatar
      className={
        size === "lg" ? " h-16 w-16" : size === "md" ? "h-14 w-14" : ""
      }
    >
      <AvatarImage src={process.env.NEXT_PUBLIC_BASE_URL! + src} alt={alt} />
      <AvatarFallback>{avatarFallback ? avatarFallback : alt}</AvatarFallback>
    </Avatar>
  );
}
