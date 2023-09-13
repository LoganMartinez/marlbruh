import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../pages/reusablePages/ErrorPage";
import Home from "../pages/home/Home";
import Chores from "../pages/chores/Chores";
import Bookclub from "../pages/bookclub/Bookclub";
import Pickle from "../pages/picle/Picle";
import Kudos from "../pages/kudos/Kudos";

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

export const KudosErrorBoundary = () => {
  return <ErrorBoundaryPage page={<Kudos />} />;
};

export default ErrorBoundaryPage;
