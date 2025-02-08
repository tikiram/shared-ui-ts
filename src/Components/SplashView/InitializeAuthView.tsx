import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

import InitializeAuthViewModel from "./InitializeAuthViewModel";
import { useStoreViewModel } from "../../Observable/useViewModel";
import ErrorMessage from "../ErrorMessage";

function InitializeAuthView() {
  const viewModel = useStoreViewModel(InitializeAuthViewModel);

  useEffect(() => {
    viewModel.screenInit.exec();
  }, [viewModel]);

  return (
    <div>
      {viewModel.screenInit.isLoading() && <CircularProgress />}
      {viewModel.screenInit.error() && (
        <ErrorMessage
          error={viewModel.screenInit.error()}
          retryAction={viewModel.screenInit.exec}
        />
      )}
    </div>
  );
}

export default InitializeAuthView;
