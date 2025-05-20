import { Button, Typography } from "@mui/material";

interface Props {
  error?: Error;
  retryAction?: () => void;
}

function ErrorMessage({ error, retryAction }: Props) {
  return (
    error && (
      <Typography color="error" variant="body2">
        {String(error)}
        {retryAction && <Button onClick={retryAction}>Retry</Button>}
      </Typography>
    )
  );
}

export default ErrorMessage;
