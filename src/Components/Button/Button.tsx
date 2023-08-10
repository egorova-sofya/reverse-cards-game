import React, { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from "react";
import "./Button.css";

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  appearance?: "primary";
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

const Button: FC<Props> = ({
  children,
  className,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={isLoading ? undefined : props?.onClick}
      className="button"

      // loading={isLoading}
    >
      {children}
    </button>
  );
};

export default Button;
