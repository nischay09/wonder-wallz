import { ButtonHTMLAttributes, ReactNode, RefAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  className?: string;
  loading?: boolean;
  icon?: ReactNode;
}

export const Button: React.ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
>;

export default Button;
