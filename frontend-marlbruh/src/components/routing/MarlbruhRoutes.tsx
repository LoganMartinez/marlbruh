import { HashRouter, Route, Routes } from "react-router-dom";
import {
  BookclubErrorBoundary,
  ChoresErrorBoundary,
  FishErrorBoundary,
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
        <Route path="/fish" element={<FishErrorBoundary />} />
      </Routes>
    </HashRouter>
  );
};

export default MarlbruhRoutes;
