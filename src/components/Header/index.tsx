import { ScreenContainer } from "../Layout/Conainer";

type backgroundType = "img" | "color";

type HeaderProps = {
  headerStyles: {
    backgroundType: backgroundType;
    background?: string;
    backgroundColor?: string;
  };
};

export default function Header({ headerStyles }: HeaderProps) {
  return headerStyles.backgroundType === "img" ? (
    <ScreenContainer
      className="bg-no-repeat bg-cover h-44"
      style={{
        backgroundImage: `url(${headerStyles.background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></ScreenContainer>
  ) : (
    <ScreenContainer
      className="h-44"
      style={{ backgroundColor: headerStyles.backgroundColor }}
    ></ScreenContainer>
  );
}
