"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import ReactCodeMirror from "@uiw/react-codemirror";
import React from "react";

export function CreatePaste() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const createPaste = api.paste.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setContent("");
    },
  });

  const onChange = React.useCallback((val: string) => {
    console.log("val:", val);
    setContent(val);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // createPaste.mutate({ name, content });
        console.log(content);
      }}
      className="flex w-full flex-col gap-4 "
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-auto rounded-xl border-2 border-blue-900 bg-gray-800 px-4 py-2 outline-none focus:border-blue-800"
      />
      <ReactCodeMirror
        value={content}
        onChange={onChange}
        height="400px"
        theme={"dark"}
      />
      <button
        type="submit"
        className="rounded-full  bg-gray-800 px-10 py-3 font-semibold transition hover:bg-gray-700"
        disabled={createPaste.isLoading}
      >
        {createPaste.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
