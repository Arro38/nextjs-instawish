"use client";
import Cookies from "js-cookie";
import { ApiService } from "@/services/api.service";
import { useAppSelector } from "@/hooks/redux/useStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  CrossCircledIcon,
  Pencil1Icon,
  SymbolIcon,
} from "@radix-ui/react-icons";

export default function PostComment({
  comment,
  deleteComment,
  editComment,
}: {
  comment: Comment;
  deleteComment: any;
  editComment: any;
}) {
  const me = useAppSelector((state) => state.users.user);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await editComment(comment.id, e.currentTarget.content.value);
    setShowEdit(false);
    setLoading(false);
  };

  return (
    <>
      <span className="font-bold">{comment.user.username}</span>
      {/* Loading : spinner */}
      {loading ? (
        <SymbolIcon className="size-6 animate-spin" />
      ) : showEdit ? (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="flex gap-2"
        >
          <Input type="text" defaultValue={comment.content} name="content" />
          <Button type="submit">Modifier</Button>
          <Button variant="outline">Annuler</Button>
        </form>
      ) : (
        <>
          <span>{comment.content}</span>
          {me?.id === comment.user.id && (
            <>
              <Pencil1Icon
                className="size-6  cursor-pointer hover:scale-110"
                onClick={() => {
                  setShowEdit(true);
                }}
              />
              <CrossCircledIcon
                className="size-6  cursor-pointer hover:scale-110"
                onClick={async () => {
                  setLoading(true);
                  await deleteComment(comment.id);
                  setLoading(false);
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
