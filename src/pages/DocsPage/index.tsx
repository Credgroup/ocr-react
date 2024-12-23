import Avatar from "@/components/Avatar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScreenContainer, SmallContainer } from "@/components/Layout/Conainer";

export default function DocsPage() {
  return (
    <ScreenContainer className="min-h-screen bg-white-200">
      <Header headerStyles={{
        background: "https://wkfkeepinsmarsh.blob.core.windows.net/arquivamento/documentos/multicanal/whatsapp/interacoes/15001/background1.png",
        backgroundType: "img"
      }} />
      <SmallContainer className="mb-12">
        <Avatar/>
        <h1>Olá Luciana Torres!</h1>
        <p>Seja bem vindo ao OCR Keepins</p>
      </SmallContainer>
      <Footer
        address="Avenida dos Autonomistas, nº 1496, Vila Yara, Osasco/SP - CEP 06.020-902"
        contacts={[
          { type: "email", content: "renan.lima@keepins.com.br" },
          { type: "telefone", content: "11987654321" },
        ]}
        logoImage="https://wkfkeepinsmarsh.blob.core.windows.net/arquivamento/documentos/multicanal/whatsapp/interacoes/15001/logo2.png"
        styles={{
          backgroundColor: "#e1e1e1",
          textColor: "",
          titleColor: "",
        }}
      />
    </ScreenContainer>
  );
}
