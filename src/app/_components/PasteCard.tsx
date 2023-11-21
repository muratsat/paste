import Link from "next/link";

interface Props {
  name: string;
  content: string;
  id?: string;
}
const PasteCard = (props: Props) => {
  // <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"></div>
  const card = () => (
    <div className="flex max-w-xs flex-col rounded-xl bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 p-[3px] duration-300 hover:-translate-y-2">
      <div className=" h-full w-full rounded-lg bg-gray-800 p-3 text-start">
        <h1 className="text-2xl font-bold">{props.name}</h1>
        {props.content.split("\n").map((line, idx) => (
          <>
            <code key={idx}>{line}</code>
            <br />
          </>
        ))}
      </div>
    </div>
  );
  return props.id ? <Link href={`/paste/${props.id}`}>{card()} </Link> : card();
};

export default PasteCard;
