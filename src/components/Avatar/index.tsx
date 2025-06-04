import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/authentication";
import useThemeStore from "@/stores/useThemeStore";
import { useEffect, useState } from "react";

export default function Avatar() {
  const avatarStyles = useThemeStore((state) => state.headerStyles);
  const auth = useAuthStore((state) => state.auth);
  const [nome, setNome] = useState("");

  useEffect(() => {
    try {
      let nameParts = auth?.name.split(" ").filter((item) => item);
      let [name1, name2] = "?";
      if (nameParts && nameParts?.length > 1) {
        name1 = nameParts[0][0].toUpperCase()
        name2 = nameParts[1][0].toUpperCase()
      }
      const avatar = name1 + name2;
      setNome(avatar);
    } catch (error: any) {
      setNome("??");
      console.error(error);
      toast({
        title: "Algum erro aconteceu",
        description: error.message,
        variant: "destructive",
      });
    }
  }, []);

  return (
    <div
      className="bg-white-300 flex items-center justify-center text-5xl font-bold rounded-xl relative mt-[-56px] mb-6 aspect-square w-28 h-28 border border-white-400"
      style={{
        background: avatarStyles.avatarBackground,
        border: `1px solid ${avatarStyles.avatarBorder}`,
        color: avatarStyles.avatarTextColor,
      }}
    >
      {nome}
    </div>
  );
}
