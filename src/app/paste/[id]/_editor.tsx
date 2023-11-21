"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import ReactCodeMirror from "@uiw/react-codemirror";
import React from "react";

interface Props {
  name: string;
  id: string;
  content: string;
}

export function PasteEditor(props: Props) {
  const router = useRouter();
  const [name, setName] = useState(props.name);
  const [content, setContent] = useState(props.content);

  const createPaste = api.paste.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deletePaste = api.paste.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const confirmDelete = () => {
    if (confirm("Do you really want to delete this pasta?")) {
      deletePaste.mutate({ id: props.id });
      router.back();
    }
  };

  const onChange = React.useCallback((val: string) => {
    setContent(val);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPaste.mutate({ id: props.id, name: name, content: content });
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
        {createPaste.isLoading ? "Updating..." : "Update"}
      </button>
      <button
        onClick={confirmDelete}
        className="rounded-full  bg-red-800 px-10 py-3 font-semibold transition hover:bg-red-700"
        disabled={deletePaste.isLoading}
      >
        {deletePaste.isLoading ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
