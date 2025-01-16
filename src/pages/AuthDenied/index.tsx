export default function AuthDenied() {
  const enviroment = import.meta.env.VITE_ENVIRONMENT_VARIABLE;
  const appVersion = import.meta.env.VITE_IMAGE_VERSION;
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="flex justify-center items-center gap-4 flex-col text-black-800">
        <h1 className="text-2xl font-semibold">Não autorizado</h1>
        <p className="max-w-md text-center">
          O link que você clicou está incompleto ou não tem autorização para
          acessar essa página.
        </p>
      </div>
      <span className="fixed bottom-6 text-black-100 capitalize">
        {enviroment} - v{appVersion}
      </span>
    </div>
  );
}
