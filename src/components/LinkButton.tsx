import { ButtonHTMLAttributes } from "react";

export default function LinkButton({ children, type, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button type={type ?? "button"}
            className={`appearance-none transition text-link hover:text-link-hover hover:underline ${className}`}
            {...props}>
            {children}
        </button>
    )
}
