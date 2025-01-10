export type AuthType = {
  name: string;
  idSegurado: string,
  idSeguro: string,
  idSinistroCobertura: string,
  idSinistro: string,
  idUsuario: string,
  nmCobertura: string,
  dtCobertura: string,
};

export type FooterContact = {
  type: "telefone" | "email";
  content: string;
};

export type FooterStyles = {
  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
  logoImage: string;
  contacts?: FooterContact[];
  address: string;
};


export type FileIconType = "pdf" | "png" | "jpg" | "unknown" | "jpeg";

export type Doc = {
  id: string;
  Nome: string;
  type: FileIconType;
  campoApi: string;
  checked: boolean;
  description: string | null;
  file: File | null;
  ModelClassificarOcr?: string | null;
  ModelExtrairOcr?: string | null;
  ChaveDocumento?: string | null;
  TpDocumento?: string | null;
  TipoDocOcr?: string | null
  obrigatorio?: boolean;
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
