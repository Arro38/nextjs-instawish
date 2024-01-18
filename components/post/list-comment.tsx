"use client";
import Cookies from "js-cookie";
import { ApiService } from "@/services/api.service";
import { useAppSelector } from "@/hooks/redux/useStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import autoAnimate from "@formkit/auto-animate";
import PostComment from "./post-comment";

export default function ListComment({
  comments,
  postId,
  setComments,
}: {
  comments: Comment[];
  postId: string;
  setComments: any;
}) {
  const api = new ApiService(Cookies.get("token")!);
  const me = useAppSelector((state) => state.users.user);
  const [content, setContent] = useState("");
  const parent = useRef(null);

  const deleteComment = async (commentId: string) => {
    try {
      await api.deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.log(err);
    }
  };

  const editComment = async (commentId: string, newContent: string) => {
    try {
      await api.editComment(commentId, newContent);
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: newContent }
            : comment
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const addComment = async () => {
    try {
      const newComment = await api.addComment(postId, content);
      setComments([...comments, newComment]);
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addComment();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 my-1 p-2 bg-opacity-30 bg-slate-300 rounded-lg">
      <div className="flex flex-col gap-2" ref={parent}>
        {comments?.map((comment, i) => (
          <div key={i} className="flex gap-2">
            <PostComment
              comment={comment}
              deleteComment={deleteComment}
              editComment={editComment}
            />
          </div>
        ))}
      </div>
      <form className="flex items-center gap-2 w-full" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Ajouter un commentaire..."
          className="w-full bg-transparent border-b border-primary outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">Commenter</Button>
      </form>
    </div>
  );
}
