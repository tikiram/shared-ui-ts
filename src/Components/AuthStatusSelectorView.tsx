import { ReactNode } from "react";
import { useObservableOfType } from "../Observable/useViewModel";
import Auth from "../Auth/Auth";
import { AuthStatus } from "../Auth/AuthStatus";

interface AuthStatusViewSelectorViewProps {
  uninitializedView: ReactNode;
  anonymousView: ReactNode;
  authenticatedView: ReactNode;
}

function AuthStatusViewSelectorView({
  uninitializedView,
  anonymousView,
  authenticatedView,
}: AuthStatusViewSelectorViewProps) {
  const auth = useObservableOfType(Auth);

  switch (auth.getLastNotifiedValue()) {
    case AuthStatus.Uninitialized:
      return uninitializedView;
    case AuthStatus.Anonymous:
      return anonymousView;
    case AuthStatus.Authenticated:
      return authenticatedView;
  }
}

export default AuthStatusViewSelectorView;
