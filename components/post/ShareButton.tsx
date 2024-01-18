import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

export function ShareButton({ post }: { post: Post }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PaperPlaneIcon className="size-6" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager lien</DialogTitle>
          <DialogDescription>
            Copier le lien ci-dessous et partager le avec vos amis.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Lien
            </Label>
            <Input
              id="link"
              defaultValue={
                process.env["NEXT_PUBLIC_HOMEPAGE_URL"]! +
                "user/" +
                post.createdBy.id
              }
              readOnly
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(
                process.env["NEXT_PUBLIC_HOMEPAGE_URL"]! +
                  "user/" +
                  post.createdBy.id
              );
            }}
          >
            <span className="sr-only">Copier</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fermer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
