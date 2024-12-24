import useAuthStore from "@/stores/authentication";

export default function Avatar() {
  const auth = useAuthStore((state) => state.auth);
  const nameParts = auth?.name?.split(" ") ?? ["", ""];
  console.log(nameParts);
  const [name1, name2] = nameParts;
  console.log(name1, name2);
  const avatar =
    (name1[0] || "?").toUpperCase() + ((name2 && name2[0]) || "").toUpperCase();

  return (
    <div className="bg-white-300 flex items-center justify-center text-5xl font-bold rounded-xl relative mt-[-56px] mb-6 aspect-square w-28 h-28 border border-white-400">
      {avatar}
    </div>
  );
}
