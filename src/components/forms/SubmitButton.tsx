import { useFormStatus } from "react-dom"
import Button, { ButtonProps } from "../Button"

export default function SubmitButton({ children, type, disabled, ...props }: ButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={disabled || pending} aria-disabled={disabled || pending} {...props}>
            {children}
        </Button>
    )
}
