import { HashRouter, Route, Routes } from "react-router-dom";
import {
  BookclubErrorBoundary,
  ChoresErrorBoundary,
  HomeErrorBoundary,
  PickleErrorBoundary,
} from "./ErrorBoundaryPage";
import UserPage from "../pages/UserPages/UserPage";

const MarlbruhRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeErrorBoundary />} />
        <Route path="/chores" element={<ChoresErrorBoundary />} />
        <Route path="/bookclub" element={<BookclubErrorBoundary />} />
        <Route path="/pickle" element={<PickleErrorBoundary />} />
        <Route path="/users/:username" element={<UserPage />} />
      </Routes>
    </HashRouter>
  );
};

export default MarlbruhRoutes;
