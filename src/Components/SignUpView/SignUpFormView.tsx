import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useViewModel } from "../../Observable/useViewModel";
import { handleSubmit, sendText } from "../../utils/uiUtils";
import SignUpViewModel from "./SignUpViewModel";
import ErrorMessage from "../ErrorMessage";

function SignUpFormView() {
  const viewModel = useViewModel(SignUpViewModel);

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(viewModel.signUpButtonTapped.exec)}
      spacing={2}
    >
      <TextField
        label="Email"
        variant="outlined"
        value={viewModel.emailTyped.result()}
        onChange={sendText(viewModel.emailTyped.exec)}
        disabled={viewModel.signUpButtonTapped.isLoading}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={viewModel.passwordTyped.result()}
        onChange={sendText(viewModel.passwordTyped.exec)}
        disabled={viewModel.signUpButtonTapped.isLoading}
      />
      <TextField
        label="Repite tu password"
        variant="outlined"
        type="password"
        value={viewModel.passwordVerificationTyped.result()}
        onChange={sendText(viewModel.passwordVerificationTyped.exec)}
        disabled={viewModel.signUpButtonTapped.isLoading}
      />
      <LoadingButton
        loading={viewModel.signUpButtonTapped.isLoading}
        type="submit"
        variant="contained"
      >
        Registrar
      </LoadingButton>
      <ErrorMessage error={viewModel.signUpButtonTapped.error} />
    </Stack>
  );
}

export default SignUpFormView;
