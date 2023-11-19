import Link from "next/link";

interface Props {
  name: string;
  content: string;
  id?: number;
}
const PasteCard = (props: Props) => {
  const card = () => (
    <div className=" w-full min-w-[500px]  rounded-md bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 p-[3px] duration-300 hover:-translate-y-2">
      <div className=" h-full w-full bg-gray-800 p-3 text-start">
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
