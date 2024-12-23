import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import useAuthStore from "./stores/authentication";
import PageGuard from "./pages/PageGuard";
import DocsPage from "./pages/DocsPage";

export default function App() {
  const auth = useAuthStore((state) => state.auth);
  // http://localhost:5173/?auth={"name":"alisson","id":123}

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
