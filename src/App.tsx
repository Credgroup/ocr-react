import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import useAuthStore from "./stores/authentication";
import PageGuard from "./pages/PageGuard";
import DocsPage from "./pages/DocsPage";

export default function App() {
  const auth = useAuthStore((state) => state.auth);

  // http://localhost:5173/?auth=%7B%22name%22%3A%22Renan%20Lima%22%2C%22id%22%3A123%7D&docs=%5B%7B%22id%22%3A%221%22%2C%22title%22%3A%22RG%20%28Frente%20e%20Verso%29%22%2C%22description%22%3A%22Fa%C3%A7a%20o%20upload%20do%20seu%20RG%22%2C%22file%22%3Anull%7D%2C%7B%22id%22%3A%222%22%2C%22title%22%3A%22Protocolo%20de%20Atendimento%22%2C%22description%22%3A%22Envie%20o%20protocolo%20recebido%20na%20solicita%C3%A7%C3%A3o%22%2C%22file%22%3Anull%7D%2C%7B%22id%22%3A%223%22%2C%22title%22%3A%22Carteira%20do%20Posto%22%2C%22description%22%3A%22Envie%20a%20carteira%20do%20posto%20de%20atendimento%22%2C%22file%22%3Anull%7D%5D&theme=%7B%22headerStyles%22%3A%7B%22backgroundType%22%3A%22img%22%2C%22background%22%3A%22https%3A%2F%2Fwkfkeepinsmarsh.blob.core.windows.net%2Farquivamento%2Fdocumentos%2Fmulticanal%2Fwhatsapp%2Finteracoes%2F15001%2Fbackground1.png%22%7D%2C%22footerStyles%22%3A%7B%22backgroundColor%22%3A%22%23f0f0f0%22%2C%22backgroundImage%22%3A%22https%3A%2F%2Fwkfkeepinsmarsh.blob.core.windows.net%2Farquivamento%2Fdocumentos%2Fmulticanal%2Fwhatsapp%2Finteracoes%2F15001%2Fbackground1.png%22%2C%22textColor%22%3A%22%23000000%22%2C%22titleColor%22%3A%22%230064ff%22%7D%2C%22content%22%3A%7B%22logoImage%22%3A%22https%3A%2F%2Fwkfkeepinsmarsh.blob.core.windows.net%2Farquivamento%2Fdocumentos%2Fmulticanal%2Fwhatsapp%2Finteracoes%2F15001%2Flogo2.png%22%2C%22address%22%3A%22Endere%C3%A7o%20da%20Keepins%22%2C%22contacts%22%3A%5B%7B%22type%22%3A%22telefone%22%2C%22content%22%3A%22%2811%29%204000-0000%22%7D%2C%7B%22type%22%3A%22email%22%2C%22content%22%3A%22contato%40empresa.com%22%7D%5D%7D%7D

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/*"
          element={
            <>
              <p>Not Found</p>
            </>
          }
        />
        <Route
          path="/docs"
          element={<PageGuard Page={DocsPage} auth={auth} />}
        />
        <Route
          path="/authdenied"
          element={
            <>
              <p>Não autorizado</p>
            </>
          }
        />
      </Routes>
    </Router>
  );
}
