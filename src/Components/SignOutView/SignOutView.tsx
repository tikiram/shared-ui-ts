import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useStoreViewModel } from "../../Observable/useViewModel";
import SignOutViewModel from "./SignOutViewModel";

function SignOutView() {
  const viewModel = useStoreViewModel(SignOutViewModel);

  return (
    <Box>
      <LoadingButton
        loading={viewModel.logOutTapped.isLoading}
        onClick={viewModel.logOutTapped.exec}
      >
        Log Out
      </LoadingButton>
      <Typography variant="body2" color="error">
        {viewModel.logOutTapped.error && String(viewModel.logOutTapped.error)}
      </Typography>
    </Box>
  );
}

export default SignOutView;
