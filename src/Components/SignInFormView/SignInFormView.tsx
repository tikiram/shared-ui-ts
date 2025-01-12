import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { handleSubmit, sendText } from "../../utils/uiUtils.ts";
import { useViewModel } from "../../Observable/useViewModel.ts";
import SignInViewModel from "./SignInViewModel.ts";
import ErrorMessage from "../ErrorMessage.tsx";

function SignInFormView() {
  const viewModel = useViewModel(SignInViewModel);

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={handleSubmit(viewModel.signInButtonTapped.exec)}
      width={1}
    >
      <TextField
        label="Email"
        variant="outlined"
        value={viewModel.emailTyped.result()}
        onChange={sendText(viewModel.emailTyped.exec)}
        disabled={viewModel.signInButtonTapped.isLoading}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={viewModel.passwordTyped.result()}
        onChange={sendText(viewModel.passwordTyped.exec)}
        disabled={viewModel.signInButtonTapped.isLoading}
      />
      <LoadingButton
        loading={viewModel.signInButtonTapped.isLoading}
        type="submit"
        variant="contained"
      >
        Login
      </LoadingButton>
      <ErrorMessage error={viewModel.signInButtonTapped.error} />
    </Stack>
  );
}

export default SignInFormView;
