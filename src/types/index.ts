export type AuthType = {
  name: string;
  id: number;
};

type FooterContact = {
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
