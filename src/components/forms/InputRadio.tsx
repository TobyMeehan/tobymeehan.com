import { InputHTMLAttributes } from "react";

export interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: "radio"
    valid?: boolean
}

export default function InputRadio({ type, valid, className, ...props }: InputRadioProps) {
    return (
        <input type="radio" {...props}
        className={`appearance-none size-5 rounded-full border-4 transition bg-dark-900 border-dark-900 hover:bg-dark-950 hover:border-dark-950 hover:cursor-pointer checked:border-bright checked:hover:border-light`} />
    )
}
