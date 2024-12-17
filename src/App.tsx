export default function App() {

// Acesse as variáveis com o prefixo VITE_
console.log(import.meta.env.VITE_ENV); // "development"
console.log(import.meta.env.VITE_IMAGE_VERSION); // Exemplo: XXX

const environment = import.meta.env.VITE_ENV;
  const imageVersion = import.meta.env.VITE_IMAGE_VERSION;

  return (
    <>
      <h1>Aplicação React com Vite</h1>
      <p>Ambiente: {environment}</p>
      <p>Versão da Imagem: {imageVersion}</p>
    </>
  );
};