import { MouseEventHandler } from "react";
import { Button, ButtonProps } from "@mui/material";
import { useStoreFirstObjectOfType } from "../../Observable/useViewModel";
import SimpleNavigation from "../../Utils/SimpleNavigation";

type ButtonLinkProps = Omit<ButtonProps, "component" | "onClick" | "role">;

function ButtonLink({ children, href, ...props }: ButtonLinkProps) {
  const simpleNavigation = useStoreFirstObjectOfType(SimpleNavigation);

  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    simpleNavigation.push(href ?? "#");
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
