import { TextareaHTMLAttributes, ReactNode, RefAttributes } from "react";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "resize"> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  rows?: number;
  maxLength?: number;
  resize?: "none" | "y" | "both";
  className?: string;
  id?: string;
  value?: string;
}

export const Textarea: React.ForwardRefExoticComponent<
  TextareaProps & RefAttributes<HTMLTextAreaElement>
>;

export default Textarea;
