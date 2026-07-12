import { InputHTMLAttributes, ReactNode, RefAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
}

export const Input: React.ForwardRefExoticComponent<
  InputProps & RefAttributes<HTMLInputElement>
>;

export default Input;
