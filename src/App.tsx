export default function App() {

// Acesse as variáveis com o prefixo VITE_
console.log("teste bacana:")
console.log(import.meta.env.VITE_ENVIRONMENT_VARIABLE); // "development"
console.log(import.meta.env.VITE_IMAGE_VERSION); // Exemplo: XXX

const environment = import.meta.env.VITE_ENVIRONMENT_VARIABLE;
const imageVersion = import.meta.env.VITE_IMAGE_VERSION;
console.log("environment:", environment)
console.log("imageVersion:", imageVersion)

  return (
    <>
      <h1>Aplicação React com Vite</h1>
      <p>Ambiente: {environment}</p>
      <p>Versão da Imagem: {imageVersion}</p>
    </>
  );
};