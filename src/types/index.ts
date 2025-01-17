export type AuthType = {
  name: string;
  theme: string | number;
  docsId: string | number;
  idSegurado: string;
  idSeguro: string;
  idSinistroCobertura: string;
  idSinistro: string;
  idUsuario: string;
  nmCobertura: string;
  dtCobertura: string;
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

export type statusUploadType = "pending" | "success" | "error" | null;

export type Doc = {
  id: string;
  Nome: string;
  type: FileIconType;
  file: File | null;
  checked: boolean;
  description: string | null;
  CampoApi: string;
  statusUpload?: statusUploadType;
  CamposExtrairOcr?: string | null;
  ChaveDocumento?: string | null;
  ContentTypeFile?: string | null;
  DestinatarioFile?: string | null;
  Fixo?: boolean;
  IdSegurado?: number;
  IdSeguro?: number;
  IdSinistro?: number;
  IdSinistroCobertura?: number;
  IdUsuario?: number;
  ModelClassificarOcr?: string | null;
  ModelExtrairOcr?: string | null;
  NameFile?: string | null;
  Obrigatorio?: boolean;
  ObrigatorioInicial?: boolean;
  PathFile?: string | null;
  PercentualOcr?: number;
  Qtd?: string;
  TipoDocOcr?: string | null;
  TpDocumento?: string | null;
  Type?: string;
  Visual?: boolean;
};

export type updateDoc = Partial<Doc>;
