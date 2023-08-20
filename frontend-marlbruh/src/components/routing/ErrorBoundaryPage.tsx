import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../pages/reusablePages/ErrorPage";
import Home from "../pages/Home";
import Chores from "../pages/chores/Chores";
import Bookclub from "../pages/Bookclub";
import Pickle from "../pages/Pickle";
import Fish from "../pages/Fish";

interface Props {
  page: JSX.Element;
}

const ErrorBoundaryPage = ({ page }: Props) => {
  return <ErrorBoundary fallback={<ErrorPage />}>{page}</ErrorBoundary>;
};

export const HomeErrorBoundary = () => {
  return <ErrorBoundaryPage page={<Home />} />;
};

export const ChoresErrorBoundary = () => {
  return <ErrorBoundaryPage page={<Chores />} />;
};

export const BookclubErrorBoundary = () => {
  return <ErrorBoundaryPage page={<Bookclub />} />;
};

export const PickleErrorBoundary = () => {
  return <ErrorBoundaryPage page={<Pickle />} />;
};

export const FishErrorBoundary = () => {
  return <ErrorBoundaryPage page={<Fish />} />;
};

export default ErrorBoundaryPage;
