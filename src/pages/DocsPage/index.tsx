import Avatar from "@/components/Avatar";
import ConfirmSendDocs from "@/components/ConfirmSendDocs";
import DocList from "@/components/DocList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScreenContainer, SmallContainer } from "@/components/Layout/Conainer";
import useAuthStore from "@/stores/authentication";
import useThemeStore from "@/stores/useThemeStore";
import { FiCalendar, FiShield } from "react-icons/fi";

export default function DocsPage() {
  const auth = useAuthStore((state) => state.auth);
  const footerContent = useThemeStore((state) => state.footerContent);
  const footerStylesProp = useThemeStore((state) => state.footerStyles);
  const headerStylesProp = useThemeStore((state) => state.headerStyles);

  return (
    <ScreenContainer className="min-h-screen bg-white-200">
      <Header headerStyles={headerStylesProp && headerStylesProp} />
      <SmallContainer className="mb-12 px-4 md:px-0">
        <Avatar />
        <h1 className="text-2xl font-bold leading-none">Olá {auth?.name}!</h1>
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
        <DocList />
        <ConfirmSendDocs className="mt-6" />
      </SmallContainer>
      <Footer
        address={footerContent?.address}
        contacts={footerContent?.contacts && footerContent.contacts}
        logoImage={footerContent?.logoImage}
        styles={footerStylesProp && footerStylesProp}
      />
    </ScreenContainer>
  );
}
