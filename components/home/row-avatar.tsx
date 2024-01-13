import { PlusIcon } from "@radix-ui/react-icons";
import CircleAvatar from "../ui/circle-avatar";

function RowAvatar() {
  return (
    // row with scroll horizontal and overflow hidden to hide the scroll bar and the overflow of the row
    <div className="flex overflow-hidden overflow-x-scroll gap-4 w-full no-scrollbar">
      {/* CircleAvatar */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-instagram rounded-full p-1 inline-block"
        >
          <div className="bg-white rounded-full p-1 relative">
            {/* JSX content */}
            <CircleAvatar
              src={"https://github.com/shadcn.png"}
              alt={"EV"}
              size="md"
            />
            <PlusIcon className="border-2 border-primary rounded-lg size-6 p-1 absolute bottom-0 right-0 bg-white" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RowAvatar;
