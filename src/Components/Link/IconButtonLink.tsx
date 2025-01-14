import { IconButton, IconButtonProps } from "@mui/material";
import { useStoreFirstObjectOfType } from "../../Observable/useViewModel";
import { MouseEventHandler } from "react";
import SimpleNavigation from "../../Utils/SimpleNavigation";

type ButtonLinkProps = Omit<
  IconButtonProps,
  "component" | "onClick" | "role"
> & {
  href: string;
};

function IconButtonLink({ children, href, ...props }: ButtonLinkProps) {
  const simpleNavigation = useStoreFirstObjectOfType(SimpleNavigation);

  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    simpleNavigation.push(href ?? "#");
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
