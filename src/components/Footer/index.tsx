import { ScreenContainer, SmallContainer } from "../Layout/Conainer";
import { FooterData } from "@/types";

type FooterProps = FooterData;

export default function Footer({
  styles,
  contacts,
  address,
  logoImage,
}: FooterProps) {
  return (
    <ScreenContainer
      className={`py-6 mt-auto`}
      style={{ backgroundColor: styles.backgroundColor }}
    >
      <SmallContainer className="flex flex-col items-center sm:flex-row sm:items-start gap-6 sm:gap-0 text-center sm:text-left sm:justify-between">
        <div className="brand_image relative w-40 sm:max-w-32">
          <img src={logoImage} alt="Logo da empresa" />
        </div>
        <div className="social_medias w-full max-w-40">
          <h4
            className="text-sm uppercase font-semibold mb-2"
            style={{ color: styles.titleColor }}
          >
            Contato
          </h4>
          <ul
            className="flex gap-1 flex-wrap justify-center sm:justify-start text-sm"
            style={{ color: styles.textColor }}
          >
            {contacts &&
              contacts.length > 0 &&
              contacts.map((item, i) =>
                item.type == "telefone" ? (
                  <li className="hover:underline" key={item.content + i}>
                    <a href={`mailto:${item.content}`}>{item.content}</a>
                  </li>
                ) : (
                  <li className="hover:underline" key={item.content + i}>
                    <a href={`tel:${item.content}`}>{item.content}</a>
                  </li>
                )
              )}
          </ul>
        </div>
        <div className="placement w-full max-w-52">
          <h4
            className="text-sm uppercase font-semibold mb-2"
            style={{ color: styles.titleColor }}
          >
            Endereço
          </h4>
          <p
            className="text-sm font-regular"
            style={{ color: styles.textColor }}
          >
            {address}
          </p>
        </div>
      </SmallContainer>
    </ScreenContainer>
  );
}
