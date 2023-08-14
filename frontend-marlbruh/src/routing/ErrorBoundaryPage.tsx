import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Chores from "../pages/Chores";
import Bookclub from "../pages/Bookclub";
import Pickle from "../pages/Pickle";

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

export default ErrorBoundaryPage;
