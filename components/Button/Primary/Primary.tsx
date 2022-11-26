import Link, { LinkProps } from "next/link";
import React from "react";
import BaseLink, { BaseLinkProps } from "../BaseLink";
export type PrimaryButtonProps = React.PropsWithChildren<
  BaseLinkProps & { className?: string }
>;
const PrimaryButton = ({
  className = "",
  children,
  ...props
}: PrimaryButtonProps) => {
  return (
    <BaseLink {...props}>
      <a className={`${className} p-3 bg-sky-100`}>{children}</a>
    </BaseLink>
  );
};

export default PrimaryButton;
