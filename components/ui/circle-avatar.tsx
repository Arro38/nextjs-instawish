import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CircleAvatar({
  src,
  alt,
  size = "lg",
}: {
  src: string;
  alt: string;
  size?: "sm" | "lg" | "md";
}) {
  return (
    <Avatar
      className={
        size === "lg" ? " h-16 w-16" : size === "md" ? "h-14 w-14" : ""
      }
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
}
