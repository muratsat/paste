import { CreatePaste } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import PasteCard from "./_components/PasteCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#1b192e] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create pastes
        </h1>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const pastes = await api.paste.list.query();
  console.log(pastes);

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
            />
          ))
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div>
    </div>
  );
}
