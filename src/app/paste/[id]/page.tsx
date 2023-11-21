// import { useRouter } from "next/router";

import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { PasteEditor } from "./_editor";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  // const router = useRouter();
  const pasteId = params.id;

  if (isNaN(parseInt(pasteId))) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#1b192e] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Link
          href="/"
          className="animate-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text  text-5xl 
            font-extrabold tracking-tight text-transparent
            duration-300
hover:from-indigo-300 hover:via-purple-300 hover:to-indigo-300 sm:text-[5rem]
            "
        >
          Pasta bean
        </Link>
        <PasteLoader pasteId={pasteId} />
      </div>
    </main>
  );
}

async function PasteLoader({ pasteId }: { pasteId: string }) {
  const paste = await api.paste.getById.query({ id: pasteId });
  console.log(paste);
  if (!paste) {
    notFound();
  }

  return (
    <PasteEditor name={paste.name} id={paste.id} content={paste.content} />
  );
}
