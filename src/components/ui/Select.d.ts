import { SelectHTMLAttributes, ReactNode, RefAttributes } from "react";

export interface SelectOption {
  value: string;
  label: ReactNode;
}

export interface SelectOptionGroup {
  group: string;
  options: SelectOption[];
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  options?: SelectOption[] | SelectOptionGroup[];
  size?: "sm" | "md" | "lg";
  className?: string;
  id?: string;
}

export const Select: React.ForwardRefExoticComponent<
  SelectProps & RefAttributes<HTMLSelectElement>
>;

export default Select;
