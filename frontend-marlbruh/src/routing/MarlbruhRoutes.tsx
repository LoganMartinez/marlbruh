import { HashRouter, Route, Routes } from "react-router-dom";
import Chores from "../pages/Chores";
import Bookclub from "../pages/Bookclub";
import Pickle from "../pages/Pickle";
// import { ErrorBoundaryHome } from "./ErrorBoundaries";
import Home from "../pages/Home";
import { ErrorBoundaryPage } from "./ErrorBoundaries";

const MarlbruhRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ErrorBoundaryPage page={<Home />} />} />
        <Route
          path="/chores"
          element={<ErrorBoundaryPage page={<Chores />} />}
        />
        <Route
          path="/bookclub"
          element={<ErrorBoundaryPage page={<Bookclub />} />}
        />
        <Route
          path="/pickle"
          element={<ErrorBoundaryPage page={<Pickle />} />}
        />
      </Routes>
    </HashRouter>
  );
};

export default MarlbruhRoutes;
