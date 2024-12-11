import { UseQueryResult } from "@tanstack/react-query";
import { LoadingCard } from "components/molecules";
import { ErrorCard } from "components/molecules/cards/ErrorCard";

type QueryWrapperProps<T> = {
  query: UseQueryResult<T>;
  temporaryTitle: string;
  renderSuccess: (data: T) => JSX.Element;
  renderLoading?: () => JSX.Element;
  renderError?: () => JSX.Element;
};

export const QueryWrapper = <T,>({
  query,
  temporaryTitle,
  renderSuccess,
  renderLoading,
  renderError,
}: QueryWrapperProps<T>): JSX.Element => {
  const { isLoading, isError, isSuccess, data, error } = query;

  if (isLoading) {
    return renderLoading ? (
      renderLoading()
    ) : (
      <LoadingCard title={temporaryTitle} />
    );
  }

  if (isError) {
    console.error(error.message, error.stack);
    return renderError ? (
      renderError()
    ) : (
      <ErrorCard
        title={temporaryTitle}
        message={"Błąd w trakcie pobierania informacji: " + error.message}
      />
    );
  }

  if (isSuccess && data) {
    return renderSuccess(data);
  }

  return null;
};
