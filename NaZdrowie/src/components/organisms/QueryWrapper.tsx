import { UseQueryResult } from "@tanstack/react-query";
import { LoadingCard } from "components/molecules";
import { ErrorCard } from "components/molecules/cards/ErrorCard";

type QueryWrapperProps<T> = {
  queries: UseQueryResult<T>[];
  temporaryTitle?: string;
  renderSuccess: (data: T[]) => JSX.Element;
  renderLoading?: () => JSX.Element;
  renderError?: (errors: string[]) => JSX.Element;
};

export const QueryWrapper = <T,>({
  queries,
  temporaryTitle,
  renderSuccess,
  renderLoading,
  renderError,
}: QueryWrapperProps<T>): JSX.Element => {
  const areLoading = queries.some(
    (query) => query.isLoading || query.isFetching,
  );
  const areErrors = queries
    .filter((query) => query.isError)
    .map((q) => q.error.message);
  const areSuccess = queries.every((query) => query.isSuccess);

  if (areLoading) {
    return renderLoading ? (
      renderLoading()
    ) : (
      <LoadingCard title={temporaryTitle} />
    );
  }

  if (areErrors.length > 0) {
    console.error(areErrors);
    return renderError ? (
      renderError(areErrors)
    ) : (
      <ErrorCard
        title={temporaryTitle}
        message={`Błąd w trakcie pobierania informacji: ${areErrors.join(", ")}`}
      />
    );
  }

  if (areSuccess) {
    const data = queries.map((query) => query.data!);
    return renderSuccess(data);
  }

  return null;
};
