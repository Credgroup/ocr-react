export type AuthType = {
  name: string;
  id: number;
};

export type FooterContact = {
  type: "telefone" | "email";
  content: string;
};

type FooterStyles = {
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
};

export type FooterData = {
  styles: FooterStyles;
  logoImage: string;
  contacts?: FooterContact[];
  address: string;
};

export type FileIconType = "pdf" | "png" | "jpg" | "unknown" | "jpeg";

export type Doc = {
  id: string;
  title: string;
  type: FileIconType;
  campoApi: string;
  checked: boolean;
  description: string | null;
  file: File | null;
};

export type updateDoc = {
  type: FileIconType;
  checked: boolean;
  description: string | null;
  file: File | null;
};

// const docExemple: Doc = {
//   id: "1234",
//   title: "Frente documento de identificação",
//   type: "jpg",
//   campoApi: "documentoNaApi",
//   checked: false,
//   description: null,
//   file: null,
// };
