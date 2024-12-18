import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: IconProp
}

export default function IconButton({ icon, type, ...props }: IconButtonProps) {
    return (
        <button type={type ?? "button"} className="size-8 rounded-full transition hover:bg-dark-700 active:bg-dark-750" {...props}>
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}
