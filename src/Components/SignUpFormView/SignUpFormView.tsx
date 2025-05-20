import { useStoreViewModel } from "../../Observable/React/useViewModel";
import { handleSubmit, sendText } from "../../Utils/uiUtils";
import SignUpFormViewModel from "./SignUpFormViewModel";
// import ErrorMessage from "../ErrorMessage";

import styled from '@emotion/styled'

const Form = styled.form({
  display: 'flex'
})

const TextInput = styled.input({
  
})

function SignUpFormView() {
  const viewModel = useStoreViewModel(SignUpFormViewModel);
  
  const a = 333  ;



  return (
    <Form onSubmit={handleSubmit(viewModel.signUpButtonTapped.exec)}>
      <TextField
        label="Email"
        variant="outlined"
        value={viewModel.emailTyped.result()}
        onChange={sendText(viewModel.emailTyped.exec)}
        disabled={viewModel.signUpButtonTapped.isLoading()}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={viewModel.passwordTyped.result()}
        onChange={sendText(viewModel.passwordTyped.exec)}
        disabled={viewModel.signUpButtonTapped.isLoading()}
      />
      <TextField
        label="Repite tu password"
        variant="outlined"
        type="password"
        value={viewModel.passwordVerificationTyped.result()}
        onChange={sendText(viewModel.passwordVerificationTyped.exec)}
        disabled={viewModel.signUpButtonTapped.isLoading()}
      />
      <LoadingButton
        loading={viewModel.signUpButtonTapped.isLoading()}
        type="submit"
        variant="contained"
      >
        Registrar
      </LoadingButton>
      <ErrorMessage error={viewModel.signUpButtonTapped.error()} />
    </Stack>
  );
}

export default SignUpFormView;
