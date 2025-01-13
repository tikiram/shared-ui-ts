import { IconButton, IconButtonProps } from "@mui/material";
import LinkViewModel from "./LinkViewModel.ts";
import { useViewModel } from "../../Observable/useViewModel.ts";
import { MouseEventHandler } from "react";

type ButtonLinkProps = Omit<
  IconButtonProps,
  "component" | "onClick" | "role"
> & {
  href: string;
};

function IconButtonLink({ children, href, ...props }: ButtonLinkProps) {
  const viewModel = useViewModel(LinkViewModel);

  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    viewModel.onClick(href ?? "#");
  };

  return (
    // @ts-expect-error It is not getting the `component` prop for some reason
    <IconButton
      {...props}
      component="a"
      href={href ?? "#"}
      role="link"
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
}

export default IconButtonLink;
