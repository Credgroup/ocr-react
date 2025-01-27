import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import useAuthStore from "./stores/authentication";
import PageGuard from "./pages/PageGuard";
import DocsPage from "./pages/DocsPage";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/NotFound";
import AuthDenied from "./pages/AuthDenied";

export default function App() {
  const auth = useAuthStore((state) => state.auth);

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
        <Route
          path="/docs"
          element={<PageGuard Page={DocsPage} auth={auth} />}
        />
        <Route path="/authdenied" element={<AuthDenied />} />
      </Routes>
    </Router>
  );
}
