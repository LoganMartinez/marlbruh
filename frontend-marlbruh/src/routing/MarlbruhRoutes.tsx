import { HashRouter, Route, Routes } from "react-router-dom";
import {
  BookclubErrorBoundary,
  ChoresErrorBoundary,
  HomeErrorBoundary,
  PickleErrorBoundary,
} from "./ErrorBoundaryPage";

const MarlbruhRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeErrorBoundary />} />
        <Route path="/chores" element={<ChoresErrorBoundary />} />
        <Route path="/bookclub" element={<BookclubErrorBoundary />} />
        <Route path="/pickle" element={<PickleErrorBoundary />} />
      </Routes>
    </HashRouter>
  );
};

export default MarlbruhRoutes;
