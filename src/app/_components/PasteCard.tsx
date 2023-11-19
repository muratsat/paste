interface Props {
  name: string;
  content: string;
}
const PasteCard = (props: Props) => {
  return (
    <div className="h-36 w-full min-w-[500px]  rounded-md bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 p-[3px]">
      <div className=" h-full w-full bg-gray-800 p-3">
        <h1 className="text-2xl font-bold">{props.name}</h1>
        <code className="text-xl">{props.content}</code>
      </div>
    </div>
  );
};

export default PasteCard;
