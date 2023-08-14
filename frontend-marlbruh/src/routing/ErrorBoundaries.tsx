import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../pages/ErrorPage";

interface Props {
  page: JSX.Element;
}

export const ErrorBoundaryPage = ({ page }: Props) => {
  return <ErrorBoundary fallback={<ErrorPage />}>{page}</ErrorBoundary>;
};
