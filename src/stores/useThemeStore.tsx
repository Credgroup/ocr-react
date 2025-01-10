import { FooterStyles } from "@/types";
import { create } from "zustand";
// Tipos para os estilos do Header e Footer
type BackgroundType = "img" | "color";

type HeaderStyles = {
  backgroundType: BackgroundType;
  background: string;
  avatarBackground: string;
  avatarBorder: string;
  avatarTextColor: string;
};

type PageContent = {
  buttonColor: string;
  textButtonColor: string;
  iconColor: string;
};

// Tipos para atualização dos estilos
type UpdateHeaderStyles = Partial<HeaderStyles>;
type UpdateFooterStyles = Partial<FooterStyles>;
type updatePageContent = Partial<PageContent>;
// type UpdateFooterContent = Partial<FooterContent>;

// Criação da store usando Zustand
const useThemeStore = create<{
  headerStyles: HeaderStyles;
  footerStyles: FooterStyles;
  pageContent: PageContent;
  setHeaderStyles: (styles: HeaderStyles) => void;
  updateHeaderStyles: (styles: UpdateHeaderStyles) => void;
  setFooterStyles: (styles: FooterStyles) => void;
  updateFooterStyles: (styles: UpdateFooterStyles) => void;
  updatePageContent: (styles: updatePageContent) => void;
  setPageContent: (content: PageContent) => void;
}>((set) => ({
  headerStyles: {
    backgroundType: "color",
    background: "#ffffff",
    avatarBackground: "#fff",
    avatarBorder: "#f1f1f1",
    avatarTextColor: "#000",
  },
  footerStyles: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    titleColor: "#ff0000",
    logoImage: "",
    address: "",
    contacts: [],
  },
  pageContent: {
    buttonColor: "#D9D9D9",
    textButtonColor: "#000",
    iconColor: "#000",
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

  setPageContent: (content) =>
    set(() => ({
      pageContent: { ...content },
    })),

  updatePageContent: (content) =>
    set((state) => ({
      pageContent: { ...state.pageContent, ...content },
    })),
}));

export default useThemeStore;
