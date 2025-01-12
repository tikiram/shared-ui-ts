import { Button, ButtonProps } from "@mui/material";
import LinkViewModel from "./LinkViewModel.ts";
import { useViewModel } from "../../utils/Observable/useViewModel.ts";
import { MouseEventHandler } from "react";

type ButtonLinkProps = Omit<ButtonProps, "component" | "onClick" | "role">;

function ButtonLink({ children, href, ...props }: ButtonLinkProps) {
  const viewModel = useViewModel(LinkViewModel);

  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    viewModel.onClick(href ?? "#");
  };

  return (
    // @ts-expect-error It is not getting the `component` prop for some reason
    <Button
      {...props}
      component="a"
      href={href ?? "#"}
      role="link"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default ButtonLink;
