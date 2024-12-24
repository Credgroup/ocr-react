import Avatar from "@/components/Avatar";
import DocItem from "@/components/DocItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScreenContainer, SmallContainer } from "@/components/Layout/Conainer";
import { FiCalendar, FiShield } from "react-icons/fi";

export default function DocsPage() {
  return (
    <ScreenContainer className="min-h-screen bg-white-200">
      <Header
        headerStyles={{
          background:
            "https://wkfkeepinsmarsh.blob.core.windows.net/arquivamento/documentos/multicanal/whatsapp/interacoes/15001/background1.png",
          backgroundType: "img",
        }}
      />
      <SmallContainer className="mb-12">
        <Avatar />
        <h1 className="text-2xl font-bold leading-none">Olá Luciana Torres!</h1>
        <p className="text-base mb-6 mt-3">
          Recebemos a sua solicitação de uso da cobertura{" "}
          <span>
            <b>Nome da Cobertura</b>
          </span>{" "}
          Para prosseguir, é necessário o envio de alguns documentos para
          aprovação da sua solicitação
        </p>
        <div className="flex flex-row justify-start gap-20 mb-6 ">
          <div className="item flex flex-row gap-2 justify-start items-start">
            <FiShield />
            <div className="flex flex-col gap-1">
              <h3 className="uppercase text-sm font-bold leading-none">
                Cobertura
              </h3>
              <p className="text-sm font-normal">Lesão temporária</p>
            </div>
          </div>
          <div className="item flex flex-row gap-2 justify-start items-start">
            <FiCalendar />
            <div className="flex flex-col gap-1">
              <h3 className="uppercase text-sm font-bold leading-none">
                Data da solicitação
              </h3>
              <p className="text-sm font-normal">00/00/0000 às 00:00</p>
            </div>
          </div>
        </div>
        <DocItem />
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
