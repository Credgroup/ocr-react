import useAuthStore from "@/stores/authentication";
import useThemeStore from "@/stores/useThemeStore";

export default function Avatar() {
  const avatarStyles = useThemeStore((state) => state.headerStyles);
  const auth = useAuthStore((state) => state.auth);
  const nameParts = auth?.name?.split(" ") ?? ["", ""];
  const [name1, name2] = nameParts;
  const avatar =
    (name1[0] || "?").toUpperCase() + ((name2 && name2[0]) || "").toUpperCase();
  console.log(avatarStyles);
  return (
    <div
      className="bg-white-300 flex items-center justify-center text-5xl font-bold rounded-xl relative mt-[-56px] mb-6 aspect-square w-28 h-28 border border-white-400"
      style={{
        background: avatarStyles.avatarBackground,
        border: `1px solid ${avatarStyles.avatarBorder}`,
        color: avatarStyles.avatarTextColor,
      }}
    >
      {avatar}
    </div>
  );
}
