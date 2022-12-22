import Link, { LinkProps } from "next/link";
import React from "react";
import BaseLink, { BaseLinkProps } from "../BaseLink";
export type PrimaryButtonProps = React.PropsWithChildren<
  Omit<BaseLinkProps, "children"> & { className?: string }
>;
const PrimaryButton = ({
  className = "",
  children,
  onClick,
  ...props
}: PrimaryButtonProps) => {
  return (
    <BaseLink {...props}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </BaseLink>
  );
};

export default PrimaryButton;
