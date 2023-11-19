import { CreatePaste } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import PasteCard from "./_components/PasteCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#1b192e] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1
          className="animate-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text  text-5xl 
            font-extrabold tracking-tight text-transparent
            sm:text-[5rem]"
        >
          Pasta bean
        </h1>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const pastes = await api.paste.list.query();

  return (
    <div className="flex  w-full flex-col items-center gap-12">
      <CreatePaste />
      <div className="flex flex-col items-center gap-5">
        {pastes ? (
          pastes.map((paste) => (
            <PasteCard
              key={paste.id}
              name={paste.name}
              content={paste.content}
              id={paste.id}
            />
          ))
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div>
    </div>
  );
}
