import { FooterContact } from "@/types";
import { create } from "zustand";
// Tipos para os estilos do Header e Footer
type BackgroundType = "img" | "color";

type HeaderStyles = {
  backgroundType: BackgroundType;
  background: string; // URL da imagem ou cor hexadecimal
};

type FooterStyles = {
  backgroundColor: string;
  textColor: string;
  titleColor: string;
};

type FooterContent = {
  logoImage: string;
  contacts?: FooterContact[] | [];
  address: string;
};

// Tipos para atualização dos estilos
type UpdateHeaderStyles = Partial<HeaderStyles>;
type UpdateFooterStyles = Partial<FooterStyles>;
// type UpdateFooterContent = Partial<FooterContent>;

// Criação da store usando Zustand
const useThemeStore = create<{
  headerStyles: HeaderStyles;
  footerStyles: FooterStyles;
  footerContent: FooterContent;
  setHeaderStyles: (styles: HeaderStyles) => void;
  updateHeaderStyles: (styles: UpdateHeaderStyles) => void;
  setFooterStyles: (styles: FooterStyles) => void;
  updateFooterStyles: (styles: UpdateFooterStyles) => void;
  setFooterContent: (content: FooterContent) => void;
}>((set) => ({
  headerStyles: {
    backgroundType: "color",
    background: "#ffffff", // Cor padrão
  },
  footerStyles: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    titleColor: "#ff0000",
  },
  footerContent: {
    logoImage: "",
    address: "",
    contacts: [],
  },
  // Define os estilos completos do Header
  setHeaderStyles: (styles) => set({ headerStyles: styles }),

  // Atualiza os estilos do Header parcialmente
  updateHeaderStyles: (styles) =>
    set((state) => ({
      headerStyles: { ...state.headerStyles, ...styles },
    })),

  // Define os estilos completos do Footer
  setFooterStyles: (styles) => set({ footerStyles: styles }),

  // Atualiza os estilos do Footer parcialmente
  updateFooterStyles: (styles) =>
    set((state) => ({
      footerStyles: { ...state.footerStyles, ...styles },
    })),

  setFooterContent: (content) => {
    set(() => ({
      footerContent: { ...content },
    }));
  },
}));

export default useThemeStore;
