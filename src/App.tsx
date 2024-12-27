import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import useAuthStore from "./stores/authentication";
import PageGuard from "./pages/PageGuard";
import DocsPage from "./pages/DocsPage";

export default function App() {
  const auth = useAuthStore((state) => state.auth);
  // http://localhost:5173/?auth={"name":"alisson","id":123}&docs=%5B%7B%22id%22%3A%221%22%2C%22title%22%3A%22RG%20(Frente%20e%20Verso)%22%2C%22description%22%3A%22Fa%C3%A7a%20o%20upload%20do%20seu%20RG%22%2C%22file%22%3Anull%7D%2C%7B%22id%22%3A%222%22%2C%22title%22%3A%22Protocolo%20de%20Atendimento%22%2C%22description%22%3A%22Envie%20o%20protocolo%20recebido%20na%20solicita%C3%A7%C3%A3o%22%2C%22file%22%3Anull%7D%2C%7B%22id%22%3A%223%22%2C%22title%22%3A%22Carteira%20do%20Posto%22%2C%22description%22%3A%22Envie%20a%20carteira%20do%20posto%20de%20atendimento%22%2C%22file%22%3Anull%7D%5D
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
