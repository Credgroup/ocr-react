export default function App() {

  const environment = import.meta.env.VITE_ENVIRONMENT_VARIABLE;
  const imageVersion = import.meta.env.VITE_IMAGE_VERSION;

  return (
    <>
      <h1>Aplicação React com Vite</h1>
      <p>Ambiente: {environment}</p>
      <p>Versão da Imagem: {imageVersion}</p>
    </>
  );
};